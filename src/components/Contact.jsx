import { motion } from "motion/react";
import {
    ArrowUpRightIcon,
    EnvelopeSimpleIcon,
    CalendarBlankIcon,
} from "@phosphor-icons/react";

const Contact = () => {
    return (
        <section className="w-full">
            <div className="max-w-150 mx-auto py-12 px-5 lg:px-0">

                {/* Heading */}

                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3 mb-8"
                >
                    <div className="h-5 w-px bg-[#D9D9D9]" />

                    <h2 className="text-2xl tracking-tighter text-[#262626]">
                        Let's Work Together
                    </h2>
                </motion.div>

                <motion.div
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
                    }}
                    className="max-w-[700px]"
                >
                    <h3
                        className="
                        text-[20px]
                        tracking-tight
                        text-[#262626]
                        font-normal
                        mb-3
                        "
                    >
                        Have a project in mind?
                    </h3>

                    <p
                        className="
                        text-[14px]
                        text-[#4D4D4D]
                        leading-7
                        tracking-tight
                        font-light
                        max-w-[60ch]
                        mb-12
                        "
                    >
                        Whether it's a website, redesign, or something
                        in between, I'd love to hear about it. Tell me
                        what you're building and let's see if we're a
                        good fit.
                    </p>

                    {/* Contact Links */}

                    <div className="space-y-8">

                        <motion.a
                            whileHover={{
                                x: 2,
                            }}
                            transition={{
                                duration: 0.2,
                            }}
                            href="mailto:ganeshdandu.co@gmail.com"
                            className="
                            flex
                            items-start
                            justify-between
                            border-b
                            border-[#ECECEC]
                            pb-4
                            group
                            "
                        >
                            <div>
                                <p
                                    className="
                                    text-[13px]
                                    text-[#999999]
                                    tracking-tight
                                    font-light
                                    mb-1
                                    "
                                >
                                    Email
                                </p>

                                <p
                                    className="
                                    text-[18px]
                                    text-[#262626]
                                    tracking-tight
                                    font-normal
                                    "
                                >
                                    ganeshdandu.co@gmail.com
                                </p>
                            </div>

                            <ArrowUpRightIcon
                                size={16}
                                className="
                                text-[#666666]
                                transition-transform
                                duration-300
                                group-hover:translate-x-0.5
                                group-hover:-translate-y-0.5
                                "
                            />
                        </motion.a>

                        <motion.a
                            whileHover={{
                                x: 2,
                            }}
                            transition={{
                                duration: 0.2,
                            }}
                            href="https://cal.com/ganesh-dandu-znj6u9/book?overlayCalendar=true"
                            target="_blank"
                            className="
                            flex
                            items-start
                            justify-between
                            border-b
                            border-[#ECECEC]
                            pb-4
                            group
                            "
                        >
                            <div>
                                <p
                                    className="
                                    text-[13px]
                                    text-[#999999]
                                    tracking-tight
                                    font-light
                                    mb-1
                                    "
                                >
                                    Book a Call
                                </p>

                                <p
                                    className="
                                    text-[18px]
                                    text-[#262626]
                                    tracking-tight
                                    font-normal
                                    "
                                >
                                    30 Minute Consultation
                                </p>
                            </div>

                            <ArrowUpRightIcon
                                size={16}
                                className="
                                text-[#666666]
                                transition-transform
                                duration-300
                                group-hover:translate-x-0.5
                                group-hover:-translate-y-0.5
                                "
                            />
                        </motion.a>

                    </div>

                    <p
                        className="
                        mt-12
                        text-[13px]
                        text-[#999999]
                        tracking-tight
                        font-light
                        "
                    >
                        Usually responds within 24 hours.
                    </p>

                </motion.div>

            </div>
        </section>
    );
};

export default Contact;