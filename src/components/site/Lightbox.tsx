import { useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { photo, type PhotoKey } from "@/data/photos";

export type LightboxItem = { key: PhotoKey; alt: string; caption?: string };

export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const open = index !== null;

  const next = useCallback(() => {
    if (index === null) return;
    onIndexChange((index + 1) % items.length);
  }, [index, items.length, onIndexChange]);

  const prev = useCallback(() => {
    if (index === null) return;
    onIndexChange((index - 1 + items.length) % items.length);
  }, [index, items.length, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, next, prev, onClose]);

  if (!open || index === null) return null;
  const item = items[index];
  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      className="fixed inset-0 z-100 flex flex-col bg-navy/95"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 py-4 text-navy-foreground sm:px-6">
        <span className="eyebrow opacity-70">
          {index + 1} / {items.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="inline-flex h-10 w-10 items-center justify-center border border-navy-foreground/25 transition-colors hover:bg-navy-foreground/10"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-16">
        <button
          type="button"
          aria-label="Previous image"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-2 z-10 inline-flex h-11 w-11 items-center justify-center border border-navy-foreground/25 text-navy-foreground transition-colors hover:bg-navy-foreground/10 sm:left-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <figure className="max-h-full" onClick={(e) => e.stopPropagation()}>
          <img
            src={photo[item.key]}
            alt={item.alt}
            className="mx-auto max-h-[74vh] w-auto max-w-full object-contain"
          />
          <figcaption className="mx-auto mt-4 max-w-2xl text-center text-sm text-navy-foreground/70">
            {item.caption ? `${item.caption} — ${item.alt}` : item.alt}
          </figcaption>
        </figure>

        <button
          type="button"
          aria-label="Next image"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-2 z-10 inline-flex h-11 w-11 items-center justify-center border border-navy-foreground/25 text-navy-foreground transition-colors hover:bg-navy-foreground/10 sm:right-4"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
