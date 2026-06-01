import { motion } from "motion/react";

const services = [
    {
        number: "01",
        title: "Web Design",
        description:
            "I design websites from scratch in Figma — no templates, no shortcuts. Every layout and component is built around your business, not a framework.",
    },
    {
        number: "02",
        title: "Web Development",
        description:
            "I build it clean, fast, and responsive — no bloat, no shortcuts. Every line of code is written to match the design exactly.",
    },
];

const Services = () => {
    return (
        <section className="w-full">
            <div className="max-w-150 mx-auto py-12 px-5 lg:px-0">
                {/* Heading */}

                <motion.div
                    initial={{
                        opacity: 0,
                        x: -10,
                    }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.5,
                    }}
                    className="flex items-center gap-3 mb-8"
                >
                    <div className="h-5 w-px bg-[#D9D9D9]" />

                    <h2
                        className="
        text-2xl
        tracking-tighter
        text-[#262626]
        "
                    >
                        What I Do
                    </h2>
                </motion.div>

                {/* Services */}

                <div className="space-y-12">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{
                                once: true,
                            }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="
                            grid
                            grid-cols-[36px_1fr]
                            gap-x-4
                            "
                        >
                            {/* Number */}

                            <span
                                className="
                                text-[12px]
                                text-[#BDBDBD]
                                tracking-tight
                                pt-[5px]
                                "
                            >
                                {service.number}
                            </span>

                            {/* Content */}

                            <div>
                                <motion.h3
                                    whileHover={{
                                        opacity: 0.75,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                    className="
                                    text-[18px]
                                    sm:text-[20px]
                                    tracking-tight
                                    text-[#262626]
                                    mb-3
                                    "
                                >
                                    {service.title}
                                </motion.h3>

                                <p
                                    className="
                                    text-[14px]
                                    text-[#4D4D4D]
                                    leading-7
                                    tracking-tight
                                    max-w-[60ch]
                                    "
                                >
                                    {service.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
