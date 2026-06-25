import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Newspaper from "./Newspaper";
import BurnLayer from "./BurnLayer";

const Ctx = createContext(null);
export const useTransition = () => useContext(Ctx);

const BURN_MS = 1900;

const introDone = () => {
  try {
    return typeof window !== "undefined" && window.sessionStorage.getItem("np_intro_done") === "1";
  } catch (e) {
    return false;
  }
};

export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [phase, setPhase] = useState(() => (introDone() ? "idle" : "intro")); // intro | cover | burning | idle
  const phaseRef = useRef(introDone() ? "idle" : "intro");
  const sheetRef = useRef(null);
  const burnRef = useRef(null);
  const rafRef = useRef(0);
  const pendingPath = useRef(null);

  const setP = useCallback((v) => {
    phaseRef.current = v;
    setPhase(v);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", phase !== "idle");
  }, [phase]);

  const runBurn = useCallback(() => {
    setP("burning");
    if (burnRef.current) burnRef.current.start();
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / BURN_MS);
      if (sheetRef.current) {
        const b0 = t * 132 - 12;
        sheetRef.current.style.setProperty("--b0", b0 + "%");
        sheetRef.current.style.setProperty("--b1", b0 + 12 + "%");
      }
      if (burnRef.current) burnRef.current.render(t);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        if (burnRef.current) burnRef.current.stop();
        if (sheetRef.current) {
          sheetRef.current.style.removeProperty("--b0");
          sheetRef.current.style.removeProperty("--b1");
        }
        setP("idle");
      }
    };
    rafRef.current = requestAnimationFrame(step);
  }, [setP]);

  const burnNavigate = useCallback(
    (path) => {
      if (phaseRef.current !== "idle") return;
      if (path === location.pathname) return;
      pendingPath.current = path;
      setP("cover");
      // allow the newspaper to paint over the current tab, then load the
      // next tab behind it and start the burn.
      requestAnimationFrame(() => {
        setTimeout(() => {
          navigate(path);
          runBurn();
        }, 150);
      });
    },
    [navigate, location.pathname, runBurn, setP]
  );

  const onIntroClick = useCallback(() => {
    if (phaseRef.current !== "intro") return;
    try {
      window.sessionStorage.setItem("np_intro_done", "1");
    } catch (e) {
      /* ignore */
    }
    runBurn();
  }, [runBurn]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const showOverlay = phase !== "idle";
  const showClickHere = phase === "intro";

  return (
    <Ctx.Provider value={{ burnNavigate, phase }}>
      {children}

      {showOverlay && (
        <div
          className="newspaper-overlay"
          aria-hidden="true"
          data-testid="newspaper-overlay"
          onClick={showClickHere ? onIntroClick : undefined}
        >
          <Newspaper
            sheetRef={sheetRef}
            burning={phase === "burning"}
            showClickHere={showClickHere}
            onIgnite={onIntroClick}
          />
          <BurnLayer ref={burnRef} />
        </div>
      )}

      {/* SVG filter that gives the dissolving mask a jagged, charred edge */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id="burn-displace" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.016"
            numOctaves="3"
            seed="11"
            stitchTiles="stitch"
            result="t"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="t"
            scale="46"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </Ctx.Provider>
  );
}
