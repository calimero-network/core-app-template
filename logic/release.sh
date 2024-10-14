#!/bin/bash

BLOBBY_IPFS="https://blobby-public.euw3.prod.gcp.calimero.network"

usage() {
    echo "Usage: $0 <file_path> <name> <version> <description> <repository> <notes> <near_account_id>"
    exit 1
}

# Validate arguments
if [[ $# -ne 7 ]]; then
    usage
fi

file_path="$1"
name="$2"
version="$3"
description="$4"
repository="$5"
notes="$6"
accountId="$7"

if [[ ! -f "$file_path" || "$file_path" != *.wasm ]]; then
    echo "Please provide a valid .wasm file."
    usage
fi

# Calculate SHA-256 hash for the file
file_hash=$(sha256sum "$file_path" | awk '{ print $1 }')
echo "File Hash: $file_hash"

# Upload application wasm file to Blobby IPFS
response=$(curl -s -X POST -H "Content-Type: application/wasm" -F "file=@${file_path}" "$BLOBBY_IPFS")
ipfs_path=$(echo "$response" | jq -r '.cid')
ipfs_path="$BLOBBY_IPFS/$ipfs_path"

if [[ -z "$ipfs_path" ]]; then
    echo "Error occurred while uploading the file."
    exit 1
fi

echo "IPFS Path: $ipfs_path"

# Update application metadata on NEAR blockchain
near call "$accountId" add_package "$(jq -n --arg name "$name" --arg description "$description" --arg repository "$repository" '{name: $name, description: $description, repository: $repository}')" --accountId "$accountId"
near call "$accountId" add_release "$(jq -n --arg name "$name" --arg version "$version" --arg notes "$notes" --arg path "$ipfs_path" --arg hash "$file_hash" '{name: $name, version: $version, notes: $notes, path: $path, hash: $hash}')" --accountId "$accountId"
