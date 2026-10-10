import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type PointerEvent,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { X } from "lucide-react";
import Lenis from "lenis";
export function SmoothScroll() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;
    const setup = () => {
      lenis?.destroy();
      lenis = undefined;
      if (!reduce.matches)
        lenis = new Lenis({
          autoRaf: true,
          lerp: 0.12,
          smoothWheel: true,
          syncTouch: false,
          anchors: { offset: -100 },
          prevent: (node) =>
            !!node.closest("dialog, textarea") ||
            !!document.querySelector("dialog[open]"),
        });
    };
    setup();
    reduce.addEventListener("change", setup);
    return () => {
      reduce.removeEventListener("change", setup);
      lenis?.destroy();
    };
  }, []);
  return null;
}
export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}
export function Reveal({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (
      !node ||
      !("IntersectionObserver" in window) ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    node.classList.add("will-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          node.classList.add("is-visible", "is-shown");
          observer.disconnect();
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -25px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </div>
  );
}
export function Magnetic({
  children,
  strength = 5,
}: {
  children: ReactNode;
  strength?: number;
}) {
  const x = useSpring(0, { stiffness: 260, damping: 24 }),
    y = useSpring(0, { stiffness: 260, damping: 24 });
  const reduce = useReducedMotion();
  function track(e: PointerEvent<HTMLDivElement>) {
    if (
      reduce ||
      e.pointerType !== "mouse" ||
      !matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    const box = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - box.left) / box.width - 0.5) * strength * 2);
    y.set(((e.clientY - box.top) / box.height - 0.5) * strength * 2);
  }
  return (
    <div
      className="magnetic"
      onPointerMove={track}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div style={{ x, y }}>{children}</motion.div>
    </div>
  );
}
export function Tilt({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const outer = useRef<HTMLDivElement>(null),
    card = useRef<HTMLDivElement>(null);
  function track(e: PointerEvent<HTMLDivElement>) {
    if (
      e.pointerType !== "mouse" ||
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)),
      py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    outer.current?.classList.add("is-hover");
    card.current?.classList.add("is-tilting");
    card.current?.style.setProperty(
      "--tilt-ry",
      `${((px - 0.5) * 7).toFixed(2)}deg`,
    );
    card.current?.style.setProperty(
      "--tilt-rx",
      `${((0.5 - py) * 7).toFixed(2)}deg`,
    );
    card.current?.style.setProperty("--tilt-gx", `${px * 100}%`);
    card.current?.style.setProperty("--tilt-gy", `${py * 100}%`);
  }
  function reset() {
    outer.current?.classList.remove("is-hover");
    card.current?.classList.remove("is-tilting");
    card.current?.style.setProperty("--tilt-rx", "0deg");
    card.current?.style.setProperty("--tilt-ry", "0deg");
  }
  return (
    <div
      ref={outer}
      className={`t-tilt ${className}`}
      onPointerMove={track}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      <div ref={card} className="t-tilt-card">
        {children}
        <div className="t-tilt-glare" />
      </div>
    </div>
  );
}
export function Cursor() {
  const x = useMotionValue(-100),
    y = useMotionValue(-100);
  const trailX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.5 }),
    trailY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.5 });
  const ringTransform = useTransform(
      [trailX, trailY],
      ([px, py]) => `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%)`,
    ),
    dotTransform = useTransform(
      [x, y],
      ([px, py]) => `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%)`,
    );
  const [state, setState] = useState({
    visible: false,
    interactive: false,
    label: "",
  });
  useEffect(() => {
    const enabled = matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const hide = () =>
      setState((previous) => ({ ...previous, visible: false }));
    const move = (e: globalThis.PointerEvent) => {
      if (!enabled.matches || e.pointerType !== "mouse") {
        hide();
        return;
      }
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target instanceof Element ? e.target : null;
      const field = !!target?.closest(
          'input, textarea, select, [contenteditable="true"]',
        ),
        interactive = !!target?.closest("a, button"),
        label = target?.closest('[data-cursor="view"]') ? "VIEW" : "";
      setState((previous) =>
        previous.visible === !field &&
        previous.interactive === interactive &&
        previous.label === label
          ? previous
          : { visible: !field, interactive, label },
      );
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    enabled.addEventListener("change", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      enabled.removeEventListener("change", hide);
    };
  }, [x, y]);
  return (
    <div
      className="cursor-system"
      aria-hidden="true"
      data-visible={state.visible}
      data-interactive={state.interactive}
      data-view={!!state.label}
    >
      <motion.div className="cursor-ring" style={{ transform: ringTransform }}>
        <span>{state.label}</span>
      </motion.div>
      <motion.div className="cursor-dot" style={{ transform: dotTransform }} />
    </div>
  );
}
export function ScrollRail({
  active,
  sections,
}: {
  active: string;
  sections: { id: string; label: string }[];
}) {
  const [progress, setProgress] = useState(0);
  const [trackHeight, setTrackHeight] = useState(0);
  const ruler = useRef<HTMLDivElement>(null);
  const trackY = useMotionValue(0);
  const markerY = useMotionValue(0);
  const progressFraction = useMotionValue(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const max = Math.max(
        0,
        document.documentElement.scrollHeight - innerHeight,
      );
      const offset = Math.min(max, Math.max(0, scrollY));
      const fraction = max > 0 ? offset / max : 0;
      // Tick marks travel with the document; the marker follows viewport progress.
      const range = Math.max(0, (ruler.current?.clientHeight ?? 0) - 18);
      setTrackHeight(max + range);
      trackY.set(-offset);
      markerY.set(fraction * range);
      progressFraction.set(fraction);
      setProgress(Math.round(fraction * 100));
    };
    const schedule = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          update();
          frame = 0;
        });
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [trackY, markerY, progressFraction]);
  return (
    <>
      <motion.div
        className="mobile-page-progress"
        style={{ scaleX: progressFraction }}
        aria-hidden="true"
      />
      <aside
        className="scroll-rail"
        aria-label="Page progress and section navigation"
      >
        <div
          ref={ruler}
          className="ruler"
          role="progressbar"
          aria-label="Page position"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <motion.div
            className="ruler-track"
            style={{ height: trackHeight, y: trackY }}
            aria-hidden="true"
          >
            {Array.from({ length: 101 }, (_, i) => (
              <div
                key={i}
                className={`ruler-tick ${i % 5 === 0 ? "ruler-tick--major" : ""}`}
                style={{ top: `${i}%` }}
              >
                {i % 5 === 0 && <span>{i}</span>}
              </div>
            ))}
          </motion.div>
          <motion.div
            className="ruler-marker"
            style={{ y: markerY }}
            aria-hidden="true"
          >
            <span className="ruler-readout">
              <span className="ruler-digits">
                {String(progress)
                  .padStart(3, "0")
                  .split("")
                  .map((digit, index) => (
                    <span className="ruler-digit-slot" key={index}>
                      <span
                        className="ruler-digit-col"
                        style={{ transform: `translateY(-${digit}em)` }}
                      >
                        {Array.from({ length: 10 }, (_, number) => (
                          <span key={number}>{number}</span>
                        ))}
                      </span>
                    </span>
                  ))}
              </span>
              <span>%</span>
            </span>
          </motion.div>
        </div>
        <div className="rail-links">
          {sections
            .filter((section) =>
              ["home", "projects", "about", "contact"].includes(section.id),
            )
            .map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={active === section.id ? "is-active" : ""}
                aria-current={active === section.id ? "location" : undefined}
              >
                {section.label}
              </a>
            ))}
        </div>
      </aside>
    </>
  );
}
export function Dialog({
  children,
  title,
  onDismiss,
  wide = false,
}: {
  children: ReactNode;
  title: string;
  onDismiss: () => void;
  wide?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null),
    timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined),
    closing = useRef(false);
  useEffect(() => {
    const node = dialog.current,
      previous = document.activeElement as HTMLElement | null,
      previousOverflow = document.body.style.overflow;
    node?.showModal();
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => node?.classList.add("is-open"));
    return () => {
      clearTimeout(timer.current);
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      node?.close();
      previous?.focus({ preventScroll: true });
    };
  }, []);
  function close() {
    if (closing.current) return;
    closing.current = true;
    dialog.current?.classList.remove("is-open");
    dialog.current?.classList.add("is-closing");
    const ms = matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--modal-close-dur",
          ),
        ) || 150;
    timer.current = setTimeout(onDismiss, ms);
  }
  return (
    <dialog
      ref={dialog}
      className={`detail-dialog t-modal ${wide ? "dialog-wide" : ""}`}
      aria-labelledby="dialog-title"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === dialog.current) {
          const r = dialog.current.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            close();
        }
      }}
    >
      <div className="dialog-header">
        <h2 id="dialog-title">{title}</h2>
        <button
          className="icon-button"
          autoFocus
          onClick={close}
          aria-label="Close preview"
        >
          <X size={20} />
        </button>
      </div>
      <div className="dialog-body">{children}</div>
    </dialog>
  );
}
