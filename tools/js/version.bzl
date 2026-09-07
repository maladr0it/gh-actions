"""Emit src/version.generated.ts from package.json.

Same script pnpm uses (`node scripts/embed-version.ts`). Under Bazel the file
is an action output, not a write into the source tree.
"""

load("@aspect_rules_js//js:defs.bzl", "js_binary", "js_run_binary")

def package_version(name = "version"):
    js_binary(
        name = name + "_bin",
        entry_point = "scripts/embed-version.ts",
    )

    js_run_binary(
        name = name,
        srcs = ["package.json"],
        outs = ["src/version.generated.ts"],
        args = [
            "package.json",
            "src/version.generated.ts",
        ],
        chdir = native.package_name(),
        tool = ":" + name + "_bin",
    )
