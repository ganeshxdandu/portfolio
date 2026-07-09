import { motion } from "motion/react";

const About = () => {
    return (
        <section id="about" className="w-full scroll-mt-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-150 mx-auto py-12 px-5 lg:px-0"
            >
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="flex items-center gap-3 mb-6"
                >
                    <div
                        className="h-5 w-px"
                        style={{ backgroundColor: "var(--color-border-md)" }}
                    />
                    <h2
                        className="text-2xl tracking-tighter"
                        style={{ color: "var(--color-text-primary)" }}
                    >
                        For Context
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="space-y-6"
                >
                    <p
                        className="text-[14px] leading-7 tracking-tight max-w-[65ch]"
                        style={{ color: "var(--color-text-secondary)" }}
                    >
                        I enrolled in AI &amp; ML and actually liked it —
                        systems, logic, building things that work.
                        But somewhere along the way I got obsessed
                        with how things look and feel, not just how
                        they function. So I learned design. Now I do
                        both — and that's the part most developers
                        can't say.
                    </p>

                    <p
                        className="text-[14px] leading-7 tracking-tight max-w-[65ch]"
                        style={{ color: "var(--color-text-secondary)" }}
                    >
                        I don't just build websites and disappear. I
                        take your brief, design it from scratch,
                        obsess over the details, and hand you
                        something that actually represents your
                        business. Every pixel, interaction, and line
                        of code has someone accountable for it —
                        unfortunately for me, that's usually me.
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default About;