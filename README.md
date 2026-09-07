# gh-actions

A small TypeScript workspace for learning GitHub Actions.

```
packages/
  lib-a/   TypeScript library that exports and prints its version
  lib-b/   TypeScript library that depends on lib-a
  app-a/   Vite + React app that consumes lib-a
  app-b/   Vite + React app that consumes lib-b
```

## Commands

Scripts live on the packages. From the repo root, target one with `--filter`:

```sh
pnpm install
pnpm --filter @gh-actions/lib-a build
pnpm --filter @gh-actions/lib-b build
pnpm --filter @gh-actions/lib-a test
pnpm --filter @gh-actions/lib-b test
pnpm --filter @gh-actions/app-a test
pnpm --filter @gh-actions/app-b test
pnpm --filter @gh-actions/app-a dev
pnpm --filter @gh-actions/app-b dev
pnpm exec prettier --write .
```

`pnpm -r <script>` still runs that script in every package that defines it.

## Bazel

The same package graph is a Bazel graph (Bazel 9, Bzlmod, [`rules_js`](https://github.com/aspect-build/rules_js) / [`rules_ts`](https://github.com/aspect-build/rules_ts)). Third-party versions still come from `pnpm-lock.yaml`; Bazel fetches only what the requested target needs and builds `lib-a` before anything that imports it. No `dist` artifacts between jobs.

Needs [Bazelisk](https://github.com/bazelbuild/bazelisk) (`brew install bazelisk`). The version pin is `.bazelversion`.

```sh
bazel test //...
bazel build //packages/lib-a:pkg //packages/lib-b:pkg
```

`pnpm --filter … dev` / `build` is still the Vite app. Bazel owns the library compile + test graph (`lib-a` before `lib-b` before `app-b` tests) without passing `dist` artifacts between jobs. Vite 8's bundler does not resolve nested workspace `node_modules` inside the sandbox; those `:bundle` targets are `manual` until that is worth fighting.

Bazel CI is [`.github/workflows/bazel.yml`](.github/workflows/bazel.yml). The hermetic Node toolchain is 26.8.1 (checksums in `MODULE.bazel`; `rules_nodejs` has not vendored 26 yet).

## GitHub Actions

[`.github/workflows/ci.yml`](.github/workflows/ci.yml) runs on every push to `main` and on pull requests. Each job checks out the repo, then [`pnpm/setup`](https://github.com/pnpm/setup) installs pnpm (from `packageManager`), Node 26, and the workspace.

```
Build lib-a ──► Test app-a
            ├─► Test lib-b
            └─► Build lib-b ──► Test app-b
Test lib-a      (no needs — parallel with Build lib-a)
```

1. **Build lib-a** — compile `lib-a` and upload `dist`
2. **Test lib-a** — unit tests on source (does not wait on the build)
3. **Build lib-b** — wait on lib-a `dist`, compile `lib-b`, upload `dist`
4. **Test lib-b** — wait on lib-a `dist`; tests import `@gh-actions/lib-a` through package exports
5. **Test app-a** — wait only on **Build lib-a**, download that `dist`
6. **Test app-b** — wait on **Build lib-b**, download both `dist` folders (`lib-b` imports `lib-a` at runtime)

lib-a / lib-b tests and app tests are siblings where the graph allows. A failing `printVersion` test on lib-a does not skip the apps; a missing `dist` does.

Watch runs at **Actions** on the GitHub repo. Public repos using standard `ubuntu-latest` runners are free.
