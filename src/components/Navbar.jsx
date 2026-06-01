import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MoonIcon, SunIcon, ListIcon, XIcon } from "@phosphor-icons/react";
import { useTheme } from "../App";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isDark, toggleTheme } = useTheme();

    const navlinks = [
        { name: "About",    link: "#about"    },
        { name: "Projects", link: "#projects" },
        { name: "Contact",  link: "#contact"  },
    ];

    const handleThemeToggle = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = rect.left + rect.width  / 2;
        const y = rect.top  + rect.height / 2;
        toggleTheme(x, y);
    }, [toggleTheme]);

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y:  0  }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full sticky top-0 z-50 border-b"
            style={{
                backgroundColor: "var(--color-bg-nav)",
                borderColor:     "var(--color-border-nav)",
                backdropFilter:  "blur(12px)",
            }}
        >
            <div className="max-w-[600px] mx-auto h-20 px-5 lg:px-0 flex items-center justify-between">

                {/* Logo */}
                <motion.h1
                    whileHover={{ y: -1, opacity: 0.85 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="text-[28px] font-outfit tracking-[-3px] cursor-pointer select-none"
                    style={{ color: "var(--color-text-primary)" }}
                >
                    GD
                </motion.h1>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4">
                    <div className="flex gap-6 items-center">
                        {navlinks.map((link, index) => (
                            <motion.a
                                key={index}
                                href={link.link}
                                whileHover={{ y: -2 }}
                                transition={{ duration: 0.2 }}
                                className="
                                    relative
                                    tracking-tight
                                    text-[14px]
                                    font-outfit
                                    font-light
                                    after:absolute
                                    after:left-0
                                    after:-bottom-1
                                    after:h-px
                                    after:w-0
                                    after:transition-all
                                    after:duration-300
                                    hover:after:w-full
                                "
                                style={{
                                    color: "var(--color-text-secondary)",
                                    "--tw-after-bg": "var(--color-text-primary)",
                                }}
                                onMouseEnter={e => e.currentTarget.style.color = "var(--color-text-primary)"}
                                onMouseLeave={e => e.currentTarget.style.color = "var(--color-text-secondary)"}
                            >
                                <span
                                    className="
                                        after:absolute
                                        after:left-0
                                        after:-bottom-1
                                        after:h-px
                                        after:w-0
                                        after:transition-all
                                        after:duration-300
                                        hover:after:w-full
                                    "
                                    style={{ "--after-bg": "var(--color-text-primary)" }}
                                >
                                    {link.name}
                                </span>
                            </motion.a>
                        ))}

                        <motion.a
                            whileHover={{ y: -2, scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="px-4 py-2 text-[14px] rounded-sm tracking-tight cursor-pointer shadow-sm"
                            style={{
                                backgroundColor: "var(--color-text-primary)",
                                color:           "var(--color-bg)",
                            }}
                            href="https://cal.com/ganesh-dandu-znj6u9/book?overlayCalendar=true"
                            target="_blank"
                        >
                            Let's Talk
                        </motion.a>
                    </div>

                    {/* Divider */}
                    <div
                        className="w-px h-4"
                        style={{ backgroundColor: "var(--color-border-md)" }}
                    />

                    {/* Theme Toggle – Desktop */}
                    <motion.button
                        whileHover={{ rotate: 12, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                        onClick={handleThemeToggle}
                        className="cursor-pointer p-2 rounded-sm transition-colors duration-200"
                        style={{ color: "var(--color-text-secondary)" }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--color-bg-hover)"}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                        aria-label="Toggle theme"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {isDark ? (
                                <motion.span
                                    key="sun"
                                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                    animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                                    exit   ={{ rotate:  90, opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ display: "flex" }}
                                >
                                    <SunIcon size={20} />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="moon"
                                    initial={{ rotate: 90,  opacity: 0, scale: 0.5 }}
                                    animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                                    exit   ={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ display: "flex" }}
                                >
                                    <MoonIcon size={20} />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>

                {/* Mobile Nav Controls */}
                <div className="flex md:hidden items-center gap-2">

                    {/* Theme Toggle – Mobile */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleThemeToggle}
                        className="p-2 rounded-sm transition-colors duration-200"
                        style={{ color: "var(--color-text-secondary)" }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--color-bg-hover)"}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                        aria-label="Toggle theme"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {isDark ? (
                                <motion.span
                                    key="sun-m"
                                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                    animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                                    exit   ={{ rotate:  90, opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ display: "flex" }}
                                >
                                    <SunIcon size={20} />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="moon-m"
                                    initial={{ rotate: 90,  opacity: 0, scale: 0.5 }}
                                    animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                                    exit   ={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ display: "flex" }}
                                >
                                    <MoonIcon size={20} />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>

                    {/* Hamburger */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-sm transition-colors duration-200"
                        style={{ color: "var(--color-text-primary)" }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--color-bg-hover)"}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
                    >
                        {isOpen ? <XIcon size={22} /> : <ListIcon size={22} />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit   ={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="md:hidden overflow-hidden"
                    >
                        <div
                            className="px-5 pb-5 border-t"
                            style={{ borderColor: "var(--color-bg-hover)" }}
                        >
                            <div className="flex flex-col gap-1 pt-4">
                                {navlinks.map((link, index) => (
                                    <motion.a
                                        key={index}
                                        href={link.link}
                                        onClick={() => setIsOpen(false)}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x:  0  }}
                                        transition={{ delay: index * 0.05 }}
                                        className="py-3 text-[15px] font-outfit"
                                        style={{ color: "var(--color-text-secondary)" }}
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                                <motion.a
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.98 }}
                                    href="https://cal.com/ganesh-dandu-znj6u9/book?overlayCalendar=true"
                                    target="_blank"
                                    className="mt-4 h-11 w-full flex items-center justify-center rounded-sm text-[14px] tracking-tight font-light transition-all duration-300"
                                    style={{
                                        backgroundColor: "var(--color-text-primary)",
                                        color:           "var(--color-bg)",
                                    }}
                                >
                                    Let's Talk
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
