# Cleanup Report

## What was removed
- Git history folder from the delivery copy.
- Local secret file `.env` from the delivery copy.
- Stage notes, temporary reports, and test text files.
- Unused duplicate auth/admin/store components.
- Dead storefront routes related to cart, checkout, old order confirmation, and the duplicate shop page.
- Unused default public assets from the starter template.
- Old `mezo.md` files, then rebuilt in a smaller and clearer structure.

## Important cleanup decisions
- `/shop` now points to `/store/products` through `next.config.js`.
- Website-only order flow pages were removed because the current site works as a catalog + links + reviews experience.
- `.env.example` was sanitized into placeholders so secrets are not shipped in the cleaned copy.

## Keep outside the repo
- Real `.env`
- Firebase service account JSON
- Any deploy-only env import files

## Suggested next step
- Put your real environment values back locally, run install, then test build and admin flows on the cleaned copy.
