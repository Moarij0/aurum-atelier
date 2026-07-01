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

/**
 * Looks for a scroll-scrubbed frame sequence at /public/frames/{name}/frame_0001.webp,
 * frame_0002.webp, etc. (4-digit padded). Returns the sorted list of frame URLs, or
 * an empty array if the folder doesn't exist yet — the sequence is a pure drop-in,
 * same contract as resolveVideoSources/resolveImage.
 */
export function resolveFrameSequence(name: string, maxFrames = 300): string[] {
  const dir = path.join(process.cwd(), "public", "frames", name);
  if (!fs.existsSync(dir)) return [];

  const extensions = ["webp", "avif", "jpg", "jpeg", "png"];
  const frames: string[] = [];

  for (let i = 1; i <= maxFrames; i++) {
    const padded = String(i).padStart(4, "0");
    const found = extensions
      .map((ext) => `frame_${padded}.${ext}`)
      .find((file) => fs.existsSync(path.join(dir, file)));
    if (!found) break;
    frames.push(`/frames/${name}/${found}`);
  }

  return frames;
}
