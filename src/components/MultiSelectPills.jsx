import { motion } from "motion/react";

/**
 * MultiSelectPills
 *
 * Renders a premium list of selectable pills in a typographic grid.
 *
 * Props:
 *  - options: string[]
 *  - selected: string[]
 *  - onChange: (value: string[]) => void
 */
const MultiSelectPills = ({ options = [], selected = [], onChange }) => {
    const handleToggle = (option) => {
        const nextSelected = selected.includes(option)
            ? selected.filter((item) => item !== option)
            : [...selected, option];
        onChange(nextSelected);
    };

    return (
        <div className="flex flex-wrap gap-2.5 py-2">
            {options.map((option) => {
                const isSelected = selected.includes(option);

                return (
                    <motion.button
                        key={option}
                        type="button"
                        onClick={() => handleToggle(option)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                        }}
                        className={`
                            px-5 py-2.5 text-[14px] tracking-tight font-light rounded-full border cursor-pointer select-none
                            transition-all duration-300 ease-out outline-hidden focus-visible:ring-1 focus-visible:ring-[#262626]
                            ${
                                isSelected
                                    ? "bg-[#262626] text-[#F7F7F7] border-[#262626]"
                                    : "bg-transparent text-[#666666] border-[#ECECEC] hover:border-[#262626] hover:text-[#262626]"
                            }
                        `}
                    >
                        {option}
                    </motion.button>
                );
            })}
        </div>
    );
};

export default MultiSelectPills;
