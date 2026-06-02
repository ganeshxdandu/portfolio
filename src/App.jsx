/* eslint-disable react-refresh/only-export-components */
import {
    useState,
    createContext,
    useContext,
    useCallback,
    useRef,
    useEffect,
} from "react";
import Lenis from "lenis";
import About from "./components/About";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Footer from "./components/Footer";
import Questionnaire from "./components/Questionnaire";

/* ── Theme context ──────────────────────────────────────────────── */
export const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

/* ── App ────────────────────────────────────────────────────────── */
const App = () => {
    const [isDark, setIsDark] = useState(() =>
        document.documentElement.classList.contains("dark"),
    );
    const [view, setView] = useState(() =>
        window.location.hash === "#discovery" ? "discovery" : "portfolio"
    );
    const lenisRef = useRef(null);
    const animRef = useRef(null);

    /* ── Hash-based Router with Smooth Transition ── */
    useEffect(() => {
        const handleHashChange = () => {
            const nextView = window.location.hash === "#discovery" ? "discovery" : "portfolio";
            
            const overlay = document.getElementById("theme-overlay");
            if (!overlay) {
                setView(nextView);
                const html = document.documentElement;
                if (isDark) {
                    html.classList.add("dark");
                } else {
                    html.classList.remove("dark");
                }
                window.scrollTo({ top: 0, behavior: "instant" });
                return;
            }

            const FADE_IN = 400; // ms
            const FADE_OUT = 600; // ms

            // Match old state background
            const currentDark = document.documentElement.classList.contains("dark");
            const oldBg = currentDark ? "#0F0F0F" : "#F7F7F7";
            const newBg = isDark ? "#0F0F0F" : "#F7F7F7";

            if (animRef.current) {
                animRef.current.cancel();
            }

            overlay.style.backgroundColor = oldBg;

            const fadeIn = overlay.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: FADE_IN,
                easing: "ease-in-out",
                fill: "forwards",
            });
            animRef.current = fadeIn;

            fadeIn.finished.then(() => {
                setView(nextView);

                const html = document.documentElement;
                if (isDark) {
                    html.classList.add("dark");
                } else {
                    html.classList.remove("dark");
                }

                window.scrollTo({ top: 0, behavior: "instant" });
                overlay.style.backgroundColor = newBg;

                const fadeOut = overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
                    duration: FADE_OUT,
                    easing: "ease-in-out",
                    fill: "forwards",
                });
                animRef.current = fadeOut;

                fadeOut.finished.then(() => {
                    overlay.getAnimations().forEach((a) => a.cancel());
                    overlay.style.backgroundColor = "";
                    animRef.current = null;
                });
            });
        };
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, [isDark]);

    /* ── Sync Theme Class ── */
    useEffect(() => {
        const html = document.documentElement;
        if (isDark) {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    }, [isDark]);

    /* ── Lenis smooth scroll ── */
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false,
        });
        lenisRef.current = lenis;

        let frameId;
        const raf = (time) => {
            lenis.raf(time);
            frameId = requestAnimationFrame(raf);
        };
        frameId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(frameId);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    /**
     * toggleTheme()
     *
     * Dip-to-colour dissolve — premium, zero-snap, guaranteed.
     * ─────────────────────────────────────────────────────────
     *
     * backdrop-filter blur alone cannot hide large uniform colour
     * changes — if the whole page shifts dark→light, a blurred page
     * still shows that shift. The only reliable cover is a fully
     * opaque overlay.
     *
     * Phase 1 (FADE_IN ms):
     *   Overlay fades from transparent → fully opaque, matching the
     *   current theme's background colour. A subtle blur is layered
     *   on top for a premium frosted-glass aesthetic.
     *
     * At peak (overlay 100% opaque):
     *   html.dark toggled — content fully hidden, zero snap possible.
     *
     * Phase 2 (FADE_OUT ms):
     *   Overlay background transitions to the NEW theme colour, then
     *   fades from opaque → transparent, revealing the new theme.
     *
     * Total: FADE_IN + FADE_OUT ms. Smooth in both directions.
     */
    const toggleTheme = useCallback(() => {
        const FADE_IN = 500; // ms
        const FADE_OUT = 800; // ms

        const html = document.documentElement;
        const overlay = document.getElementById("theme-overlay");
        const nextDark = !isDark;
        const oldBg = nextDark ? "#F7F7F7" : "#0F0F0F";
        const newBg = nextDark ? "#0F0F0F" : "#F7F7F7";

        const applyFlip = () => {
            if (nextDark) html.classList.add("dark");
            else html.classList.remove("dark");
            setIsDark(nextDark);
            try {
                localStorage.setItem("theme", nextDark ? "dark" : "light");
            } catch {
                // Ignore private browsing storage quota exceptions
            }
        };

        if (animRef.current) {
            animRef.current.cancel();
            animRef.current = null;
        }

        /* Set solid background BEFORE fading in — so overlay is opaque */
        overlay.style.backgroundColor = oldBg;

        /* Phase 1 — fade overlay IN (opacity 0 → 1) */
        const fadeIn = overlay.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: FADE_IN,
            easing: "ease-in-out",
            fill: "forwards",
        });
        animRef.current = fadeIn;

        fadeIn.finished.then(() => {
            /* Overlay is 100% opaque — safe to flip */
            applyFlip();

            /* Switch overlay to new bg colour (invisible — still fully opaque) */
            overlay.style.backgroundColor = newBg;

            /* Phase 2 — fade overlay OUT (opacity 1 → 0) */
            const fadeOut = overlay.animate([{ opacity: 1 }, { opacity: 0 }], {
                duration: FADE_OUT,
                easing: "ease-in-out",
                fill: "forwards",
            });
            animRef.current = fadeOut;

            fadeOut.finished.then(() => {
                overlay.getAnimations().forEach((a) => a.cancel());
                overlay.style.backgroundColor = "";
                animRef.current = null;
            });
        });
    }, [isDark]);

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme, lenisRef }}>
            <div id="theme-overlay" />
            <Navbar view={view} />
            {view === "discovery" ? (
                <Questionnaire />
            ) : (
                <>
                    <Hero />
                    <About />
                    <Services />
                    <Projects />
                    <Contact />
                    <Footer />
                </>
            )}
        </ThemeContext.Provider>
    );
};

export default App;
