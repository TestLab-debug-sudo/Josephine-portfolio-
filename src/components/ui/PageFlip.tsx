"use client";

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  memo,
  CSSProperties,
  ReactNode,
} from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface PageFlipLeaf {
  id?: string;
  front?: string;
  back?: string;
  frontAlt?: string;
  backAlt?: string;
  frontContent?: ReactNode;
  backContent?: ReactNode;
  title?: string;
  subtitle?: string;
  badge?: string;
  year?: string;
  category?: string;
}

export type PageFlipEase = "easeInOut" | "easeOut" | "circOut" | "backOut";

export interface PageFlipProps {
  /**
   * Leaves of the book. Each entry takes front, back, optional alt text, content, and an id.
   */
  pages?: PageFlipLeaf[];

  /**
   * Width of a single leaf in pixels.
   * @default 280
   */
  pageWidth?: number;

  /**
   * Height of a single leaf in pixels.
   * @default 390
   */
  pageHeight?: number;

  /**
   * Corner radius of a leaf in pixels.
   * @default 8
   */
  pageRadius?: number;

  /**
   * Paper colour showing through while an image loads or behind content.
   * @default "var(--color-card, #ffffff)"
   */
  pageColor?: string;

  /**
   * Perspective depth of the scene. Lower values exaggerate the turn.
   * @default 1200
   */
  perspective?: number;

  /**
   * How far the book slides aside once a leaf is turned.
   * @default 140
   */
  spineShift?: number;

  /**
   * Angle a turned leaf rotates through, in degrees.
   * @default 180
   */
  turnAngle?: number;

  /**
   * Angle an unopened leaf tilts to when the pointer is over it.
   * @default 12
   */
  peekAngle?: number;

  /**
   * Seconds a single turn takes.
   * @default 0.55
   */
  duration?: number;

  /**
   * Seconds added per leaf when the whole book closes at once.
   * @default 0.08
   */
  stagger?: number;

  /**
   * Easing curve of the turn.
   * @default "easeInOut"
   */
  ease?: PageFlipEase;

  /**
   * Drop shadow strength behind each leaf. Set to 0 to remove.
   * @default 0.35
   */
  shadow?: number;

  /**
   * Interaction that turns a leaf.
   * @default "click"
   */
  trigger?: "click" | "hover";

  /**
   * Close every turned leaf when the pointer leaves the scene.
   * @default false
   */
  closeOnLeave?: boolean;

  /**
   * Enable pointer and keyboard interaction.
   * @default true
   */
  interactive?: boolean;

  /**
   * Callback fired when page turn count changes.
   */
  onPageChange?: (turnedCount: number, total: number) => void;

  /**
   * Optional className applied to the root.
   */
  className?: string;

  /**
   * Optional inline style applied to the root.
   */
  style?: CSSProperties;
}

const EASINGS: Record<PageFlipEase, [number, number, number, number]> = {
  easeInOut: [0.65, 0, 0.35, 1],
  easeOut: [0.16, 1, 0.3, 1],
  circOut: [0, 0.55, 0.45, 1],
  backOut: [0.34, 1.56, 0.64, 1],
};

const DEFAULT_PAGES: PageFlipLeaf[] = [
  {
    id: "p1",
    front: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?q=80&w=700&auto=format&fit=crop",
    back: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=700&auto=format&fit=crop",
    frontAlt: "Glass atrium seen from below",
    backAlt: "Corporate tower against an open sky",
  },
  {
    id: "p2",
    front: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=700&auto=format&fit=crop",
    back: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=700&auto=format&fit=crop",
    frontAlt: "White concrete facade in daylight",
    backAlt: "Repeating window lattice on a high rise",
  },
  {
    id: "p3",
    front: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=700&auto=format&fit=crop",
    back: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=700&auto=format&fit=crop",
    frontAlt: "Terraced building stepping into the sky",
    backAlt: "Row of arches along a shaded walkway",
  },
  {
    id: "p4",
    front: "https://images.unsplash.com/photo-1470075801209-17f9ec0cada6?q=80&w=700&auto=format&fit=crop",
    back: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=700&auto=format&fit=crop",
    frontAlt: "Steel canopy over a public square",
    backAlt: "Concrete stairwell curving upward",
  },
  {
    id: "p5",
    front: "https://images.unsplash.com/photo-1470723710355-95304d8aece4?q=80&w=700&auto=format&fit=crop",
    back: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=700&auto=format&fit=crop",
    frontAlt: "Roofline ridge cutting across the skyline",
    backAlt: "Modern house framed by clean geometry",
  },
];

interface LeafProps {
  index: number;
  total: number;
  front?: string;
  back?: string;
  frontAlt?: string;
  backAlt?: string;
  frontContent?: ReactNode;
  backContent?: ReactNode;
  turned: boolean;
  peek: boolean;
  delay: number;
  width: number;
  height: number;
  radius: number;
  paper: string;
  turnAngle: number;
  peekAngle: number;
  duration: number;
  curve: [number, number, number, number];
  shadow: number;
  interactive: boolean;
  onSelect: (index: number) => void;
  onReach: (index: number) => void;
  onRelease: () => void;
}

const Leaf = memo(function Leaf({
  index,
  total,
  front,
  back,
  frontAlt = "",
  backAlt = "",
  frontContent,
  backContent,
  turned,
  peek,
  delay,
  width,
  height,
  radius,
  paper,
  turnAngle,
  peekAngle,
  duration,
  curve,
  shadow,
  interactive,
  onSelect,
  onReach,
  onRelease,
}: LeafProps) {
  const rotateY = useMotionValue(0);
  const zIndex = useTransform(rotateY, (deg: number) =>
    deg < -turnAngle / 2 ? total + index + 1 : total - index
  );

  return (
    <motion.div
      className="absolute top-0 left-0"
      style={{
        width,
        height,
        rotateY,
        zIndex,
        transformOrigin: "left center",
        transformStyle: "preserve-3d",
        borderRadius: radius,
        cursor: interactive ? "pointer" : "default",
        boxShadow:
          shadow > 0
            ? `${Math.round(4 * shadow)}px ${Math.round(6 * shadow)}px ${Math.round(
                34 * shadow
              )}px rgba(0, 0, 0, ${Math.min(0.75 * shadow, 1)})`
            : "none",
      }}
      animate={{ rotateY: turned ? -turnAngle : peek ? -peekAngle : 0 }}
      transition={{ duration, delay, ease: curve }}
      onPointerEnter={() => onReach(index)}
      onPointerLeave={onRelease}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(index);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(index);
        }
      }}
      role={interactive ? "button" : undefined}
      aria-pressed={interactive ? turned : undefined}
      tabIndex={interactive ? 0 : -1}
    >
      {/* Front Face */}
      <div
        className="absolute inset-0 h-full w-full overflow-hidden border border-border/70"
        style={{
          backgroundColor: paper,
          borderRadius: radius,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {front ? (
          <img
            src={front}
            alt={frontAlt}
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover pointer-events-none"
            style={{ borderRadius: radius }}
          />
        ) : null}
        {frontContent}
      </div>

      {/* Back Face */}
      <div
        className="absolute inset-0 h-full w-full overflow-hidden border border-border/70"
        style={{
          backgroundColor: paper,
          borderRadius: radius,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg) translateZ(1px)",
        }}
      >
        {back ? (
          <img
            src={back}
            alt={backAlt}
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover pointer-events-none"
            style={{ borderRadius: radius }}
          />
        ) : null}
        {backContent}
      </div>
    </motion.div>
  );
});

export default function PageFlip({
  pages = DEFAULT_PAGES,
  pageWidth = 280,
  pageHeight = 390,
  pageRadius = 8,
  pageColor = "var(--color-card, #ffffff)",
  perspective = 1200,
  spineShift = 140,
  turnAngle = 180,
  peekAngle = 12,
  duration = 0.55,
  stagger = 0.08,
  ease = "easeInOut",
  shadow = 0.35,
  trigger = "click",
  closeOnLeave = false,
  interactive = true,
  onPageChange,
  className,
  style,
}: PageFlipProps) {
  const leafList = pages.length > 0 ? pages : DEFAULT_PAGES;
  const total = leafList.length;
  const [turnedCount, setTurnedCount] = useState(0);
  const [peekIndex, setPeekIndex] = useState(-1);
  const [isClosingAll, setIsClosingAll] = useState(false);

  const curve = EASINGS[ease] ?? EASINGS.easeInOut;

  const onPageChangeRef = useRef(onPageChange);
  useEffect(() => {
    onPageChangeRef.current = onPageChange;
  });

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onPageChangeRef.current?.(turnedCount, total);
  }, [turnedCount, total]);

  const handleSelect = useCallback(
    (index: number) => {
      if (!interactive) return;
      setIsClosingAll(false);
      setTurnedCount((prev) => (index < prev ? index : index + 1));
    },
    [interactive]
  );

  const handleReach = useCallback(
    (index: number) => {
      if (!interactive) return;
      setPeekIndex(index);
      if (trigger === "hover") {
        setIsClosingAll(false);
        setTurnedCount(index + 1);
      }
    },
    [interactive, trigger]
  );

  const handleRelease = useCallback(() => {
    setPeekIndex(-1);
  }, []);

  const handleReset = useCallback(() => {
    setIsClosingAll(true);
    setTurnedCount(0);
  }, []);

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden select-none",
        className
      )}
      style={{ perspective: `${perspective}px`, ...style }}
      onClick={handleReset}
      onPointerLeave={() => {
        setPeekIndex(-1);
        if (closeOnLeave) handleReset();
      }}
    >
      <motion.div
        className="relative"
        style={{
          width: pageWidth,
          height: pageHeight,
          perspective: `${perspective}px`,
          transformStyle: "preserve-3d",
        }}
        animate={{ x: turnedCount > 0 ? spineShift : 0 }}
        transition={{ duration: Math.max(0.8 * duration, 0.1), ease: "easeOut" }}
      >
        {leafList.map((leaf, index) => {
          const isTurned = index < turnedCount;
          return (
            <Leaf
              key={leaf.id ?? `page-${index}`}
              index={index}
              total={total}
              front={leaf.front}
              back={leaf.back}
              frontAlt={leaf.frontAlt}
              backAlt={leaf.backAlt}
              frontContent={leaf.frontContent}
              backContent={leaf.backContent}
              turned={isTurned}
              peek={interactive && !isTurned && peekIndex === index && index === turnedCount}
              delay={isClosingAll && !isTurned ? (total - 1 - index) * stagger : 0}
              width={pageWidth}
              height={pageHeight}
              radius={pageRadius}
              paper={pageColor}
              turnAngle={turnAngle}
              peekAngle={peekAngle}
              duration={duration}
              curve={curve}
              shadow={shadow}
              interactive={interactive}
              onSelect={handleSelect}
              onReach={handleReach}
              onRelease={handleRelease}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
