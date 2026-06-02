import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { sections } from "../utils/sections";
import QuestionField from "./QuestionField";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    CheckIcon,
    CopyIcon,
    PrinterIcon,
    ArrowCounterClockwiseIcon,
    SpinnerIcon,
} from "@phosphor-icons/react";

// ── Formspree Configuration ──
// Replace with your Formspree Form ID (e.g. "xoqgqvzv")
const FORMSPREE_FORM_ID = "xzdwnvkp";

// Enrich the schema with key required fields
const ENRICHED_SECTIONS = sections.map((section) => {
    if (section.id === "business") {
        return {
            ...section,
            questions: section.questions.map((q) => {
                if (q.id === "clinicName" || q.id === "email") {
                    return { ...q, required: true };
                }
                return q;
            }),
        };
    }
    return section;
});

const Questionnaire = () => {
    // ── Form State (Lazy Initialization to comply with ESLint react-hooks/set-state-in-effect) ──
    const [currentStep, setCurrentStep] = useState(() => {
        try {
            const savedStep = localStorage.getItem("discovery_step");
            return savedStep ? Number(savedStep) : 0;
        } catch {
            return 0;
        }
    });

    const [answers, setAnswers] = useState(() => {
        try {
            const savedAnswers = localStorage.getItem("discovery_answers");
            return savedAnswers ? JSON.parse(savedAnswers) : {};
        } catch {
            return {};
        }
    });

    const [isCompleted, setIsCompleted] = useState(() => {
        try {
            const savedCompleted = localStorage.getItem("discovery_completed");
            return savedCompleted ? JSON.parse(savedCompleted) : false;
        } catch {
            return false;
        }
    });

    const [direction, setDirection] = useState(1); // 1 = Next, -1 = Back
    const [copied, setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    // ── Save state to localStorage ──
    const saveProgress = (newAnswers, newStep, completedState = isCompleted) => {
        try {
            localStorage.setItem("discovery_answers", JSON.stringify(newAnswers));
            localStorage.setItem("discovery_step", newStep.toString());
            localStorage.setItem("discovery_completed", JSON.stringify(completedState));
        } catch (e) {
            console.error("Could not save questionnaire state", e);
        }
    };

    const handleAnswerChange = (questionId, value) => {
        const nextAnswers = { ...answers, [questionId]: value };
        setAnswers(nextAnswers);
        saveProgress(nextAnswers, currentStep);
    };

    const currentSection = ENRICHED_SECTIONS[currentStep];

    // Check if the current section has unfilled required questions
    const isStepInvalid = () => {
        if (!currentSection) return false;
        return currentSection.questions.some((q) => {
            if (!q.required) return false;
            const val = answers[q.id];
            if (Array.isArray(val)) return val.length === 0;
            return !val || (typeof val === "string" && val.trim() === "");
        });
    };

    // Navigation triggers
    const handleNext = async () => {
        if (isStepInvalid()) return;

        if (currentStep < ENRICHED_SECTIONS.length - 1) {
            setDirection(1);
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            saveProgress(answers, nextStep);
        } else {
            // Final step submission to Formspree
            if (FORMSPREE_FORM_ID && FORMSPREE_FORM_ID !== "YOUR_FORM_ID") {
                setIsSubmitting(true);
                setSubmitError(null);
                try {
                    const payload = {
                        _subject: `New Discovery Brief: ${answers.clinicName || "Unnamed Clinic"}`,
                    };
                    ENRICHED_SECTIONS.forEach((section) => {
                        section.questions.forEach((q) => {
                            const val = answers[q.id];
                            if (val !== undefined) {
                                payload[q.label] = Array.isArray(val) ? val.join(", ") : val;
                            }
                        });
                    });

                    const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                        },
                        body: JSON.stringify(payload),
                    });

                    if (response.ok) {
                        setIsCompleted(true);
                        saveProgress(answers, currentStep, true);
                    } else {
                        throw new Error("Failed to submit to Formspree");
                    }
                } catch (e) {
                    console.error("Submission error", e);
                    setSubmitError("Could not submit brief online. Your responses are saved locally.");
                } finally {
                    setIsSubmitting(false);
                }
            } else {
                // If no Formspree ID is set, proceed to summary screen directly
                setIsCompleted(true);
                saveProgress(answers, currentStep, true);
            }
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setDirection(-1);
            const prevStep = currentStep - 1;
            setCurrentStep(prevStep);
            saveProgress(answers, prevStep);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleRestart = () => {
        if (window.confirm("Are you sure you want to restart? This will clear all your answers.")) {
            setAnswers({});
            setCurrentStep(0);
            setIsCompleted(false);
            setDirection(-1);
            setSubmitError(null);
            localStorage.removeItem("discovery_answers");
            localStorage.removeItem("discovery_step");
            localStorage.removeItem("discovery_completed");
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Clipboard Markdown Export
    const handleCopyMarkdown = () => {
        let md = `# Website Discovery — Summary\n\n`;
        md += `Generated on: ${new Date().toLocaleDateString()}\n\n`;

        ENRICHED_SECTIONS.forEach((section) => {
            md += `## ${section.number}. ${section.title}\n`;
            section.questions.forEach((q) => {
                const answer = answers[q.id];
                md += `### ${q.label}\n`;
                if (Array.isArray(answer)) {
                    md += answer.length > 0 ? answer.map(a => `- ${a}`).join("\n") : "_Not provided_";
                } else {
                    md += answer && answer.trim() ? answer : "_Not provided_";
                }
                md += `\n\n`;
            });
        });

        navigator.clipboard.writeText(md).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handlePrint = () => {
        window.print();
    };

    // Motion Slide Transition Variants
    const slideVariants = {
        enter: (dir) => ({
            x: dir > 0 ? 50 : -50,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (dir) => ({
            x: dir > 0 ? -50 : 50,
            opacity: 0,
        }),
    };

    const progressPercent = ((currentStep + 1) / ENRICHED_SECTIONS.length) * 100;

    // ── Render Submitting View ──
    if (isSubmitting) {
        return (
            <div className="w-full min-h-screen bg-bg text-text-primary font-outfit flex items-center justify-center py-24 px-5">
                <div className="text-center space-y-4">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="inline-block text-text-primary"
                    >
                        <SpinnerIcon size={32} />
                    </motion.div>
                    <p className="text-[14px] text-text-muted tracking-tight font-light">
                        Submitting your discovery brief to Formspree...
                    </p>
                </div>
            </div>
        );
    }

    // ── Render Completed Summary View ──
    if (isCompleted) {
        return (
            <div className="w-full min-h-screen bg-bg text-text-primary font-outfit select-text print-container py-24 px-5 lg:px-0">
                <div className="max-w-[600px] mx-auto">
                    {/* Header */}
                    <div className="border-b border-border pb-10 mb-12 no-print">
                        <div className="text-[12px] tracking-widest text-text-muted uppercase mb-3 font-medium">
                            Discovery Completed
                        </div>
                        <h1 className="text-[32px] tracking-tight font-normal leading-tight mb-4 text-text-primary">
                            Your Onboarding Document is Ready
                        </h1>
                        <p className="text-[14px] text-text-muted font-light leading-relaxed mb-8">
                            Thank you for taking the time to share your goals. Your brief has been submitted successfully. We have assembled a premium typographic summary of all your responses below. You can download it directly as a formatted PDF, copy a clean Markdown copy to your clipboard, or review your answers.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={handlePrint}
                                className="flex items-center gap-2 px-5 py-2.5 bg-text-primary text-bg border border-text-primary text-[13px] tracking-tight font-light rounded-full cursor-pointer hover:opacity-90 active:scale-98 transition-all duration-200"
                            >
                                <PrinterIcon size={16} />
                                Print / Save PDF
                            </button>
                            <button
                                onClick={handleCopyMarkdown}
                                className="flex items-center gap-2 px-5 py-2.5 bg-transparent text-text-primary border border-border text-[13px] tracking-tight font-light rounded-full cursor-pointer hover:border-text-primary active:scale-98 transition-all duration-200"
                            >
                                <CopyIcon size={16} />
                                {copied ? "Copied Summary!" : "Copy Markdown"}
                            </button>
                            <button
                                onClick={handleRestart}
                                className="flex items-center gap-2 px-5 py-2.5 bg-transparent text-text-muted border border-transparent text-[13px] tracking-tight font-light rounded-full cursor-pointer hover:text-text-primary active:scale-98 transition-all duration-200"
                            >
                                <ArrowCounterClockwiseIcon size={16} />
                                Reset Answers
                            </button>
                        </div>
                    </div>

                    {/* Print Header (Only visible when printing) */}
                    <div className="hidden print:block border-b border-black pb-8 mb-12">
                        <div className="text-[12px] tracking-widest uppercase mb-1">
                            Discovery Brief
                        </div>
                        <h1 className="text-[28px] tracking-tight font-normal">
                            Website Discovery Questionnaire
                        </h1>
                        <p className="text-[11px] text-[#666666] mt-2">
                            Generated on {new Date().toLocaleDateString()}
                        </p>
                    </div>

                    {/* Form Summary Listing */}
                    <div className="space-y-16">
                        {ENRICHED_SECTIONS.map((section) => {
                            // Check if section has any answers
                            const hasAnyAnswers = section.questions.some(
                                (q) => answers[q.id] !== undefined
                            );

                            return (
                                <div
                                    key={section.id}
                                    className="border-b border-border pb-12 last:border-0 last:pb-0"
                                >
                                    <div className="flex items-baseline gap-4 mb-8">
                                        <span className="text-[20px] font-light text-text-subtle tracking-tight font-outfit">
                                            {section.number}
                                        </span>
                                        <h2 className="text-[20px] font-normal tracking-tight font-outfit text-text-primary">
                                            {section.title}
                                        </h2>
                                    </div>

                                    {!hasAnyAnswers ? (
                                        <p className="text-[14px] text-text-subtle font-light italic">
                                            No questions answered in this section.
                                        </p>
                                    ) : (
                                        <div className="space-y-8 pl-9">
                                            {section.questions.map((q) => {
                                                const answer = answers[q.id];
                                                const isValEmpty =
                                                    !answer ||
                                                    (Array.isArray(answer) && answer.length === 0);

                                                return (
                                                    <div key={q.id} className="space-y-2">
                                                        <h3 className="text-[13px] font-medium text-text-muted tracking-tight select-none">
                                                            {q.label}
                                                        </h3>
                                                        {isValEmpty ? (
                                                            <p className="text-[14px] text-text-faint font-light italic select-none">
                                                                Not provided
                                                            </p>
                                                        ) : Array.isArray(answer) ? (
                                                            <div className="flex flex-wrap gap-1.5 pt-1">
                                                                {answer.map((item) => (
                                                                    <span
                                                                        key={item}
                                                                        className="px-3 py-1 bg-transparent border border-border text-[12px] text-text-primary font-light rounded-full"
                                                                    >
                                                                        {item}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <p className="text-[15px] text-text-primary font-light tracking-tight leading-relaxed whitespace-pre-wrap">
                                                                {answer}
                                                            </p>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Back to Portfolio CTA */}
                    <div className="mt-20 pt-8 border-t border-border text-center no-print">
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 text-[14px] text-text-muted tracking-tight font-light hover:text-text-primary transition-colors duration-200"
                        >
                            <ArrowLeftIcon size={14} />
                            Return to Portfolio Homepage
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    // ── Render Form Steps ──
    return (
        <div className="w-full min-h-screen bg-bg text-text-primary font-outfit py-24 px-5 lg:px-0">
            <div className="max-w-[600px] mx-auto flex flex-col justify-between min-h-[70vh]">
                <div>
                    {/* Header bar: Title and Step indicator */}
                    <div className="flex items-center justify-between border-b border-border pb-4 mb-8 select-none">
                        <h1 className="text-[12px] tracking-widest text-text-muted uppercase font-medium">
                            Website Discovery
                        </h1>
                        <div className="text-[13px] tracking-widest text-text-subtle font-light">
                            {currentSection.number} &nbsp;/&nbsp; {ENRICHED_SECTIONS[0].number === "01" ? "09" : ENRICHED_SECTIONS.length.toString().padStart(2, "0")}
                        </div>
                    </div>

                    {/* Ultra-thin elegant progress timeline */}
                    <div className="w-full h-[1px] bg-border mb-12 relative select-none">
                        <div
                            className="h-[1.5px] bg-text-primary absolute top-[-0.25px] left-0 transition-all duration-500 ease-out"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>

                    {/* AnimatePresence dynamic step content */}
                    <div className="relative overflow-hidden min-h-[380px] py-1">
                        <AnimatePresence mode="wait" custom={direction} initial={false}>
                            <motion.div
                                key={currentStep}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 350, damping: 35 },
                                    opacity: { duration: 0.25 },
                                }}
                                className="w-full"
                            >
                                {/* Step Introduction */}
                                <div className="mb-8 select-none">
                                    <div className="text-[48px] font-light text-border leading-none mb-1 tracking-tight">
                                        {currentSection.number}
                                    </div>
                                    <h2 className="text-[22px] font-normal tracking-tight leading-tight text-text-primary mb-2">
                                        {currentSection.title}
                                    </h2>
                                    <p className="text-[14px] text-text-muted font-light leading-relaxed">
                                        {currentSection.description}
                                    </p>
                                </div>

                                {/* Step Fields */}
                                <div className="space-y-6">
                                    {currentSection.questions.map((q, idx) => (
                                        <QuestionField
                                            key={q.id}
                                            question={q}
                                            value={answers[q.id]}
                                            onChange={(val) => handleAnswerChange(q.id, val)}
                                            isFirst={idx === 0}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Submit Error Message */}
                {submitError && (
                    <div className="mt-4 px-4 py-2 border border-border text-[13px] text-[#E11D48] bg-bg-card rounded-md font-light text-center select-none">
                        {submitError}
                        <button
                            onClick={() => {
                                setIsCompleted(true);
                                saveProgress(answers, currentStep, true);
                            }}
                            className="ml-2 underline font-normal text-text-primary cursor-pointer"
                        >
                            Skip to Summary
                        </button>
                    </div>
                )}

                {/* Footer Controls: Back & Next */}
                <div className="flex items-center justify-between border-t border-border pt-8 mt-12 select-none">
                    <button
                        type="button"
                        onClick={handleBack}
                        disabled={currentStep === 0}
                        className={`
                            flex items-center gap-2 px-5 py-2.5 text-[13px] tracking-tight font-light rounded-full cursor-pointer
                            transition-all duration-200 border border-transparent
                            ${
                                currentStep === 0
                                    ? "opacity-0 pointer-events-none"
                                    : "text-text-muted hover:text-text-primary"
                            }
                        `}
                    >
                        <ArrowLeftIcon size={14} />
                        Back
                    </button>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={handleRestart}
                            className="text-[13px] tracking-tight font-light text-text-subtle hover:text-text-primary transition-colors duration-200 px-3 py-2 cursor-pointer"
                        >
                            Reset
                        </button>

                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={isStepInvalid()}
                            className={`
                                flex items-center gap-2 px-6 py-2.5 text-[13px] tracking-tight font-light rounded-full cursor-pointer
                                border transition-all duration-300 select-none
                                ${
                                    isStepInvalid()
                                        ? "bg-transparent text-text-subtle border-border cursor-not-allowed"
                                        : "bg-text-primary text-bg border-text-primary hover:opacity-90 active:scale-98"
                                }
                            `}
                        >
                            {currentStep === ENRICHED_SECTIONS.length - 1 ? (
                                <>
                                    Complete
                                    <CheckIcon size={14} weight="bold" />
                                </>
                            ) : (
                                <>
                                    Next
                                    <ArrowRightIcon size={14} />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Questionnaire;
