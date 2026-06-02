import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sections } from "../utils/sections";

const Form = () => {
    const [step, setStep] = useState(0);

    const currentSection = sections[step];

    return (
        <section className="min-h-screen bg-[#F7F7F7]">
            <div className="max-w-[650px] mx-auto px-5 py-16">

                {/* Header */}

                <div className="mb-12">
                    <h1
                        className="
                        text-4xl
                        tracking-tighter
                        text-[#262626]
                        mb-4
                        "
                    >
                        Website Discovery
                    </h1>

                    <p
                        className="
                        text-[14px]
                        text-[#666]
                        leading-7
                        "
                    >
                        Before we begin, I'd like to understand
                        your clinic, your patients, and your goals.
                    </p>
                </div>

                {/* Progress */}

                <div className="mb-12">

                    <div className="flex justify-between mb-3">
                        <span className="text-[13px] text-[#666]">
                            Step {step + 1}
                        </span>

                        <span className="text-[13px] text-[#666]">
                            {sections.length}
                        </span>
                    </div>

                    <div className="h-px bg-[#ECECEC]">
                        <motion.div
                            className="h-full bg-[#262626]"
                            animate={{
                                width: `${
                                    ((step + 1) /
                                        sections.length) *
                                    100
                                }%`,
                            }}
                        />
                    </div>
                </div>

                {/* Section */}

                <AnimatePresence mode="wait">

                    <motion.div
                        key={step}
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: -20,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-5 w-px bg-[#D9D9D9]" />

                            <h2
                                className="
                                text-2xl
                                tracking-tight
                                "
                            >
                                {currentSection.number}
                                {" "}
                                {currentSection.title}
                            </h2>
                        </div>

                        <p
                            className="
                            text-[14px]
                            text-[#666]
                            mb-10
                            "
                        >
                            {currentSection.description}
                        </p>

                        {/* Fields Here */}

                    </motion.div>

                </AnimatePresence>

                {/* Navigation */}

                <div className="flex justify-between mt-12">

                    <button
                        onClick={() =>
                            setStep((s) =>
                                Math.max(0, s - 1)
                            )
                        }
                        disabled={step === 0}
                    >
                        Previous
                    </button>

                    <button
                        onClick={() =>
                            setStep((s) =>
                                Math.min(
                                    sections.length - 1,
                                    s + 1
                                )
                            )
                        }
                    >
                        {step === sections.length - 1
                            ? "Submit"
                            : "Next"}
                    </button>

                </div>

            </div>
        </section>
    );
};

export default Form;