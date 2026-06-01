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
                prev === thoughts.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="w-full">
            <div className="max-w-150 mx-auto px-5 lg:px-0 pt-12 pb-8">

                {/* Divider */}

                <div className="w-full h-px bg-[#ECECEC] mb-12" />

                {/* Top */}

                <div className="flex flex-col lg:flex-row justify-between gap-12">

                    {/* Left */}

                    <div className="max-w-[420px]">

                        <h2
                            className="
                            text-[28px]
                            tracking-[-0.08em]
                            text-[#262626]
                            mb-3
                            "
                        >
                            GD
                        </h2>

                        <p
                            className="
                            text-[14px]
                            text-[#4D4D4D]
                            tracking-tight
                            leading-7
                            font-light
                            "
                        >
                            Designer & Developer crafting
                            minimal websites with intention.
                        </p>

                        {/* Availability */}

                        <div
                            className="
                            flex
                            items-center
                            gap-2
                            mt-6
                            "
                        >
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [1, 0.6, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                                className="
                                h-2
                                w-2
                                rounded-full
                                bg-[#22C55E]
                                "
                            />

                            <p
                                className="
                                text-[13px]
                                text-[#666666]
                                tracking-tight
                                font-light
                                "
                            >
                                Available for Projects
                            </p>
                        </div>

                    </div>

                    {/* Right */}

                    <div className="space-y-4">

                        {[
                            {
                                label: "X",
                                href: "https://x.com/ganeshxdandu",
                            },
                            {
                                label: "LinkedIn",
                                href: "#",
                            },
                            {
                                label: "Email",
                                href: "mailto:ganeshdandu.co@gmail.com",
                            },
                        ].map((item) => (
                            <motion.a
                                key={item.label}
                                href={item.href}
                                whileHover={{
                                    x: 2,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                                className="
                                flex
                                items-center
                                gap-1
                                w-max
                                text-[14px]
                                text-[#262626]
                                tracking-tight
                                font-light
                                group
                                "
                                target="_blank"
                            >
                                {item.label}

                                <ArrowUpRightIcon
                                    size={14}
                                    className="
                                    transition-transform
                                    duration-300
                                    group-hover:translate-x-0.5
                                    group-hover:-translate-y-0.5
                                    "
                                />
                            </motion.a>
                        ))}
                    </div>

                </div>

                {/* Thought */}

                <div className="mt-16">

                    <p
                        className="
                        text-[12px]
                        text-[#999999]
                        tracking-tight
                        font-light
                        mb-2
                        "
                    >
                        Current Thought
                    </p>

                    <AnimatePresence mode="wait">

                        <motion.p
                            key={currentThought}
                            initial={{
                                opacity: 0,
                                y: 6,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                opacity: 0,
                                y: -6,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                            className="
                            text-[15px]
                            text-[#262626]
                            tracking-tight
                            font-normal
                            "
                        >
                            "{thoughts[currentThought]}"
                        </motion.p>

                    </AnimatePresence>

                </div>

                {/* Bottom */}

                <div
                    className="
                    mt-12
                    pt-6
                    border-t
                    border-[#ECECEC]
                    flex
                    justify-between
                    items-center
                    flex-wrap
                    gap-4
                    "
                >
                    <p
                        className="
                        text-[13px]
                        text-[#999999]
                        tracking-tight
                        font-light
                        "
                    >
                        © 2026 Ganesh Dandu
                    </p>

                    <p
                        className="
                        text-[13px]
                        text-[#999999]
                        tracking-tight
                        font-light
                        "
                    >
                        Made with curiosity.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;