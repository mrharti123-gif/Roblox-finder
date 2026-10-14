ROBLOX FINDER — NETLIFY VERSION

This version uses a Netlify Function so the browser talks to your own site's endpoint,
and that function calls Roblox's public APIs.

IMPORTANT:
- A plain drag-and-drop deploy of only index.html will NOT deploy the function.
- Deploy this project through a Git repository connected to Netlify, or use Netlify CLI.
- Keep index.html at the project root and netlify/functions/player.mjs at exactly that path.
- Netlify's default function URL used by this app is /.netlify/functions/player

Simple GitHub + Netlify steps:
1. Create a new GitHub repository.
2. Upload index.html, netlify.toml, and the netlify/functions/player.mjs file, preserving folders.
3. In Netlify, choose Add new site / Import an existing project, connect that repository, and deploy.
4. Open the deployed Netlify site URL and test a username.

No Roblox password, cookie, or API key is required.
