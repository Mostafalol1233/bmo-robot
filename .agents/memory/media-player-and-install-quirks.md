---
name: Media player and install quirks
description: Version-specific ReactPlayer and dependency-install constraints observed in this workspace.
---

ReactPlayer v3 uses `src`, native media events, and `html`/provider config buckets rather than the older `url`, `onDuration`, `onProgress`, `file`, and nested `playerVars` patterns.

**Why:** The project’s existing video components used the pre-v3 API, which caused TypeScript failures after dependencies were restored even though the production build initially passed.

**How to apply:** When touching video components, check the installed ReactPlayer type definitions first and prefer native media events such as `onLoadedMetadata`, `onTimeUpdate`, `onWaiting`, and `onPlaying`.

The package firewall rejected the older Netlify functions dependency tree because it resolved a blocked `tar` archive; updating that direct dependency allowed the declared Node packages to install.

**Why:** A missing `node_modules` directory made the workflow fail before application code loaded, and repeated installs failed at the same transitive archive.

**How to apply:** If package installation hits a firewall block, update the direct dependency that brings in the blocked transitive package before retrying the full install.