"use client";

import { useEffect } from "react";

/**
 * Deters casual copying: blocks right-click, view-source/save/devtools
 * shortcuts, and image drag. This is not real security — anyone technical
 * can still inspect network requests or browser devtools opened via the
 * menu — it only raises the bar for casual visitors.
 */
export default function CopyProtection() {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent) => e.preventDefault();

    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (e.ctrlKey && ["c", "u", "s", "a"].includes(key)) e.preventDefault();
      if (key === "f12" || (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key))) {
        e.preventDefault();
      }
    };

    const onDragStart = (e: DragEvent) => e.preventDefault();

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("dragstart", onDragStart);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return null;
}
