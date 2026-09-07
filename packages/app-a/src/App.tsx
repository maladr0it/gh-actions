import { printVersion, version } from "@gh-actions/lib-a";
import { useEffect } from "react";

export function App() {
  useEffect(() => {
    printVersion();
  }, []);

  return (
    <main>
      <p className="eyebrow">app-a · @gh-actions/lib-a</p>
      <h1>
        v<span data-testid="lib-a-version">{version}</span>
      </h1>
      <p className="lede">
        Vite + React app A consuming <code>@gh-actions/lib-a</code>. The version
        above comes from that package.
      </p>
    </main>
  );
}
