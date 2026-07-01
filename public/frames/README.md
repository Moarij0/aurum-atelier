# Scroll-scrubbed frame sequences

Drop a numbered image sequence into `frames/{name}/frame_0001.webp`,
`frame_0002.webp`, ... (4-digit padded, up to 300 frames) and it replaces
the placeholder automatically — no code changes needed. This powers a
scroll-scrubbed canvas animation (the same technique Apple uses on product
pages): frame index is driven directly by scroll position, not a timer,
so it reads as one continuous cinematic shot rather than a looping video.

| Folder | Used in | Notes |
|---|---|---|
| `hero/` | Hero | Export ~150-300 sequential frames from your hero footage/render. `.webp` preferred for size; `.avif`/`.jpg`/`.png` also supported. |

Until a sequence exists, the Hero falls back to `public/videos/hero.mp4`,
and if that's also absent, to the standard labeled placeholder.
