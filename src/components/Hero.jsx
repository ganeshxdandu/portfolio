import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SealCheckIcon } from "@phosphor-icons/react";
import PFP from "../assets/profile.jpeg";

const taglines = [
    "22 • Engineer",
    "Chronically curious. Occasionally dangerous.",
    "Obsessed with simplicity and detail.",
    "Turning ideas into memorable websites.",
    "Pixels, products, and possibilities.",
];

const AnimatedTagline = ({ text }) => {
    const words = text.split(" ");

    return (
        <div className="flex flex-wrap gap-x-1">
            {words.map((word, index) => (
                <motion.span
                    key={`${word}-${index}`}
                    initial={{ opacity: 0, filter: "blur(10px)", y: 8 }}
                    animate={{ opacity: 1, filter: "blur(0px)",  y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: index * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </div>
    );
};

const Hero = () => {
    const [currentTagline, setCurrentTagline] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTagline((prev) => (prev + 1) % taglines.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="w-full">
            <div className="max-w-150 mx-auto px-5 lg:px-0 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0  }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col sm:flex-row gap-5 sm:gap-6"
                >
                    {/* Profile */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1    }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        whileHover={{ y: -2 }}
                        className="profile w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden flex-shrink-0"
                    >
                        <motion.img
                            src={PFP}
                            alt="Profile"
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.04 }}
                            transition={{ duration: 0.4 }}
                        />
                    </motion.div>

                    {/* Content */}
                    <div className="info flex justify-between items-start flex-col py-1 sm:py-2">
                        <div className="top">
                            <div className="heading flex gap-2 items-center mb-1">
                                <motion.h1
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0  }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="text-[28px] sm:text-3xl tracking-tighter"
                                    style={{ color: "var(--color-text-primary)" }}
                                >
                                    Ganesh Dandu
                                </motion.h1>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.45, type: "spring", stiffness: 250 }}
                                >
                                    <SealCheckIcon size={24} color="#008EE7" weight="fill" />
                                </motion.div>
                            </div>

                            {/* Rotating Tagline */}
                            <div
                                className="h-5 overflow-hidden tracking-tight text-[14px] font-outfit font-light pl-px"
                                style={{ color: "var(--color-text-secondary)" }}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentTagline}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                    >
                                        <AnimatedTagline text={taglines[currentTagline]} />
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Availability */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0  }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ y: -1 }}
                            className="group flex items-center gap-2.5 w-max mt-4 px-3 py-1 rounded-full border transition-all duration-300"
                            style={{
                                backgroundColor: "var(--color-bg-card)",
                                borderColor:     "var(--color-border)",
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.backgroundColor = "var(--color-bg-hover-sm)";
                                e.currentTarget.style.borderColor     = "var(--color-border-lg)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.backgroundColor = "var(--color-bg-card)";
                                e.currentTarget.style.borderColor     = "var(--color-border)";
                            }}
                        >
                            <span className="relative flex h-2 w-2">
                                <span
                                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-50"
                                    style={{ backgroundColor: "var(--color-green)" }}
                                />
                                <span
                                    className="relative inline-flex h-2 w-2 rounded-full"
                                    style={{ backgroundColor: "var(--color-green)" }}
                                />
                            </span>

                            <span
                                className="text-[12px] tracking-tight font-outfit"
                                style={{ color: "var(--color-text-muted)" }}
                            >
                                Available for Projects
                            </span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;