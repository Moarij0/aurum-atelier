import fs from "node:fs";
import path from "node:path";

// Server-only. Resolves whether a real media file has been dropped into
// /public/videos or /public/images for a given asset name. Components stay
// unchanged forever — replacing a placeholder is purely a file-drop.

function findFile(dir: string, name: string, extensions: string[]) {
  const base = path.join(process.cwd(), "public", dir);
  for (const ext of extensions) {
    if (fs.existsSync(path.join(base, `${name}.${ext}`))) {
      return `/${dir}/${name}.${ext}`;
    }
  }
  return null;
}

export interface VideoSources {
  mp4: string | null;
  webm: string | null;
  poster: string | null;
}

export function resolveVideoSources(name: string): VideoSources {
  return {
    mp4: findFile("videos", name, ["mp4"]),
    webm: findFile("videos", name, ["webm"]),
    poster: findFile("videos", `${name}-poster`, ["avif", "webp", "jpg", "jpeg", "png"]),
  };
}

export function resolveImage(name: string) {
  return findFile("images", name, ["avif", "webp", "jpg", "jpeg", "png"]);
}
