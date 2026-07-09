"use client";

import {
    useState,
    useCallback,
    useRef,
    useEffect,
} from "react";
import Lenis from "lenis";
import About from "../components/About";
import Contact from "../components/Contact";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import Services from "../components/Services";
import Footer from "../components/Footer";
import Questionnaire from "../components/Questionnaire";
import { ThemeContext } from "../context/ThemeContext";

/* ── App / Home Page ────────────────────────────────────────────── */
export default function Home() {
    const [isDark, setIsDark] = useState(false);
    const [view, setView] = useState("portfolio");
    const [mounted, setMounted] = useState(false);
    const lenisRef = useRef<any>(null);
    const animRef = useRef<Animation | null>(null);

    // Initial load state sync on mount to prevent SSR mismatch
    useEffect(() => {
        const hasDark = document.documentElement.classList.contains("dark");
        setIsDark(hasDark);
        
        const currentView = window.location.hash === "#discovery" ? "discovery" : "portfolio";
        setView(currentView);
        
        setMounted(true);
    }, []);

    /* ── Hash-based Router with Smooth Transition ── */
    useEffect(() => {
        if (!mounted) return;

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
    }, [isDark, mounted]);

    /* ── Sync Theme Class ── */
    useEffect(() => {
        if (!mounted) return;
        const html = document.documentElement;
        if (isDark) {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
    }, [isDark, mounted]);


    /* ── Lenis smooth scroll ── */
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false,
        } as any);
        lenisRef.current = lenis;

        let frameId: number;
        const raf = (time: number) => {
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

        if (overlay) {
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
        } else {
            applyFlip();
        }
    }, [isDark]);

    // Don't render layout until mounted to prevent hydration mismatches
    if (!mounted) {
        return null;
    }

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
}
