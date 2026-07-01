# Image assets

Drop a file with the exact name below into this folder (`.avif`, `.webp`,
`.jpg`/`.jpeg`, or `.png` — checked in that order) and it replaces the
placeholder automatically via `next/image` — no code changes needed.

| File name | Used in | Notes |
|---|---|---|
| `artist-portrait` | Meet the Artist | Editorial portrait, 3:4 or 4:5 |
| `gallery-01` … `gallery-08` | Transformations Gallery | Mixed aspect ratios by design — see `src/constants/site.ts` `GALLERY_ITEMS` for which slot is tall/wide/square |

Until a file exists, each slot renders a labeled dark placeholder at the
correct aspect ratio so layout never shifts when a real photo lands.
