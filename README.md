# gh-actions

A small TypeScript workspace for learning GitHub Actions.

```
packages/
  lib-a/   TypeScript library that exports and prints its version
  app-a/   Vite + React app that consumes the library
  app-b/   Second Vite + React app that consumes the same library
```

## Commands

Scripts live on the packages. From the repo root, target one with `--filter`:

```sh
pnpm install
pnpm --filter @gh-actions/lib-a build
pnpm --filter @gh-actions/lib-a test
pnpm --filter @gh-actions/app-a test
pnpm --filter @gh-actions/app-b test
pnpm --filter @gh-actions/app-a dev
pnpm --filter @gh-actions/app-b dev
pnpm exec prettier --write .
```

`pnpm -r <script>` still runs that script in every package that defines it.

## GitHub Actions

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every push to `main` and on pull requests. Each job checks out the repo, then [`pnpm/setup`](https://github.com/pnpm/setup) installs pnpm (from `packageManager`), Node 26, and the workspace. Four jobs:

1. **Build library** — compile `lib-a` and upload `dist`
2. **Test library** — unit tests on source (does not wait on the build)
3. **Test app-a** / **Test app-b** — wait only on the library **build**, download `dist`, then run app tests

Library tests and app tests are siblings. A failing `printVersion` test does not skip the apps; a missing `dist` does.

Watch runs at **Actions** on the GitHub repo. Public repos using standard `ubuntu-latest` runners are free.
