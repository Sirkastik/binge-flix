import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest(async () => ({
    manifest_version: 3,
    name: 'Binge Flix',
    version: `0.0.1.0`,
    version_name: "0.0.1",
    icons: {
        128: "public/icon.png"
    },
    action: {
        default_popup: "index.html"
    },
    permissions: ["activeTab", "storage"],
    content_scripts: [
        {
            matches: ["*://*/tv-series/*"],
            run_at: "document_start",
            js: ["src/scripts/content-script.ts"]
        }
    ]
}))