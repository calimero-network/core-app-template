#!/bin/bash
set -euo pipefail

cd "$(dirname $0)"

BLOBBY_IPFS="https://blobby-public.euw3.prod.gcp.calimero.network"

usage() {
    echo "Usage: $0 <near_network> <near_credentials_file_path> <near_contract_account_id>"
}

# Validate arguments
if [[ $# -ne 3 ]]; then
    usage
    exit 1
fi

near_network="$1"
near_credentials_file_path="$2"
near_contract_account_id="$3"
near_account_id=$(cat $near_credentials_file_path | jq -r '.account_id')

echo "-------------------Near network configuration-------------------"
echo "Near network: $near_network"
echo "Near credentials file path: $near_credentials_file_path"
echo "Near signer account ID: $near_account_id"
echo "Near contract account ID: $near_contract_account_id"
echo "-----------------------------------------------------------------"

name=$(cargo read-manifest | jq -r '.name')
version=$(cargo read-manifest | jq -r '.version')
description=$(cargo read-manifest | jq -r '.description')
repository=$(git remote get-url origin)
notes="-" # TODO: Add support for custom notes
sanitized_name=$(echo $name | tr '-' '_')
app_file_path="./res/$sanitized_name.wasm"

if [[ ! -f "$app_file_path" ]]; then
    echo "Failed to locate .wasm file, expected file path: $app_file_path"
    exit 1
fi

echo "-------------------Application metadata-------------------"
echo "Name: $name"
echo "Version: $version"
echo "Description: $description"
echo "Repository: $repository"
echo "Notes: $notes"
echo "Local file path: $app_file_path"
echo "------------------------------------------------------------"

# Update application metadata on NEAR blockchain
package_metadata=$(
    near contract \
        call-function \
        as-read-only \
        $near_contract_account_id \
        get_package_from_owner \
        json-args "$(jq -n --arg name "$name" --arg owner_account "$near_account_id" --arg version "$version" '{name: $name, owner_account: $owner_account, version: $version}')" \
        network-config $near_network \
        now || echo ""
)
if [[ -z "$package_metadata" ]]; then
    echo "Package not found, creating a new package."
    near contract \
        call-function \
        as-transaction \
        $near_contract_account_id \
        add_package \
        json-args "$(jq -n --arg name "$name" --arg description "$description" --arg repository "$repository" '{name: $name, description: $description, repository: $repository}')" \
        prepaid-gas '100.0 Tgas' \
        attached-deposit '0.0 NEAR' \
        sign-as $near_account_id \
        network-config $near_network \
        sign-with-access-key-file $near_credentials_file_path \
        send
else
    echo "Package found, skipping package creation."
    echo "Package metadata"
    echo $package_metadata | jq -r .
    echo "-----------------------------------------------------------------"
fi

release_metadata=$(
    near contract \
        call-function \
        as-read-only \
        $near_contract_account_id \
        get_release_from_owner \
        json-args "$(jq -n --arg name "$name" --arg owner_account "$near_account_id" --arg version "$version" '{name: $name, owner_account: $owner_account, version: $version}')" \
        network-config $near_network \
        now || echo ""
)
if [[ -z "$release_metadata" ]]; then
    echo "Release not found, creating a new release."

    file_hash=$(sha256sum "$app_file_path" | awk '{ print $1 }')
    echo "File Hash: $file_hash"

    response=$(curl -s -X POST -H "Content-Type: application/wasm" -F "file=@${app_file_path}" "$BLOBBY_IPFS")
    ipfs_path=$(echo "$response" | jq -r '.cid')
    ipfs_path="$BLOBBY_IPFS/$ipfs_path"

    if [[ -z "$ipfs_path" ]]; then
        echo "Error occurred while uploading the file."
        exit 1
    fi

    echo "IPFS Path: $ipfs_path"

    near contract \
        call-function \
        as-transaction \
        $near_contract_account_id \
        add_release \
        json-args "$(jq -n --arg name "$name" --arg version "$version" --arg notes "$notes" --arg path "$ipfs_path" --arg hash "$file_hash" '{name: $name, version: $version, notes: $notes, path: $path, hash: $hash}')" \
        prepaid-gas '100.0 Tgas' \
        attached-deposit '0.0 NEAR' \
        sign-as $near_account_id \
        network-config $near_network \
        sign-with-access-key-file $near_credentials_file_path \
        send
else
    echo "Release found, skipping release creation."
    echo "Release metadata"
    echo $release_metadata | jq -r .
    echo "-----------------------------------------------------------------"
fi
