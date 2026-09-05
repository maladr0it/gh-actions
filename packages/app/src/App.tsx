import { printVersion, version } from "@gh-actions/lib";
import { useEffect } from "react";

export function App() {
  useEffect(() => {
    printVersion();
  }, []);

  return (
    <main>
      <p className="eyebrow">@gh-actions/lib</p>
      <h1>
        v<span data-testid="lib-version">{version}</span>
      </h1>
      <p className="lede">
        A Vite + React app consuming a workspace TypeScript library. The
        version above comes from <code>@gh-actions/lib</code>; CI prints the
        same value in the test job.
      </p>
    </main>
  );
}
