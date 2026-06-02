import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import MultiSelectPills from "./MultiSelectPills";
import { CheckIcon } from "@phosphor-icons/react";

/**
 * QuestionField
 *
 * Renders individual input fields dynamically based on their type,
 * with premium, minimal editorial styling.
 *
 * Props:
 *  - question: { id, label, type, options, required }
 *  - value: any
 *  - onChange: (val: any) => void
 *  - isFirst: boolean
 */
const QuestionField = ({ question, value, onChange, isFirst = false }) => {
    const inputRef = useRef(null);

    // Auto-focus the first element in each section
    useEffect(() => {
        if (isFirst && inputRef.current) {
            // Add a slight delay to allow step animations to start so focus doesn't disrupt scroll
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isFirst]);

    // Handle Textarea Auto-Resizing
    const handleTextareaInput = (e) => {
        const target = e.target;
        target.style.height = "auto";
        target.style.height = `${target.scrollHeight}px`;
    };

    // Auto-resize on initial mount for textareas with existing content
    useEffect(() => {
        if (question.type === "textarea" && inputRef.current && value) {
            inputRef.current.style.height = "auto";
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    }, [question.type, value]);

    const handleCheckboxToggle = (option) => {
        const currentList = Array.isArray(value) ? value : [];
        const nextList = currentList.includes(option)
            ? currentList.filter((item) => item !== option)
            : [...currentList, option];
        onChange(nextList);
    };

    const renderInput = () => {
        switch (question.type) {
            case "text":
            case "email":
                return (
                    <input
                        ref={inputRef}
                        type={question.type}
                        id={question.id}
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={`Enter your ${question.label.toLowerCase()}...`}
                        className="w-full bg-transparent border-b border-[#ECECEC] py-3 text-[16px] text-[#262626] font-light tracking-tight outline-hidden transition-colors duration-300 focus:border-[#262626]"
                    />
                );

            case "textarea":
                return (
                    <textarea
                        ref={inputRef}
                        id={question.id}
                        value={value || ""}
                        onChange={(e) => onChange(e.target.value)}
                        onInput={handleTextareaInput}
                        placeholder="Write your answer here..."
                        rows={2}
                        className="w-full bg-transparent border-b border-[#ECECEC] py-3 text-[16px] text-[#262626] font-light tracking-tight leading-relaxed outline-hidden resize-none transition-colors duration-300 focus:border-[#262626]"
                    />
                );

            case "checkbox-group":
                return (
                    <div className="space-y-3.5 py-1">
                        {(question.options || []).map((option, index) => {
                            const isChecked = Array.isArray(value) && value.includes(option);
                            // Attach ref to the first item for auto-focusing keyboard navigation
                            const isFirstCheckbox = index === 0;

                            return (
                                <label
                                    key={option}
                                    className="flex items-center gap-3.5 group cursor-pointer select-none"
                                >
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            ref={isFirstCheckbox ? inputRef : null}
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => handleCheckboxToggle(option)}
                                            className="sr-only"
                                        />
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`
                                                w-5 h-5 rounded-[3px] border flex items-center justify-center transition-all duration-200
                                                group-hover:border-[#262626]
                                                ${
                                                    isChecked
                                                        ? "bg-[#262626] border-[#262626] text-white"
                                                        : "bg-transparent border-[#ECECEC]"
                                                }
                                            `}
                                        >
                                            {isChecked && (
                                                <motion.span
                                                    initial={{ scale: 0.6, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    transition={{ duration: 0.15 }}
                                                >
                                                    <CheckIcon size={12} weight="bold" />
                                                </motion.span>
                                            )}
                                        </motion.div>
                                    </div>
                                    <span className="text-[14px] text-[#4D4D4D] font-light tracking-tight group-hover:text-[#262626] transition-colors duration-200">
                                        {option}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                );

            case "multi-select-pills":
                return (
                    <div ref={isFirst ? inputRef : null} tabIndex={-1} className="outline-hidden">
                        <MultiSelectPills
                            options={question.options}
                            selected={value || []}
                            onChange={onChange}
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col gap-2 py-4">
            <label
                htmlFor={question.id}
                className="text-[14px] tracking-tight font-medium text-[#262626] select-none flex items-center gap-1"
            >
                {question.label}
                {question.required && (
                    <span className="text-[#999999] text-[12px] font-normal tracking-wide ml-1">(Required)</span>
                )}
            </label>
            {renderInput()}
        </div>
    );
};

export default QuestionField;
