# Environment Setup & Build Configurations

This document outlines the custom development environment, system restrictions, path variables, and build tools configured for the workspace.

## 1. System Context & Restrictions
- **OS:** Windows
- **Missing Global Commands:** The system did not have a global installation of `Node.js` or `pnpm` in its native shell `PATH` variable.
- **Pre/Post-install Hook Failures:** Lifecycle hooks for tools like `esbuild` failed initially because they expected system executable binaries to be present globally.

## 2. Provisioned Runtimes & Paths
- **Node.js 24 Executable:** Located locally at:
  `C:\Users\DELL\AppData\Local\ms-playwright-go\1.57.0\node.exe`
- **pnpm Extracted Package:** Placed and mapped to:
  `c:\Antigravity\Mith  studio\package\bin\pnpm.cjs`
- **Environment Path Mapping:** Pre-pended Node, local wrappers, and Git directories to the shell state:
  ```powershell
  $env:PATH = "c:\Antigravity\Mith  studio;C:\Users\DELL\AppData\Local\ms-playwright-go\1.57.0;C:\Program Files\Git\bin;C:\Program Files\Git\usr\\bin;" + $env:PATH
  ```

## 3. Local Executable Wrappers
We created binary command wrappers in the workspace root to route pnpm calls directly through the sandboxed Node runner:
- **[pnpm.cmd](file:///c:/Antigravity/Mith%20%20studio/pnpm.cmd):**
  ```cmd
  @echo off
  "C:\Users\DELL\AppData\Local\ms-playwright-go\1.57.0\node.exe" "c:\Antigravity\Mith  studio\package\bin\pnpm.cjs" %*
  ```
- **[pnpm](file:///c:/Antigravity/Mith%20%20studio/pnpm):**
  ```bash
  #!/bin/sh
  exec "C:\Users\DELL\AppData\Local\ms-playwright-go\1.57.0\node.exe" "c:\Antigravity\Mith  studio\package\bin\pnpm.cjs" "$@"
  ```

## 4. Port Configuration
- The Vite dev server is explicitly bound to port `19285` via the environment variable `$env:PORT = "19285"` and config options.
- The build script outputs static production assets to `dist/public/` directory inside `artifacts/mithraa-studio`.
