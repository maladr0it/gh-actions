import { printVersion, version } from "@gh-actions/lib-b";
import { useEffect } from "react";

export function App() {
  useEffect(() => {
    printVersion();
  }, []);

  return (
    <main>
      <p className="eyebrow">app-b · @gh-actions/lib-b</p>
      <h1>
        v<span data-testid="lib-b-version">{version}</span>
      </h1>
      <p className="lede">
        Vite + React app B consuming <code>@gh-actions/lib-b</code>, which
        depends on <code>@gh-actions/lib-a</code>.
      </p>
    </main>
  );
}
