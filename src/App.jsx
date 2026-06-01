import { useState, createContext, useContext, useCallback, useRef } from "react";
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

/* ── Easing ─────────────────────────────────────────────────────── */
// Ease-in-out cubic  (matches design system motion)
const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/* ── App ────────────────────────────────────────────────────────── */
const App = () => {
    const [isDark, setIsDark] = useState(false);
    const rafRef = useRef(null);

    /**
     * toggleTheme(originX, originY)
     *
     * Exact sequence — no flicker, real mask-reveal:
     *
     *  Frame A  →  Paint overlay with OLD bg colour (hole radius = 0).
     *              Page is fully covered; nothing visible changed yet.
     *
     *  Frame B  →  Flip html.dark (content switches underneath overlay).
     *              User sees nothing — overlay still fully covers page.
     *
     *  Frame B+ →  rAF loop grows the transparent hole from the button
     *              origin outward.  Content inside the hole = new theme.
     *              Content outside = still hidden under old-colour overlay.
     *
     *  Done     →  Clear overlay. New theme fully visible everywhere.
     */
    const toggleTheme = useCallback(
        (originX, originY) => {
            const overlay = document.getElementById("theme-reveal");
            if (!overlay) return;

            // Cancel any in-progress animation
            if (rafRef.current) cancelAnimationFrame(rafRef.current);

            const nextDark = !isDark;
            const oldBg    = nextDark ? "#F7F7F7" : "#0F0F0F";
            const DURATION = 900; // ms  — slower, smoother

            /* ── Helper: write mask at a given hole radius ── */
            const applyMask = (r) => {
                const grad = `radial-gradient(circle at ${originX}px ${originY}px, transparent ${r}px, black ${r}px)`;
                overlay.style.maskImage       = grad;
                overlay.style.webkitMaskImage = grad;
            };

            /* ── Frame A: cover page with old colour, hole = 0 ── */
            overlay.style.backgroundColor = oldBg;
            applyMask(0);

            /* ── Frame B: theme flip (still hidden under overlay) ── */
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    /* flip theme — content changes but overlay covers it */
                    if (nextDark) {
                        document.documentElement.classList.add("dark");
                    } else {
                        document.documentElement.classList.remove("dark");
                    }
                    setIsDark(nextDark);

                    /* ── Frame B+: animate the growing hole ── */
                    const maxR = Math.hypot(window.innerWidth, window.innerHeight) * 1.15;
                    const startTime = performance.now();

                    const animate = (now) => {
                        const t = Math.min((now - startTime) / DURATION, 1);
                        applyMask(easeInOutCubic(t) * maxR);

                        if (t < 1) {
                            rafRef.current = requestAnimationFrame(animate);
                        } else {
                            /* Done — remove overlay completely */
                            overlay.style.backgroundColor = "transparent";
                            overlay.style.maskImage       = "";
                            overlay.style.webkitMaskImage = "";
                            rafRef.current = null;
                        }
                    };

                    rafRef.current = requestAnimationFrame(animate);
                });
            });
        },
        [isDark]
    );

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {/* Full-screen overlay driven by JS mask animation */}
            <div id="theme-reveal" />

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
