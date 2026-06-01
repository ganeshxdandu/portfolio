import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MoonIcon, ListIcon, XIcon } from "@phosphor-icons/react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navlinks = [
        {
            name: "About",
            link: "#about",
        },
        {
            name: "Projects",
            link: "#projects",
        },
        {
            name: "Contact",
            link: "#contact",
        },
    ];

    return (
        <motion.nav
            initial={{
                opacity: 0,
                y: -20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full bg-[#F7F7F7]/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#e5e5e5]"
        >
            <div className="max-w-[600px] mx-auto h-20 px-5 lg:px-0 flex items-center justify-between">
                {/* Logo */}

                <motion.h1
                    whileHover={{
                        y: -1,
                        opacity: 0.85,
                    }}
                    whileTap={{
                        scale: 0.98,
                    }}
                    transition={{
                        duration: 0.2,
                        ease: "easeOut",
                    }}
                    className="
    text-[28px]
    font-outfit
    text-[#262626]
    tracking-[-3px]
    cursor-pointer
    select-none
    "
                >
                    GD
                </motion.h1>

                {/* Desktop */}

                <div className="hidden md:flex items-center gap-4">
                    <div className="flex gap-6 items-center">
                        {navlinks.map((link, index) => (
                            <motion.a
                                key={index}
                                href={link.link}
                                whileHover={{
                                    y: -2,
                                }}
                                transition={{
                                    duration: 0.2,
                                }}
                                className="
                                relative
                                text-[#4d4d4d]
                                tracking-tight
                                text-[14px]
                                font-outfit
                                font-light
                                after:absolute
                                after:left-0
                                after:-bottom-1
                                after:h-px
                                after:w-0
                                after:bg-[#262626]
                                after:transition-all
                                after:duration-300
                                hover:after:w-full
                                hover:text-[#262626]
                                "
                            >
                                {link.name}
                            </motion.a>
                        ))}

                        <motion.button
                            whileHover={{
                                y: -2,
                                scale: 1.01,
                            }}
                            whileTap={{
                                scale: 0.98,
                            }}
                            transition={{
                                duration: 0.2,
                            }}
                            className="
                            px-4
                            py-2
                            text-[14px]
                            text-[#F7F7F7]
                            bg-[#262626]
                            rounded-sm
                            tracking-tight
                            cursor-pointer
                            shadow-sm
                            "
                        >
                            Book A Call
                        </motion.button>
                    </div>

                    <div className="w-px h-4 bg-[#d9d9d9]" />

                    <motion.button
                        whileHover={{
                            rotate: 12,
                            scale: 1.05,
                        }}
                        whileTap={{
                            scale: 0.95,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 15,
                        }}
                        className="
                        cursor-pointer
                        p-2
                        rounded-sm
                        hover:bg-[#ececec]
                        "
                    >
                        <MoonIcon size={20} color="#4D4D4D" />
                    </motion.button>
                </div>

                {/* Mobile */}

                <div className="flex md:hidden items-center gap-2">
                    <motion.button
                        whileTap={{
                            scale: 0.95,
                        }}
                        className="
                        p-2
                        rounded-sm
                        hover:bg-[#ececec]
                        "
                    >
                        <MoonIcon size={20} color="#4D4D4D" />
                    </motion.button>

                    <motion.button
                        whileTap={{
                            scale: 0.95,
                        }}
                        onClick={() => setIsOpen(!isOpen)}
                        className="
                        p-2
                        rounded-sm
                        hover:bg-[#ececec]
                        "
                    >
                        {isOpen ? <XIcon size={22} /> : <ListIcon size={22} />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Menu */}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            height: 0,
                        }}
                        animate={{
                            opacity: 1,
                            height: "auto",
                        }}
                        exit={{
                            opacity: 0,
                            height: 0,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                        className="md:hidden overflow-hidden"
                    >
                        <div className="px-5 pb-5 border-t border-[#ececec]">
                            <div className="flex flex-col gap-1 pt-4">
                                {navlinks.map((link, index) => (
                                    <motion.a
                                        key={index}
                                        href={link.link}
                                        onClick={() => setIsOpen(false)}
                                        initial={{
                                            opacity: 0,
                                            x: -10,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            x: 0,
                                        }}
                                        transition={{
                                            delay: index * 0.05,
                                        }}
                                        className="
                                        py-3
                                        text-[15px]
                                        text-[#4d4d4d]
                                        font-outfit
                                        "
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}

                                <motion.button
                                    whileTap={{
                                        scale: 0.98,
                                    }}
                                    className="
                                    mt-3
                                    bg-[#262626]
                                    text-white
                                    py-3
                                    rounded-sm
                                    text-[14px]
                                    "
                                >
                                    Book A Call
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
