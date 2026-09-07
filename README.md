# gh-actions

A small TypeScript workspace for learning GitHub Actions.

```
packages/
  lib/   TypeScript library that exports and prints its version
  app/   Vite + React + TypeScript app that consumes the library
```

## Scripts

```sh
pnpm install
pnpm test        # vitest in both packages
pnpm typecheck
pnpm build       # tsc the library, then Vite-build the app
pnpm dev         # Vite dev server for the app
```

## GitHub Actions

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every push to `main` and on pull requests:

1. Check out the repo
2. Install pnpm and Node 26
3. `pnpm install --frozen-lockfile`
4. Typecheck, test, and build

Watch runs at **Actions** on the GitHub repo. Public repos using standard `ubuntu-latest` runners are free.
