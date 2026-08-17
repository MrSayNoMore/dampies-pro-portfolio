import { useCallback, useEffect, useRef, useState } from "react";
import { photo, type PhotoKey } from "@/data/photos";

export function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
}: {
  before: PhotoKey;
  after: PhotoKey;
  beforeAlt: string;
  afterAlt: string;
}) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, raw)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      setFromClientX(e.clientX);
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [setFromClientX]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full touch-none select-none overflow-hidden bg-secondary"
      onPointerDown={(e) => {
        dragging.current = true;
        setFromClientX(e.clientX);
      }}
    >
      <img src={photo[after]} alt={afterAlt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={photo[before]}
          alt={beforeAlt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: containerRef.current?.clientWidth ?? undefined }}
        />
      </div>

      <span className="scrim absolute left-3 top-3 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-foreground">
        Before
      </span>
      <span className="scrim absolute right-3 top-3 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-foreground">
        After
      </span>

      <div className="pointer-events-none absolute inset-y-0 w-px bg-navy-foreground" style={{ left: `${pos}%` }}>
        <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-gold text-gold-foreground">
          <span className="text-xs font-bold">↔</span>
        </div>
      </div>

      <label className="sr-only" htmlFor="ba-range">
        Reveal before and after
      </label>
      <input
        id="ba-range"
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute bottom-0 left-0 h-10 w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
