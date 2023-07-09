import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = packageJson.version
  .replace(/[^\d.-]+/g, "")
  .split(/[.-]/);

export default defineManifest(async () => ({
  manifest_version: 3,
  name: packageJson.name,
  version: `${major}.${minor}.${patch}.${label}`,
  version_name: packageJson.version,
  icons: {
    128: "public/icon.png",
  },
  action: {
    default_popup: "index.html",
  },
  permissions: ["activeTab", "storage"],
  content_scripts: [
    {
      matches: ["*://*/tv-series/*"],
      run_at: "document_start",
      js: ["src/scripts/content-script.ts"],
    },
  ],
}));
