# Core App Template

## Logic

```bash title="Terminal"
cd logic
```

```bash title="Terminal"
chmod +x ./build.sh
```

```bash title="Terminal"
./build.sh
```

```bash title="Terminal"
./release.sh ./res/logic.wasm "Test Name123" "0.0.1" "-" "-" "-" calimero-package-manager.testnet
```

## App

```bash title="Terminal"
cd app
```

```bash title="Terminal"
pnpm install
```

```bash title="Terminal"
pnpm build
```

```bash title="Terminal"
pnpm dev
```

Open app in browser and connect to running node.

For more information how to build app check our docs:
https://calimero-network.github.io/build/quickstart
