# Flisk CLI public binaries

This repository is the release channel for prebuilt `flisk` binaries. It holds no source code, only release assets.

The binaries are compiled from the open-source, MIT-licensed **[flisk-sh/flisk](https://github.com/flisk-sh/flisk)**. The source code, docs, and issue tracker all live there. GitHub's automatic "Source code" downloads on this repository's releases contain only this README and the license, so get the source from tdk-cli-core instead.

⭐ If Flisk saves you time, please [star flisk](https://github.com/flisk-sh/flisk/stargazers).

## Install

```sh
curl -fsSL https://flisk.sh/install.sh | sh
```

The script downloads the binary for your OS and CPU from the latest release, plus the bundled engine, verifies them against the release's `checksums.txt`, and installs them into `/usr/local/bin` (override with `TDK_INSTALL_DIR`). `tdk upgrade` runs the same check in current builds.

Windows AMD64 users can install the CLI from PowerShell:

```powershell
irm https://flisk.sh/install.ps1 | iex
flisk --version
tdk runtime --check-assets
flisk doctor
```

Native Windows supports CLI inspection only. `flisk doctor` explains that running a landscape requires Ubuntu in WSL2; use the [WSL2 setup guide](https://github.com/flisk-sh/flisk/blob/main/docs/wsl2.md) for `flisk project` and `flisk up`. Windows ARM64 is not supported.

Or install from npm instead:

```sh
npm install -g @flisk-sh/flisk
```

## Download binaries

Latest release:

https://github.com/flisk-sh/releases/releases/latest

Assets in current releases (`<version>` is the release tag, e.g. `v1.3.81`):

- `tdk-linux-amd64` - Linux x86_64 / AMD64
- `tdk-linux-arm64` - Linux ARM64 / AArch64
- `tdk-darwin-amd64` - macOS Intel
- `tdk-darwin-arm64` - macOS Apple Silicon
- `tdk-windows-amd64.exe` - Windows AMD64 CLI
- `tdk-cli-engine.tar.gz` - the bundled engine and templates the binary needs at runtime
- `tdk-cli-<version>-binaries.zip` - all five binaries, the engine, and `checksums.txt` in one zip
- `checksums.txt` - SHA-256 checksums of all five binaries and `tdk-cli-engine.tar.gz`

The binaries and `tdk-cli-engine.tar.gz` keep the same name in every release, so you can always get the newest one from `https://github.com/flisk-sh/releases/releases/latest/download/<asset>`.

### Manual install

A binary on its own is not enough. It looks for the engine and templates in a `tdk-cli/` folder next to itself; without it, `flisk project` and `flisk up` fail with errors such as "Failed to load template" or "Flisk extension not found". Example for Linux x86_64 (make sure `~/.local/bin` is on your `PATH`):

```sh
base=https://github.com/flisk-sh/releases/releases/latest/download
curl -fsSLO "$base/tdk-linux-amd64"
curl -fsSLO "$base/tdk-cli-engine.tar.gz"
curl -fsSLO "$base/checksums.txt"
sha256sum -c checksums.txt --ignore-missing   # macOS: shasum -a 256 -c checksums.txt --ignore-missing

mkdir -p ~/.local/bin/tdk-cli
install -m 755 tdk-linux-amd64 ~/.local/bin/tdk
tar -xzf tdk-cli-engine.tar.gz -C ~/.local/bin/tdk-cli --strip-components=1
flisk --version
```

## Docker Compose

Use the Docker Compose example if you do not want to install the binary on your host:

```sh
git clone https://github.com/flisk-sh/flisk-docker-compose-example.git
cd flisk-docker-compose-example
docker compose run --rm tdk flisk --version
docker compose run --rm tdk flisk project --yes
```

Example repo:

https://github.com/flisk-sh/flisk-docker-compose-example
