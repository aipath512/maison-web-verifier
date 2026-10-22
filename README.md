# MAISON-WEB verifier

Cloudflare Worker for AiVenture FirmsFinder.

## Version 0.1 — read-only
- GET /health: Worker status and presence of D1 binding DB.
- GET /: first 20 candidate records and count of verification logs.
- No automatic domain checking, no D1 writes, no secrets.

## Deploy
Connect GitHub repository to the existing Cloudflare Worker named maison-web-verifier.
Retain binding DB to b2b-romania-db.
The source is src/index.js; package.json includes Wrangler.
Before deploying from GitHub, confirm Cloudflare build settings and the D1 binding remain attached.
