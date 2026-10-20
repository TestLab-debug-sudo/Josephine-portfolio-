"use client";

import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useSyncExternalStore,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export interface TwistingGalleryImageObject {
  src: string;
  alt?: string;
  title?: string;
  category?: string;
  location?: string;
  dateOrYear?: string;
}

export type TwistingGalleryItem = string | TwistingGalleryImageObject;

export interface TwistingGalleryProps {
  /**
   * Images shown in the column, as URLs or objects with metadata.
   */
  images?: TwistingGalleryItem[];

  /**
   * Loop the column so it can be scrolled forever in either direction.
   * @default true
   */
  infinite?: boolean;

  /**
   * Maximum width of a tile in pixels, shrinks to fit narrow containers.
   * @default 300
   */
  itemWidth?: number;

  /**
   * Tile width divided by height (width / height).
   * @default 0.8
   */
  aspectRatio?: number;

  /**
   * Vertical gap between tiles in pixels, negative values overlap them.
   * @default 80
   */
  gap?: number;

  /**
   * Corner radius of the tiles in pixels.
   * @default 7
   */
  borderRadius?: number;

  /**
   * How far the images are drained of colour from 0 to 1.
   * @default 1
   */
  grayscale?: number;

  /**
   * Perspective distance in pixels, smaller values twist harder.
   * @default 900
   */
  perspective?: number;

  /**
   * Horizontal sway of the column as a fraction of the container width.
   * @default 0.2
   */
  sway?: number;

  /**
   * Maximum random forward tilt in degrees a tile starts and ends with.
   * @default 10
   */
  tilt?: number;

  /**
   * Smallest turn in degrees a tile spins through while passing.
   * @default 200
   */
  twistMin?: number;

  /**
   * Largest turn in degrees a tile spins through while passing.
   * @default 290
   */
  twistMax?: number;

  /**
   * Maximum random roll in degrees a tile starts and ends with.
   * @default 10
   */
  roll?: number;

  /**
   * How far in pixels a tile sinks into the screen while centered.
   * @default 150
   */
  depth?: number;

  /**
   * Maximum motion blur in pixels at full scroll speed, 0 to disable.
   * @default 15
   */
  blur?: number;

  /**
   * Scroll speed in pixels per frame that counts as full speed.
   * @default 40
   */
  blurSensitivity?: number;

  /**
   * How much colour drains at full speed from 0 to 1.
   * @default 1
   */
  desaturate?: number;

  /**
   * Seed for the per-tile rotations.
   * @default 1
   */
  seed?: number;

  /**
   * Fraction of the viewport height beyond the edges a tile keeps animating.
   * @default 0.2
   */
  overshoot?: number;

  /**
   * Scroll follow damping from 0 for instant to 1 for very loose.
   * @default 0.8
   */
  smooth?: number;

  /**
   * Multiplier applied to wheel and trackpad deltas.
   * @default 1
   */
  wheelSpeed?: number;

  /**
   * Multiplier applied to pointer drag deltas.
   * @default 1.5
   */
  dragSpeed?: number;

  /**
   * Pixels per second the column drifts by itself, 0 to disable.
   * @default 0
   */
  autoScroll?: number;

  /**
   * Stop the drift while the pointer is over the gallery.
   * @default true
   */
  pauseOnHover?: boolean;

  /**
   * Draw a radial vignette over the gallery.
   * @default false
   */
  vignette?: boolean;

  /**
   * Colour of the vignette edge, usually semi transparent.
   * @default "rgba(255, 255, 255, 0.6)"
   */
  vignetteColor?: string;

  /**
   * Colour behind the tiles, transparent by default so the page shows through.
   * @default "transparent"
   */
  backgroundColor?: string;

  /**
   * Fired when the tile nearest the centre changes.
   */
  onIndexChange?: (index: number) => void;

  /**
   * Extra classes for the outer container.
   */
  className?: string;

  /**
   * Content layered above the gallery.
   */
  children?: ReactNode;
}

const DEFAULT_IMAGES: TwistingGalleryItem[] = [
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=900&auto=format&fit=crop",
];

const clamp = (val: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, val));

const moduloWrap = (val: number, max: number): number =>
  ((val % max) + max) % max;

const normalizeItem = (item: TwistingGalleryItem): TwistingGalleryImageObject =>
  typeof item === "string" ? { src: item } : item;

const hashRandom = (idx: number, salt: number, seed: number): number => {
  const n = Math.sin((idx + 1) * 12.9898 + 78.233 * salt + 37.719 * seed);
  return 43758.5453 * n - Math.floor(43758.5453 * n);
};

const REDUCED_MOTION_MEDIA = "(prefers-reduced-motion: reduce)";

const subscribeReducedMotion = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  const media = window.matchMedia(REDUCED_MOTION_MEDIA);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = (): boolean =>
  typeof window !== "undefined"
    ? window.matchMedia(REDUCED_MOTION_MEDIA).matches
    : false;

export default function TwistingGallery({
  images = DEFAULT_IMAGES,
  infinite = true,
  itemWidth = 300,
  aspectRatio = 0.8,
  gap = 80,
  borderRadius = 7,
  grayscale = 1,
  perspective = 900,
  sway = 0.2,
  tilt = 10,
  twistMin = 200,
  twistMax = 290,
  roll = 10,
  depth = 150,
  blur = 15,
  blurSensitivity = 40,
  desaturate = 1,
  seed = 1,
  overshoot = 0.2,
  smooth = 0.8,
  wheelSpeed = 1,
  dragSpeed = 1.5,
  autoScroll = 0,
  pauseOnHover = true,
  vignette = false,
  vignetteColor = "rgba(255, 255, 255, 0.6)",
  backgroundColor = "transparent",
  onIndexChange,
  className,
  children,
}: TwistingGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<{ wrap: HTMLDivElement; tile: HTMLDivElement }[]>([]);
  const targetScrollRef = useRef<number>(0);
  const currentScrollRef = useRef<number>(0);
  const animFrameRef = useRef<number>(0);
  const isLoopingRef = useRef<boolean>(false);
  const lastTimeRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const isIntersectingRef = useRef<boolean>(true);
  const dragStateRef = useRef<{ y: number; moved: number; at: number } | null>(null);
  const dragVelocityRef = useRef<number>(0);
  const blurRef = useRef<number>(0);
  const activeCenterIdxRef = useRef<number>(-1);
  const onIndexChangeRef = useRef(onIndexChange);
  onIndexChangeRef.current = onIndexChange;

  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );

  const normalizedImages = useMemo(() => images.map(normalizeItem), [images]);

  const tileWidth = Math.max(40, Math.min(itemWidth, size.width - 32));
  const tileHeight = tileWidth / Math.max(0.1, aspectRatio);
  const stride = Math.max(8, tileHeight + gap);

  const visibleItems = useMemo(() => {
    if (!normalizedImages.length) return [];
    if (!infinite) {
      return normalizedImages.map((image, index) => ({ image, index }));
    }
    const needed = Math.max(
      1,
      Math.ceil(
        (Math.ceil((size.height * (1 + 2 * overshoot) + 2 * tileHeight) / stride) + 1) /
          normalizedImages.length
      )
    );
    const result: { image: TwistingGalleryImageObject; index: number }[] = [];
    for (let loop = 0; loop < needed; loop++) {
      normalizedImages.forEach((image, index) => {
        result.push({ image, index });
      });
    }
    return result;
  }, [normalizedImages, infinite, size.height, overshoot, tileHeight, stride]);

  const tileTransforms = useMemo(() => {
    return visibleItems.map((_, i) => ({
      x: (2 * hashRandom(i, 1, seed) - 1) * tilt,
      y: twistMin + hashRandom(i, 2, seed) * (twistMax - twistMin),
      z: (2 * hashRandom(i, 3, seed) - 1) * roll,
      shift: Math.sin(i) * sway,
    }));
  }, [visibleItems, seed, tilt, twistMin, twistMax, roll, sway]);

  const totalVirtualHeight = visibleItems.length * stride;
  const maxScroll = Math.max(0, (normalizedImages.length - 1) * stride);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      setSize({ width: el.clientWidth, height: el.clientHeight });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      isIntersectingRef.current = entry.isIntersecting;
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const clampScroll = useCallback(
    (scroll: number) => (infinite ? scroll : clamp(scroll, 0, maxScroll)),
    [infinite, maxScroll]
  );

  const renderFrame = useCallback(
    (scroll: number, blurVal: number) => {
      const h = size.height;
      if (!h || !visibleItems.length) return;

      const blurProgress = blur > 0 ? clamp(blurVal / blur, 0, 1) : 0;
      const filterStyle =
        blurVal > 0.05
          ? `blur(${blurVal.toFixed(2)}px) saturate(${(1 - blurProgress * desaturate).toFixed(3)})`
          : "none";

      const centerOffset = h / 2 - tileHeight / 2;
      const travelRange = tileHeight + h * (1 + 2 * overshoot);
      const minBound = -tileHeight - h * overshoot;
      const maxBound = h * (1 + overshoot);
      const halfVirtual = totalVirtualHeight / 2;

      let bestCenterIdx = -1;
      let minCenterDist = Infinity;

      for (let i = 0; i < visibleItems.length; i++) {
        const itemEl = elementsRef.current[i];
        if (!itemEl) continue;

        const rawY = i * stride - scroll;
        const yPos =
          centerOffset +
          (infinite ? moduloWrap(rawY + halfVirtual, totalVirtualHeight) - halfVirtual : rawY);

        if (yPos < minBound || yPos > maxBound) {
          itemEl.wrap.style.visibility = "hidden";
          continue;
        }

        const tf = tileTransforms[i];
        itemEl.wrap.style.visibility = "visible";
        itemEl.wrap.style.transform = `translate3d(${(tf.shift * size.width).toFixed(2)}px, ${yPos.toFixed(2)}px, 0)`;

        const dist = Math.abs(yPos - centerOffset);
        if (dist < minCenterDist) {
          minCenterDist = dist;
          bestCenterIdx = visibleItems[i].index;
        }

        const normPos = clamp((h * (1 + overshoot) - yPos) / travelRange, 0, 1);
        const flip = 1 - 2 * normPos;
        const zDepth = -Math.sin(normPos * Math.PI) * depth;

        itemEl.tile.style.transform = `translate3d(0, 0, ${zDepth.toFixed(1)}px) rotateX(${(tf.x * flip).toFixed(2)}deg) rotateY(${(tf.y * flip).toFixed(2)}deg) rotateZ(${(tf.z * flip).toFixed(2)}deg)`;
        itemEl.tile.style.filter = filterStyle;
      }

      if (bestCenterIdx >= 0 && bestCenterIdx !== activeCenterIdxRef.current) {
        activeCenterIdxRef.current = bestCenterIdx;
        onIndexChangeRef.current?.(bestCenterIdx);
      }
    },
    [
      size.height,
      visibleItems,
      blur,
      desaturate,
      tileHeight,
      overshoot,
      totalVirtualHeight,
      stride,
      infinite,
      tileTransforms,
      size.width,
      depth,
    ]
  );

  const startLoop = useCallback(() => {
    if (isLoopingRef.current) return;
    isLoopingRef.current = true;
    lastTimeRef.current = 0;

    const tick = (time: number) => {
      const dt = lastTimeRef.current
        ? Math.min(0.05, (time - lastTimeRef.current) / 1000)
        : 1 / 60;
      lastTimeRef.current = time;

      const shouldDrift =
        autoScroll !== 0 &&
        isIntersectingRef.current &&
        !(pauseOnHover && isHoveredRef.current) &&
        !dragStateRef.current;

      if (shouldDrift) {
        targetScrollRef.current = clampScroll(targetScrollRef.current + autoScroll * dt);
      }

      if (Math.abs(dragVelocityRef.current) > 1) {
        targetScrollRef.current = clampScroll(
          targetScrollRef.current + dragVelocityRef.current * dt
        );
        dragVelocityRef.current *= Math.pow(0.02, dt);
      } else {
        dragVelocityRef.current = 0;
      }

      const dampRate = 1.5 + (1 - clamp(smooth, 0, 1)) * 30;
      const factor = prefersReducedMotion ? 1 : 1 - Math.exp(-dt * dampRate);
      const nextCurrent =
        currentScrollRef.current +
        (targetScrollRef.current - currentScrollRef.current) * factor;
      const isSettled = Math.abs(targetScrollRef.current - nextCurrent) < 0.05;
      const deltaSpeed = Math.abs(nextCurrent - currentScrollRef.current) / (60 * dt);

      currentScrollRef.current = isSettled ? targetScrollRef.current : nextCurrent;

      const targetBlur = prefersReducedMotion
        ? 0
        : clamp(deltaSpeed / Math.max(1, blurSensitivity), 0, 1) * blur;
      blurRef.current += (targetBlur - blurRef.current) * (1 - Math.pow(0.55, 60 * dt));
      if (blurRef.current < 0.02) blurRef.current = 0;

      renderFrame(currentScrollRef.current, blurRef.current);

      if (
        !isSettled ||
        shouldDrift ||
        dragVelocityRef.current !== 0 ||
        blurRef.current > 0
      ) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        isLoopingRef.current = false;
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
  }, [
    autoScroll,
    pauseOnHover,
    clampScroll,
    smooth,
    prefersReducedMotion,
    blurSensitivity,
    blur,
    renderFrame,
  ]);

  useEffect(() => {
    targetScrollRef.current = clampScroll(targetScrollRef.current);
    currentScrollRef.current = clampScroll(currentScrollRef.current);
    renderFrame(currentScrollRef.current, blurRef.current);
    startLoop();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      isLoopingRef.current = false;
    };
  }, [clampScroll, renderFrame, startLoop]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const scale = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? size.height : 1;
      const prev = targetScrollRef.current;
      targetScrollRef.current = clampScroll(prev + e.deltaY * scale * wheelSpeed);
      if (infinite || targetScrollRef.current !== prev) {
        e.preventDefault();
        dragVelocityRef.current = 0;
        startLoop();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [size.height, wheelSpeed, clampScroll, infinite, startLoop]);

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current) {
      dragStateRef.current = null;
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
      dragVelocityRef.current = clamp(dragVelocityRef.current, -4000, 4000);
      startLoop();
    }
  };

  const tileWrapperStyle: React.CSSProperties = {
    width: tileWidth,
    perspective: `${perspective}px`,
    left: "50%",
    marginLeft: -tileWidth / 2,
  };

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Twisting image gallery"
      tabIndex={0}
      className={cn(
        "relative h-full w-full cursor-grab touch-none select-none overflow-hidden outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-inset",
        className
      )}
      style={{ backgroundColor }}
      onPointerDown={(e) => {
        if (e.button === 0) {
          dragStateRef.current = {
            y: e.clientY,
            moved: 0,
            at: performance.now(),
          };
          dragVelocityRef.current = 0;
          e.currentTarget.setPointerCapture(e.pointerId);
        }
      }}
      onPointerMove={(e) => {
        const drag = dragStateRef.current;
        if (!drag) return;
        const dy = e.clientY - drag.y;
        const now = performance.now();
        const dt = Math.max(1, now - drag.at) / 1000;
        drag.y = e.clientY;
        drag.at = now;
        drag.moved += Math.abs(dy);
        targetScrollRef.current = clampScroll(targetScrollRef.current - dy * dragSpeed);
        dragVelocityRef.current = (-dy * dragSpeed) / dt;
        startLoop();
      }}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerEnter={() => {
        isHoveredRef.current = true;
      }}
      onPointerLeave={() => {
        isHoveredRef.current = false;
        startLoop();
      }}
      onKeyDown={(e) => {
        const keyMap: Record<string, number> = {
          ArrowDown: stride,
          ArrowUp: -stride,
          PageDown: size.height,
          PageUp: -size.height,
          " ": size.height,
        };
        const delta = keyMap[e.key];
        if (delta !== undefined) {
          e.preventDefault();
          targetScrollRef.current = clampScroll(targetScrollRef.current + delta);
          startLoop();
        }
      }}
    >
      {visibleItems.map(({ image, index }, idx) => (
        <div
          key={idx}
          ref={(el) => {
            const tile = el?.firstElementChild as HTMLDivElement | null;
            if (el && tile) {
              elementsRef.current[idx] = { wrap: el, tile };
            } else {
              delete elementsRef.current[idx];
            }
          }}
          className="invisible absolute top-0"
          style={tileWrapperStyle}
          aria-hidden={idx >= normalizedImages.length}
        >
          <div
            className="w-full overflow-hidden bg-muted will-change-[transform,filter] [transform-style:preserve-3d] shadow-elevated border border-border/50 group/tile"
            style={{ height: tileHeight, borderRadius }}
          >
            <img
              src={image.src}
              alt={image.alt ?? `Gallery milestone ${index + 1}`}
              draggable={false}
              loading="lazy"
              style={{
                filter: grayscale > 0 ? `grayscale(${clamp(grayscale, 0, 1)})` : undefined,
              }}
              className="h-full w-full object-cover pointer-events-none transition-transform duration-700 select-none"
            />
          </div>
        </div>
      ))}

      {vignette && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background: `radial-gradient(transparent 25%, ${vignetteColor} 85%)`,
          }}
        />
      )}

      {children && (
        <div className="pointer-events-none relative z-[2] h-full w-full">
          {children}
        </div>
      )}
    </div>
  );
}
