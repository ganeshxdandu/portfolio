import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";

const thoughts = [
    "Good design feels inevitable.",
    "Simple is difficult.",
    "Details build trust.",
    "Every pixel has a purpose.",
    "Clarity beats complexity.",
];

const Footer = () => {
    const [currentThought, setCurrentThought] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentThought((prev) =>
                prev === thoughts.length - 1 ? 0 : prev + 1,
            );
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="w-full">
            <div className="max-w-150 mx-auto px-5 lg:px-0 pt-12 pb-8">
                {/* Divider */}
                <div
                    className="w-full h-px mb-12"
                    style={{ backgroundColor: "var(--color-border)" }}
                />

                {/* Top */}
                <div className="flex flex-col lg:flex-row justify-between gap-12">
                    {/* Left */}
                    <div className="max-w-[420px]">
                        <h2
                            className="text-[28px] tracking-[-0.08em] mb-2"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            GD
                        </h2>

                        <p
                            className="text-[14px] tracking-tight leading-4 font-light"
                            style={{ color: "var(--color-text-secondary)" }}
                        >
                            Designer &amp; Developer crafting minimal websites
                            with intention.
                        </p>

                        {/* Availability */}
                        <div className="flex items-center gap-2 mt-6">
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [1, 0.6, 1],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="h-2 w-2 rounded-full"
                                style={{
                                    backgroundColor: "var(--color-green)",
                                }}
                            />
                            <p
                                className="text-[13px] tracking-tight font-light"
                                style={{ color: "var(--color-text-muted)" }}
                            >
                                Available for Projects
                            </p>
                        </div>
                    </div>

                    {/* Right – Social Links */}
                    <div className="space-y-4">
                        {[
                            { label: "X", href: "https://x.com/ganeshxdandu" },
                            { label: "LinkedIn", href: "https://linkedin.in/" },
                            {
                                label: "Email",
                                href: "mailto:ganeshdandu.co@gmail.com",
                            },
                        ].map((item) => (
                            <motion.a
                                key={item.label}
                                href={item.href}
                                whileHover={{ x: 2 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center gap-1 w-max text-[14px] tracking-tight font-light group"
                                style={{ color: "var(--color-text-primary)" }}
                                target="_blank"
                            >
                                {item.label}
                                <ArrowUpRightIcon
                                    size={14}
                                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Current Thought */}
                <div className="mt-16">
                    <p
                        className="text-[12px] tracking-tight font-light mb-2"
                        style={{ color: "var(--color-text-subtle)" }}
                    >
                        Current Thought
                    </p>

                    <AnimatePresence mode="wait">
                        <motion.p
                            key={currentThought}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.3 }}
                            className="text-[15px] tracking-tight font-normal"
                            style={{ color: "var(--color-text-primary)" }}
                        >
                            "{thoughts[currentThought]}"
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* Bottom */}
                <div
                    className="mt-12 pt-6 border-t flex justify-between items-center flex-wrap gap-4"
                    style={{ borderColor: "var(--color-border)" }}
                >
                    <p
                        className="text-[13px] tracking-tight font-light"
                        style={{ color: "var(--color-text-subtle)" }}
                    >
                        © 2026 Ganesh Dandu
                    </p>

                    <p
                        className="text-[13px] tracking-tight font-light"
                        style={{ color: "var(--color-text-subtle)" }}
                    >
                        Made with curiosity.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
