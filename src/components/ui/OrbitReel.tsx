"use client";

import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useSyncExternalStore,
  useImperativeHandle,
  ReactNode,
  CSSProperties,
} from "react";
import { cn } from "@/lib/utils";

export interface OrbitReelItem {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  href?: string;
  category?: string;
  location?: string;
  dateOrYear?: string;
  tags?: string[];
}

export interface OrbitReelHandle {
  next: () => void;
  previous: () => void;
  goTo: (index: number) => void;
  setView: (view: "ring" | "arc") => void;
}

export interface OrbitReelProps {
  /**
   * Images and metadata for the cards. They repeat when there are more cards than items.
   */
  items?: OrbitReelItem[];

  /**
   * Number of cards around the wheel (3 to 72).
   * @default 18
   */
  count?: number;

  /**
   * Start on the whole wheel ("ring"), or zoomed into the arc at its top ("arc").
   * @default "ring"
   */
  defaultView?: "ring" | "arc";

  /**
   * Rotation speed of the ring view, in degrees per second. Negative values turn it the other way.
   * @default 8
   */
  spin?: number;

  /**
   * In the arc view, bring the next card to the top every interval seconds.
   * @default true
   */
  autoplay?: boolean;

  /**
   * Seconds between autoplay steps.
   * @default 3.5
   */
  interval?: number;

  /**
   * Size of the wheel in the arc view relative to the cards.
   * @default 1
   */
  arc?: number;

  /**
   * Vertical position of the top card in the arc view, from 0 (top) to 1 (bottom).
   * @default 0.42
   */
  apex?: number;

  /**
   * Card width divided by height. Below 1 is portrait, above 1 is landscape.
   * @default 0.8
   */
  aspect?: number;

  /**
   * Corner rounding as a fraction of the card width.
   * @default 0.07
   */
  radius?: number;

  /**
   * Space between neighbouring cards as a fraction of their spacing.
   * @default 0.18
   */
  gap?: number;

  /**
   * Lean each card along the wheel. When off, cards stay upright like frames on a Ferris wheel.
   * @default true
   */
  tilt?: boolean;

  /**
   * Turn the cards over in a wave that runs out from the top when the view changes, and periodically in ring view.
   * @default true
   */
  flipWave?: boolean;

  /**
   * Colour of the card backs revealed by the flip wave.
   * @default "#0d6e48"
   */
  accentColor?: string;

  /**
   * Background of the component.
   * @default "transparent"
   */
  backgroundColor?: string;

  /**
   * Show the title and subtitle of the top card in the arc view.
   * @default true
   */
  captions?: boolean;

  /**
   * Show previous and next buttons with a counter in the arc view.
   * @default true
   */
  controls?: boolean;

  /**
   * Drag to turn the wheel: around the centre in ring view, sideways in arc view.
   * @default true
   */
  draggable?: boolean;

  /**
   * Scroll to turn the reel.
   * @default true
   */
  wheel?: boolean;

  /**
   * Stop the rotation and autoplay while the pointer is on a card.
   * @default true
   */
  pauseOnHover?: boolean;

  /**
   * Clicking a card in the ring view zooms into the arc with it at the top. Clicking background or Esc zooms out.
   * @default true
   */
  zoomOnClick?: boolean;

  /**
   * Stops rotation, autoplay and the flip wave.
   * @default false
   */
  paused?: boolean;

  /**
   * Accessibility label for the reel region.
   */
  ariaLabel?: string;

  /**
   * Called when the reel zooms between the ring and the arc.
   */
  onViewChange?: (view: "ring" | "arc") => void;

  /**
   * Called when a different card reaches the top.
   */
  onActiveChange?: (item: OrbitReelItem, index: number) => void;

  /**
   * Called when the card at the top of the arc is clicked or Enter is pressed.
   */
  onSelect?: (item: OrbitReelItem, index: number) => void;

  /**
   * Classes for the root element.
   */
  className?: string;

  /**
   * Inline styles for the root element.
   */
  style?: CSSProperties;

  /**
   * Content centred inside the ring. It fades out when the reel zooms into the arc.
   */
  children?: ReactNode;
}

const TAU = 2 * Math.PI;

const clamp = (val: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, val));

const wrapAngle = (val: number): number =>
  ((val + Math.PI) % TAU + TAU) % TAU - Math.PI;

const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const subscribeReducedMotion = (cb: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

const getReducedMotionSnapshot = (): boolean =>
  typeof window !== "undefined"
    ? window.matchMedia(REDUCED_MOTION_QUERY).matches
    : false;

const springStep = (
  curr: number,
  vel: number,
  target: number,
  dt: number,
  frequency: number,
  damping: number
): [number, number] => {
  const omega = TAU / Math.max(frequency, 0.02);
  const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
  const subDt = dt / steps;
  let v = vel;
  let p = curr;
  for (let i = 0; i < steps; i++) {
    const accel = omega * omega * (target - p) - 2 * damping * omega * v;
    v += accel * subDt;
    p += v * subDt;
  }
  return [p, v];
};

const srOnlyStyle: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
};

const stageStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  perspective: 1400,
  touchAction: "pan-y",
  userSelect: "none",
  WebkitUserSelect: "none",
};

const cardButtonStyle: CSSProperties = {
  position: "absolute",
  left: 0,
  top: 0,
  padding: 0,
  margin: 0,
  border: 0,
  background: "none",
  cursor: "pointer",
  transformStyle: "preserve-3d",
  transformOrigin: "50% 50%",
  willChange: "transform",
  outline: "none",
};

const cardInnerStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  transformStyle: "preserve-3d",
  transformOrigin: "50% 50%",
};

const cardFaceStyle: CSSProperties = {
  position: "absolute",
  inset: 0,
  overflow: "hidden",
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
};

const btnBgDefault = "color-mix(in oklch, currentColor 10%, transparent)";
const btnBgHover = "color-mix(in oklch, currentColor 18%, transparent)";

const navBtnStyle: CSSProperties = {
  width: 34,
  height: 34,
  display: "grid",
  placeItems: "center",
  padding: 0,
  borderRadius: 999,
  border: 0,
  background: btnBgDefault,
  color: "inherit",
  cursor: "pointer",
  transition: "background-color 160ms ease",
};

const imgStyle: CSSProperties = {
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  pointerEvents: "none",
};

const DEFAULT_ITEMS: OrbitReelItem[] = [
  {
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=900",
    alt: "Biomedical Instrumentation Lab",
    title: "AI IR Diagnostic Chamber",
    subtitle: "₹74L DBT Research Setup",
  },
  {
    src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=900",
    alt: "Avignon University Mentorship",
    title: "Avignon University",
    subtitle: "CERI/LIA Tutoring in France",
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=900",
    alt: "IEEE TENCON Jeju Korea",
    title: "IEEE TENCON Korea",
    subtitle: "Keynote Lecture & Thermography",
  },
  {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=900",
    alt: "ISRO Satellite Telemetry",
    title: "ISRO Space Applications",
    subtitle: "Hands-on Technical Training",
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=900",
    alt: "MathWorks MATLAB Hackathon",
    title: "National MathWorks Hackathon",
    subtitle: "Undergraduate Mentorship",
  },
  {
    src: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=900",
    alt: "Teaching Competency Award",
    title: "P2BL Excellence Award",
    subtitle: "Conferred by IQAC",
  },
];

export const OrbitReel = forwardRef<OrbitReelHandle, OrbitReelProps>(
  function OrbitReel(
    {
      items = DEFAULT_ITEMS,
      count = 18,
      defaultView = "ring",
      spin = 8,
      autoplay = true,
      interval = 3.5,
      arc = 1,
      apex = 0.42,
      aspect = 0.8,
      radius = 0.07,
      gap = 0.18,
      tilt = true,
      flipWave = true,
      accentColor = "#0d6e48",
      backgroundColor = "transparent",
      captions = true,
      controls = true,
      draggable = true,
      wheel = true,
      pauseOnHover = true,
      zoomOnClick = true,
      paused = false,
      ariaLabel = "Orbit reel. Click a card to bring it forward, scroll or drag to turn, press Escape to see the whole ring.",
      onViewChange,
      onActiveChange,
      onSelect,
      className,
      style,
      children,
    },
    ref
  ) {
    const rootRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const captionRef = useRef<HTMLDivElement>(null);
    const controllerRef = useRef<{
      sync: () => void;
      step: (dir: number) => void;
      goTo: (idx: number) => void;
      setView: (v: "ring" | "arc") => void;
      select: (idx: number) => void;
      hover: (idx: number) => void;
      destroy: () => void;
    } | null>(null);

    const prefersReducedMotion = useSyncExternalStore(
      subscribeReducedMotion,
      getReducedMotionSnapshot,
      () => false
    );

    const activeItems = items.length ? items : DEFAULT_ITEMS;
    const requestedCount = clamp(Math.round(count), 3, 72);
    const totalCards =
      activeItems.length >= requestedCount
        ? Math.min(activeItems.length, 72)
        : activeItems.length *
          Math.max(
            1,
            Math.min(
              Math.round(requestedCount / activeItems.length),
              Math.floor(72/ activeItems.length)
            )
          );

    const [activeIndex, setActiveIndex] = useState(0);
    const [currentView, setCurrentView] = useState<"ring" | "arc">(defaultView);

    const propsRef = useRef({
      items: activeItems,
      count: totalCards,
      spin,
      autoplay,
      interval,
      arc,
      apex,
      aspect,
      radius,
      gap,
      tilt,
      flipWave,
      accentColor,
      backgroundColor,
      captions,
      controls,
      draggable,
      wheel,
      pauseOnHover,
      zoomOnClick,
      paused,
      reduced: prefersReducedMotion,
    });

    const callbacksRef = useRef({
      onViewChange,
      onActiveChange,
      onSelect,
      list: activeItems,
    });

    useEffect(() => {
      propsRef.current = {
        items: activeItems,
        count: totalCards,
        spin,
        autoplay,
        interval,
        arc,
        apex,
        aspect,
        radius,
        gap,
        tilt,
        flipWave,
        accentColor,
        backgroundColor,
        captions,
        controls,
        draggable,
        wheel,
        pauseOnHover,
        zoomOnClick,
        paused,
        reduced: prefersReducedMotion,
      };
      callbacksRef.current = {
        onViewChange,
        onActiveChange,
        onSelect,
        list: activeItems,
      };
      controllerRef.current?.sync();
    });

    useEffect(() => {
      const root = rootRef.current;
      const stage = stageRef.current;
      if (!root || !stage) return;

      const controller = ((rootEl, stageEl, pRef, initialView, cbs) => {
        let viewW = 1;
        let viewH = 1;
        let cardWrappers: HTMLElement[] = [];
        let cardInners: HTMLElement[] = [];
        let numCards = 0;
        let angle = 0;
        let angularVel = 0;
        let snapTarget = 0;
        let isSnapping = false;
        let viewTarget = +(initialView === "arc");
        const viewSpring = { value: viewTarget, velocity: 0 };
        const hoverSpring = { value: 1, velocity: 0 };
        const cardHoverSprings: { value: number; velocity: number }[] = [];
        let hoveredIndex = -1;
        let lastReportedIndex = -1;
        let lastWaveTime = -10;
        let lastRingWave = 0;
        let autoplayTimer = 0;
        let elapsed = 0;
        let rafId = 0;
        let lastTimestamp = 0;
        let isIntersecting = false;
        let isDestroyed = false;
        let dragTriggered = false;
        let wheelDeltaAcc = 0;
        let isWheeling = false;
        let lastWheelTime = 0;
        let pointerDrag: {
          id: number;
          x: number;
          y: number;
          lastX: number;
          lastY: number;
          moved: boolean;
          samples: { t: number; d: number }[];
        } | null = null;

        const collectCards = () => {
          cardWrappers = Array.from(
            stageEl.querySelectorAll<HTMLElement>("[data-orbit-card]")
          );
          cardInners = cardWrappers.map((w) => w.firstElementChild as HTMLElement);
          numCards = cardWrappers.length;
          while (cardHoverSprings.length < numCards) {
            cardHoverSprings.push({ value: 0, velocity: 0 });
          }
          cardHoverSprings.length = numCards;
        };

        const calcDimensions = () => {
          const cfg = pRef.current;
          const cardAspect = clamp(cfg.aspect, 0.4, 2.5);
          const cardGap = clamp(cfg.gap, 0, 0.8);
          const minDim = Math.min(viewW, viewH);
          const ringRad = 0.36 * minDim;
          let ringW = (TAU * ringRad) / Math.max(numCards, 1) * (1 - cardGap);
          let ringH = ringW / cardAspect;
          const maxRingH = 0.17 * minDim;
          if (ringH > maxRingH) {
            ringH = maxRingH;
            ringW = ringH * cardAspect;
          }

          let arcH = Math.min(0.44 * viewH, (0.34 * viewW) / cardAspect);
          let arcW = arcH * cardAspect;
          const arcRad =
            Math.max(
              (Math.max(numCards, 1) * arcW) / Math.max(1 - cardGap, 0.2) / TAU,
              0.6 * Math.max(viewW, viewH)
            ) * clamp(cfg.arc, 0.4, 3);
          const maxArcW = (TAU * arcRad) / Math.max(numCards, 1) * (1 - cardGap);
          if (arcW > maxArcW) {
            arcW = maxArcW;
            arcH = arcW / cardAspect;
          }

          return {
            ringRadius: ringRad,
            ringW,
            ringH,
            arcRadius: arcRad,
            arcW,
            arcH,
            aspect: cardAspect,
          };
        };

        const updateLayout = () => {
          const rect = rootEl.getBoundingClientRect();
          viewW = Math.max(1, rect.width);
          viewH = Math.max(1, rect.height);
          const dims = calcDimensions();

          for (const card of cardWrappers) {
            card.style.width = `${dims.arcW}px`;
            card.style.height = `${dims.arcH}px`;
          }

          const radiusPx = `${clamp(pRef.current.radius, 0, 0.5) * dims.arcW}px`;
          for (const inner of cardInners) {
            for (const face of Array.from(inner.children) as HTMLElement[]) {
              face.style.borderRadius = radiusPx;
            }
          }
        };

        const getStepAngle = () => TAU / Math.max(numCards, 1);

        const getCenterIndex = () => {
          const step = getStepAngle();
          return ((Math.round(-angle / step) % numCards) + numCards) % numCards;
        };

        const wakeLoop = () => {
          if (!isDestroyed && isIntersecting && !rafId) {
            rafId = requestAnimationFrame(loop);
          }
        };

        const snapToCard = (idx: number) => {
          const step = getStepAngle();
          snapTarget = angle + wrapAngle(-idx * step - angle);
          isSnapping = true;
          autoplayTimer = 0;
          wakeLoop();
        };

        const setTargetView = (v: "ring" | "arc") => {
          const target = +(v === "arc");
          if (target !== viewTarget) {
            viewTarget = target;
            if (!pRef.current.reduced && pRef.current.flipWave) {
              lastWaveTime = elapsed;
            }
            if (target === 1) {
              snapToCard(getCenterIndex());
            } else {
              isSnapping = false;
            }
            cbs.onView(v);
            wakeLoop();
          }
        };

        const stepView = (dir: number) => {
          if (viewTarget === 1) {
            const current = isSnapping ? snapTarget : angle;
            const step = getStepAngle();
            snapTarget = Math.round(current / step) * step - dir * step;
            isSnapping = true;
            autoplayTimer = 0;
          } else {
            angularVel -= 0.9 * dir;
          }
          wakeLoop();
        };

        function loop(timestamp: number) {
          rafId = 0;
          if (isDestroyed || !numCards) return;

          const cfg = pRef.current;
          const dt = lastTimestamp
            ? Math.min(Math.max((timestamp - lastTimestamp) / 1000, 0), 0.05)
            : 1 / 60;
          lastTimestamp = timestamp;
          elapsed += dt;

          const isReduced = cfg.reduced;
          const isRunning = !cfg.paused && !isReduced;
          let needsNext = false;

          const [viewVal, viewVel] = springStep(
            viewSpring.value,
            viewSpring.velocity,
            viewTarget,
            dt,
            isReduced ? 0.05 : 1.1,
            1
          );
          viewSpring.value = viewVal;
          viewSpring.velocity = viewVel;
          if (
            Math.abs(viewSpring.value - viewTarget) > 1e-4 ||
            Math.abs(viewSpring.velocity) > 1e-4
          ) {
            needsNext = true;
          }

          const viewProgress = clamp(viewSpring.value, 0, 1);
          const isHovering = cfg.pauseOnHover && hoveredIndex >= 0;
          const [hoverVal, hoverVel] = springStep(
            hoverSpring.value,
            hoverSpring.velocity,
            isHovering || !isRunning ? 0 : 1,
            dt,
            isHovering ? 0.25 : 0.9,
            1
          );
          hoverSpring.value = hoverVal;
          hoverSpring.velocity = hoverVel;

          if (wheelDeltaAcc !== 0 && (!pointerDrag || !pointerDrag.moved)) {
            const decay = wheelDeltaAcc * (1 - Math.exp(-dt / (isReduced ? 0.02 : 0.14)));
            if (Math.abs(wheelDeltaAcc -= decay) < 1e-5) {
              wheelDeltaAcc = 0;
            }
            angle += decay;
            needsNext = true;
          }

          if (isWheeling && !pointerDrag && timestamp - lastWheelTime > 140) {
            isWheeling = false;
            if (viewTarget === 1) {
              const step = getStepAngle();
              snapTarget = Math.round(snapTarget / step) * step;
              isSnapping = true;
            }
          }
          if (isWheeling) needsNext = true;

          if (!pointerDrag || !pointerDrag.moved) {
            if (isSnapping) {
              [angle, angularVel] = springStep(
                angle,
                angularVel,
                snapTarget,
                dt,
                isReduced ? 0.05 : 0.75,
                0.92
              );
              if (
                Math.abs(angle - snapTarget) < 1e-4 &&
                Math.abs(angularVel) < 1e-4
              ) {
                angle = snapTarget;
                angularVel = 0;
                if (viewTarget === 0) isSnapping = false;
              } else {
                needsNext = true;
              }
            } else {
              const spinVel =
                ((cfg.spin * Math.PI) / 180) *
                Math.max(hoverSpring.value, 0) *
                (1 - viewProgress);
              angle += (spinVel + angularVel) * dt;
              angularVel *= Math.exp(-1.6 * dt);
              if (Math.abs(spinVel) > 1e-5 || Math.abs(angularVel) > 1e-4) {
                needsNext = true;
              }
            }
          }

          if (
            viewTarget === 1 &&
            isRunning &&
            cfg.autoplay &&
            !isHovering &&
            !pointerDrag
          ) {
            needsNext = true;
            if ((autoplayTimer += dt) >= Math.max(cfg.interval, 1)) {
              autoplayTimer = 0;
              stepView(1);
            }
          }

          if (
            viewTarget === 0 &&
            isRunning &&
            cfg.flipWave &&
            !isHovering &&
            elapsed - Math.max(lastWaveTime, lastRingWave) > 9
          ) {
            lastWaveTime = elapsed;
            lastRingWave = elapsed;
          }

          const dims = calcDimensions();
          const currentRadius =
            dims.ringRadius * Math.pow(dims.arcRadius / dims.ringRadius, viewProgress);
          const currentCardH =
            dims.ringH * Math.pow(dims.arcH / dims.ringH, viewProgress);
          const scaleFactor = currentCardH / dims.arcH;
          const ringApexOffset = viewH / 2 - dims.ringRadius;
          const currentApexY =
            ringApexOffset +
            (viewH * clamp(cfg.apex, 0.1, 0.9) - ringApexOffset) * viewProgress;
          const centerX = viewW / 2;
          const centerY = currentApexY + currentRadius;
          const stepAngle = getStepAngle();
          const waveDelta = elapsed - lastWaveTime;
          const isFlipping = cfg.flipWave && !isReduced && waveDelta < 2.4;
          if (isFlipping) needsNext = true;

          const cullPadding =
            1.3 * Math.hypot((dims.arcW * scaleFactor) / 2, (dims.arcH * scaleFactor) / 2);

          for (let i = 0; i < numCards; i++) {
            const cardAngle = angle + i * stepAngle - Math.PI / 2;
            const hSpring = cardHoverSprings[i];
            const [hVal, hVel] = springStep(
              hSpring.value,
              hSpring.velocity,
              +(i === hoveredIndex),
              dt,
              0.35,
              0.85
            );
            hSpring.value = hVal;
            hSpring.velocity = hVel;
            if (
              Math.abs(hSpring.velocity) > 1e-4 ||
              Math.abs(hSpring.value - +(i === hoveredIndex)) > 1e-4
            ) {
              needsNext = true;
            }

            const hoverPush =
              hSpring.value * (6 + 10 * (1 - viewProgress)) * (1 - 0.6 * viewProgress);
            const posX = centerX + Math.cos(cardAngle) * (currentRadius + hoverPush);
            const posY = centerY + Math.sin(cardAngle) * (currentRadius + hoverPush);
            const el = cardWrappers[i];

            if (
              posX < -cullPadding ||
              posX > viewW + cullPadding ||
              posY < -cullPadding ||
              posY > viewH + cullPadding
            ) {
              if (el.style.visibility !== "hidden") el.style.visibility = "hidden";
              continue;
            }
            if (el.style.visibility === "hidden") el.style.visibility = "";

            const rotAngle = cfg.tilt ? cardAngle + Math.PI / 2 : 0;
            const angleFromApex = Math.abs(wrapAngle(cardAngle + Math.PI / 2));
            const perspectiveDiminish =
              1 -
              0.08 *
                viewProgress *
                Math.min(Math.min(angleFromApex / stepAngle, 1.5), 1);
            const cardScale =
              (1 + hSpring.value * (0.1 - 0.06 * viewProgress)) * perspectiveDiminish;

            el.style.transform = `translate3d(${posX - dims.arcW / 2}px, ${
              posY - dims.arcH / 2
            }px, 0) rotate(${rotAngle}rad) scale(${scaleFactor * cardScale})`;

            let flipDegrees = 0;
            if (isFlipping) {
              const wavePhase = (waveDelta - 0.9 * (angleFromApex / Math.PI)) / 0.9;
              flipDegrees = 360 * easeInOutCubic(clamp(wavePhase, 0, 1));
            }
            cardInners[i].style.transform = flipDegrees
              ? `rotateY(${flipDegrees}deg)`
              : "";
            el.style.zIndex = String(
              i === hoveredIndex
                ? 1000
                : Math.round(500 - 100 * angleFromApex)
            );
          }

          const centerIdx = getCenterIndex();
          if (centerIdx !== lastReportedIndex) {
            lastReportedIndex = centerIdx;
            cbs.onActive(centerIdx);
          }

          rootEl.style.setProperty(
            "--orbit-caption-y",
            `${currentApexY + currentCardH / 2 + 20}px`
          );
          rootEl.style.setProperty("--orbit-arc", String(viewProgress));

          if (needsNext || pointerDrag) wakeLoop();
        }

        const handlePointerDown = (e: PointerEvent) => {
          if (!pRef.current.draggable || !e.isPrimary || e.button > 0) return;
          pointerDrag = {
            id: e.pointerId,
            x: e.clientX,
            y: e.clientY,
            lastX: e.clientX,
            lastY: e.clientY,
            moved: false,
            samples: [],
          };
          dragTriggered = false;
          wakeLoop();
        };

        const handlePointerMove = (e: PointerEvent) => {
          if (!pointerDrag || pointerDrag.id !== e.pointerId) return;

          if (
            !pointerDrag.moved &&
            Math.hypot(e.clientX - pointerDrag.x, e.clientY - pointerDrag.y) > 6
          ) {
            pointerDrag.moved = true;
            isSnapping = false;
            angularVel = 0;
            try {
              stageEl.setPointerCapture(e.pointerId);
            } catch {}
          }

          if (pointerDrag.moved) {
            let delta = 0;
            const rect = rootEl.getBoundingClientRect();
            if (viewTarget === 1) {
              const dims = calcDimensions();
              delta = (e.clientX - pointerDrag.lastX) / (0.92 * dims.arcRadius);
            } else {
              const midX = rect.left + viewW / 2;
              const midY = rect.top + viewH / 2;
              const prevAngle = Math.atan2(
                pointerDrag.lastY - midY,
                pointerDrag.lastX - midX
              );
              delta = wrapAngle(
                Math.atan2(e.clientY - midY, e.clientX - midX) - prevAngle
              );
            }
            angle += delta;
            const now = performance.now();
            pointerDrag.samples.push({ t: now, d: delta });
            while (
              pointerDrag.samples.length &&
              now - pointerDrag.samples[0].t > 100
            ) {
              pointerDrag.samples.shift();
            }
          }
          pointerDrag.lastX = e.clientX;
          pointerDrag.lastY = e.clientY;
          wakeLoop();
        };

        const handlePointerUp = (e: PointerEvent) => {
          if (!pointerDrag || pointerDrag.id !== e.pointerId) return;
          const drag = pointerDrag;
          pointerDrag = null;
          try {
            if (stageEl.hasPointerCapture(e.pointerId)) {
              stageEl.releasePointerCapture(e.pointerId);
            }
          } catch {}

          if (drag.moved) {
            dragTriggered = true;
            const now = performance.now();
            const valid = drag.samples.filter((s) => now - s.t < 100);
            let releaseVel = 0;
            if (valid.length > 1) {
              const dur = Math.max(
                (valid[valid.length - 1].t - valid[0].t) / 1000,
                1 / 60
              );
              releaseVel = valid.reduce((acc, s) => acc + s.d, 0) / dur;
            }
            if (viewTarget === 1) {
              const step = getStepAngle();
              snapTarget =
                Math.round((angle + 0.22 * clamp(releaseVel, -6, 6)) / step) *
                step;
              angularVel = releaseVel;
              isSnapping = true;
              autoplayTimer = 0;
            } else {
              angularVel = clamp(releaseVel, -4, 4);
            }
          }
          wakeLoop();
        };

        const handleClick = (e: MouseEvent) => {
          const target = e.target as HTMLElement | null;
          if (
            target &&
            (target.closest("[data-orbit-card]") ||
              target.closest("[data-orbit-control]"))
          ) {
            return;
          }
          if (dragTriggered) {
            dragTriggered = false;
            return;
          }
          if (viewTarget === 1 && pRef.current.zoomOnClick) {
            setTargetView("ring");
          }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            stepView(1);
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            stepView(-1);
          } else if (e.key === "Escape") {
            setTargetView("ring");
          } else if (e.key === "Enter" && e.target === rootEl) {
            e.preventDefault();
            if (viewTarget === 0) {
              setTargetView("arc");
            } else {
              cbs.onSelect(getCenterIndex());
            }
          }
        };

        const handleWheel = (e: WheelEvent) => {
          if (!pRef.current.wheel) return;
          e.preventDefault();
          const modeScale =
            e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? viewH : 1;
          const delta = clamp((e.deltaY + e.deltaX) * modeScale, -240, 240);
          if (viewTarget === 1) {
            const step = getStepAngle();
            snapTarget =
              (isSnapping ? snapTarget : angle) - (delta / 100) * step;
            isSnapping = true;
            autoplayTimer = 0;
            isWheeling = true;
          } else {
            wheelDeltaAcc -= 0.0035 * delta;
          }
          lastWheelTime = performance.now();
          wakeLoop();
        };

        stageEl.addEventListener("pointerdown", handlePointerDown);
        stageEl.addEventListener("pointermove", handlePointerMove);
        stageEl.addEventListener("pointerup", handlePointerUp);
        stageEl.addEventListener("pointercancel", handlePointerUp);
        stageEl.addEventListener("click", handleClick);
        stageEl.addEventListener("wheel", handleWheel, { passive: false });
        rootEl.addEventListener("keydown", handleKeyDown);

        const resizeObserver = new ResizeObserver(() => {
          updateLayout();
          wakeLoop();
        });
        resizeObserver.observe(rootEl);

        const intersectionObserver =
          typeof IntersectionObserver === "undefined"
            ? null
            : new IntersectionObserver(
                ([entry]) => {
                  if ((isIntersecting = entry.isIntersecting)) {
                    lastTimestamp = 0;
                    wakeLoop();
                  } else if (rafId) {
                    cancelAnimationFrame(rafId);
                    rafId = 0;
                  }
                },
                { rootMargin: "80px" }
              );

        if (intersectionObserver) {
          intersectionObserver.observe(rootEl);
        } else {
          isIntersecting = true;
        }

        collectCards();
        updateLayout();

        if (viewTarget === 1) {
          snapTarget = 0;
          isSnapping = true;
        }
        if (pRef.current.flipWave && !pRef.current.reduced) {
          lastWaveTime = 0.2;
          lastRingWave = 0.2;
        }

        wakeLoop();

        return {
          sync: () => {
            collectCards();
            updateLayout();
            lastTimestamp = 0;
            wakeLoop();
          },
          step: stepView,
          goTo: (idx: number) => {
            if (viewTarget === 0) setTargetView("arc");
            snapToCard(idx);
          },
          setView: setTargetView,
          select: (idx: number) => {
            if (dragTriggered) {
              dragTriggered = false;
              return;
            }
            if (viewTarget === 0) {
              if (pRef.current.zoomOnClick) {
                snapToCard(idx);
                viewTarget = 1;
                if (!pRef.current.reduced && pRef.current.flipWave) {
                  lastWaveTime = elapsed;
                }
                cbs.onView("arc");
                wakeLoop();
              } else {
                cbs.onSelect(idx);
              }
            } else if (idx === getCenterIndex()) {
              cbs.onSelect(idx);
            } else {
              snapToCard(idx);
            }
          },
          hover: (idx: number) => {
            hoveredIndex = idx;
            wakeLoop();
          },
          destroy: () => {
            isDestroyed = true;
            if (rafId) cancelAnimationFrame(rafId);
            intersectionObserver?.disconnect();
            resizeObserver.disconnect();
            stageEl.removeEventListener("pointerdown", handlePointerDown);
            stageEl.removeEventListener("pointermove", handlePointerMove);
            stageEl.removeEventListener("pointerup", handlePointerUp);
            stageEl.removeEventListener("pointercancel", handlePointerUp);
            stageEl.removeEventListener("click", handleClick);
            stageEl.removeEventListener("wheel", handleWheel);
            rootEl.removeEventListener("keydown", handleKeyDown);
          },
        };
      })(root, stage, propsRef, defaultView, {
        onActive: (idx: number) => {
          setActiveIndex(idx);
          const { list, onActiveChange: onAct } = callbacksRef.current;
          const item = list[idx % list.length];
          if (item) onAct?.(item, idx % list.length);
        },
        onView: (v: "ring" | "arc") => {
          setCurrentView(v);
          callbacksRef.current.onViewChange?.(v);
        },
        onSelect: (idx: number) => {
          const { list, onSelect: onSel } = callbacksRef.current;
          const item = list[idx % list.length];
          if (item) {
            onSel?.(item, idx % list.length);
            if (item.href) window.location.assign(item.href);
          }
        },
      });

      controllerRef.current = controller;
      return () => {
        controller.destroy();
        controllerRef.current = null;
      };
    }, [defaultView]);

    useEffect(() => {
      const el = captionRef.current;
      if (el && !prefersReducedMotion) {
        el.animate(
          [
            { opacity: 0, transform: "translateY(6px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 420,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          }
        );
      }
    }, [activeIndex, prefersReducedMotion]);

    useImperativeHandle(
      ref,
      () => ({
        next: () => controllerRef.current?.step(1),
        previous: () => controllerRef.current?.step(-1),
        goTo: (idx) => controllerRef.current?.goTo(idx),
        setView: (v) => controllerRef.current?.setView(v),
      }),
      []
    );

    const isArc = currentView === "arc";
    const activeItem = activeItems[activeIndex % activeItems.length];

    return (
      <div
        ref={rootRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        tabIndex={0}
        className={cn(
          "relative h-full min-h-[460px] w-full overflow-hidden outline-none select-none",
          className
        )}
        style={{
          backgroundColor,
          color: "currentColor",
          ...style,
        }}
      >
        {/* Turning 3D Stage */}
        <div ref={stageRef} style={stageStyle}>
          {Array.from({ length: totalCards }, (_, i) => {
            const item = activeItems[i % activeItems.length];
            return (
              <button
                key={i}
                type="button"
                tabIndex={-1}
                data-orbit-card=""
                aria-label={item.title ?? item.alt}
                style={cardButtonStyle}
                onClick={() => controllerRef.current?.select(i)}
                onPointerEnter={(e) => {
                  if (e.pointerType !== "touch") controllerRef.current?.hover(i);
                }}
                onPointerLeave={() => controllerRef.current?.hover(-1)}
              >
                <span style={cardInnerStyle}>
                  {/* Front card face: photo */}
                  <span
                    style={{
                      ...cardFaceStyle,
                      boxShadow:
                        "0 18px 40px -18px rgba(0, 0, 0, 0.55), 0 2px 6px -2px rgba(0, 0, 0, 0.25)",
                      backgroundColor: "rgba(127, 127, 127, 0.18)",
                    }}
                  >
                    <img
                      src={item.src}
                      alt=""
                      draggable={false}
                      decoding="async"
                      style={imgStyle}
                    />
                  </span>

                  {/* Back card face: flip wave gradient & badge number */}
                  <span
                    style={{
                      ...cardFaceStyle,
                      transform: "rotateY(180deg)",
                      background: `linear-gradient(155deg, color-mix(in oklch, ${accentColor} 88%, white) 0%, ${accentColor} 45%, color-mix(in oklch, ${accentColor} 55%, black) 100%)`,
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "flex-start",
                      padding: "8%",
                      color: "rgba(255, 255, 255, 0.95)",
                      fontSize: "clamp(10px, 1.1vw, 14px)",
                      fontVariantNumeric: "tabular-nums",
                      letterSpacing: "0.04em",
                      fontWeight: 700,
                    }}
                  >
                    {String((i % activeItems.length) + 1).padStart(2, "0")}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Screen Reader Accessibility List */}
        <ul style={srOnlyStyle}>
          {activeItems.map((item, idx) => (
            <li key={idx}>
              {item.title ? `${item.title}: ${item.alt}` : item.alt}
            </li>
          ))}
        </ul>

        {/* Central Content (Visible only in Ring View, fades out in Arc View) */}
        {children && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              opacity: "calc(1 - var(--orbit-arc, 0) * 1.6)",
              transition: "opacity 200ms ease",
            }}
          >
            <div style={{ pointerEvents: isArc ? "none" : "auto" }}>
              {children}
            </div>
          </div>
        )}

        {/* Caption & Navigation Controls (Visible in Arc View) */}
        {(captions || controls) && (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "var(--orbit-caption-y, 70%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
              pointerEvents: "none",
              opacity: "clamp(0, calc(var(--orbit-arc, 0) * 2 - 1), 1)",
              transition: "opacity 240ms ease",
            }}
          >
            {captions && activeItem && (
              <div
                ref={captionRef}
                aria-live="polite"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                  textAlign: "center",
                  maxWidth: "90%",
                }}
              >
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    lineHeight: 1.35,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {activeItem.title ?? activeItem.alt}
                </span>
                {activeItem.subtitle && (
                  <span
                    style={{
                      fontSize: 13,
                      opacity: 0.75,
                      lineHeight: 1.35,
                    }}
                  >
                    {activeItem.subtitle}
                  </span>
                )}
              </div>
            )}

            {controls && (
              <div
                data-orbit-control=""
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  pointerEvents: isArc ? "auto" : "none",
                  fontSize: 12,
                  fontVariantNumeric: "tabular-nums",
                  fontWeight: 600,
                }}
              >
                <button
                  type="button"
                  aria-label="Previous card"
                  onClick={() => controllerRef.current?.step(-1)}
                  onPointerEnter={(e) => {
                    e.currentTarget.style.background = btnBgHover;
                  }}
                  onPointerLeave={(e) => {
                    e.currentTarget.style.background = btnBgDefault;
                  }}
                  style={navBtnStyle}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>

                <span
                  style={{
                    opacity: 0.75,
                    minWidth: 54,
                    textAlign: "center",
                    letterSpacing: "0.06em",
                  }}
                >
                  {String((activeIndex % activeItems.length) + 1).padStart(2, "0")} /{" "}
                  {String(activeItems.length).padStart(2, "0")}
                </span>

                <button
                  type="button"
                  aria-label="Next card"
                  onClick={() => controllerRef.current?.step(1)}
                  onPointerEnter={(e) => {
                    e.currentTarget.style.background = btnBgHover;
                  }}
                  onPointerLeave={(e) => {
                    e.currentTarget.style.background = btnBgDefault;
                  }}
                  style={navBtnStyle}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

OrbitReel.displayName = "OrbitReel";
export default OrbitReel;
