import { useState, createContext, useContext, useCallback, useRef, useEffect } from "react";
import Lenis from "lenis";
import About from "./components/About";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Footer from "./components/Footer";

/* ── Theme context ──────────────────────────────────────────────── */
export const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

/* ── App ────────────────────────────────────────────────────────── */
const App = () => {
    // Sync with whatever the blocking <script> in index.html already set
    const [isDark, setIsDark] = useState(
        () => document.documentElement.classList.contains("dark")
    );
    const lenisRef = useRef(null);

    /* ── Lenis smooth scroll ── */
    useEffect(() => {
        const lenis = new Lenis({
            duration:    1.4,
            easing:      (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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
     * Blur Dissolve — Apple / Linear / Raycast-grade subtlety.
     *
     *  1. Add `.theme-transitioning` to #root.
     *     CSS transition kicks in: blur 0 → 10px, opacity 1 → 0.88
     *     over 210ms (ease-in-out).
     *
     *  2. At peak blur (210ms), swap html.dark instantly.
     *     The blur fully conceals the colour repaint — zero visible flash.
     *
     *  3. Remove `.theme-transitioning` from #root.
     *     CSS transition runs in reverse: blur 10px → 0, opacity 0.88 → 1
     *     over 210ms (ease-in-out).
     *
     *  Total: ~420ms. Feels like changing the paper stock beneath the text.
     */
    const toggleTheme = useCallback(
        () => {
            const HALF_MS  = 210;
            const root     = document.getElementById("root");
            const nextDark = !isDark;

            const applyFlip = () => {
                if (nextDark) {
                    document.documentElement.classList.add("dark");
                } else {
                    document.documentElement.classList.remove("dark");
                }
                setIsDark(nextDark);
                try { localStorage.setItem("theme", nextDark ? "dark" : "light"); } catch (_) {}
            };

            /* Phase 1 — blur in */
            root.classList.add("theme-transitioning");

            /* Phase 2 — swap theme at peak blur, then blur out */
            setTimeout(() => {
                applyFlip();
                setTimeout(() => {
                    root.classList.remove("theme-transitioning");
                }, HALF_MS);
            }, HALF_MS);
        },
        [isDark]
    );

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme, lenisRef }}>
            <Navbar />
            <Hero />
            <About />
            <Services />
            <Projects />
            <Contact />
            <Footer />
        </ThemeContext.Provider>
    );
};

export default App;
