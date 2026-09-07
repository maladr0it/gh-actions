# gh-actions

A small TypeScript workspace for learning GitHub Actions.

```
packages/
  lib-a/   TypeScript library that exports and prints its version
  app-a/   Vite + React app that consumes the library
  app-b/   Second Vite + React app that consumes the same library
```

## Scripts

```sh
pnpm install
pnpm test        # build lib-a, then vitest in every package
pnpm typecheck
pnpm build
pnpm dev         # Vite for app-a
pnpm dev:b       # Vite for app-b
```

## GitHub Actions

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every push to `main` and on pull requests. Four jobs:

1. **Build library** — compile `lib-a` and upload `dist`
2. **Test library** — unit tests on source (does not wait on the build)
3. **Test app-a** / **Test app-b** — wait only on the library **build**, download `dist`, then run app tests

Library tests and app tests are siblings. A failing `printVersion` test does not skip the apps; a missing `dist` does.

Watch runs at **Actions** on the GitHub repo. Public repos using standard `ubuntu-latest` runners are free.
