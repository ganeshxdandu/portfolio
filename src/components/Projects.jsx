import { motion } from "motion/react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";

import Project1 from "../assets/project-1.png";
import Project2 from "../assets/project-2.png";
import Project3 from "../assets/project-3.png";
import Project4 from "../assets/project-4.png";

const projects = [
    {
        name: "Mercedes Esthetica",
        description: "Premium Skincare Clinic · Hyderabad",
        image: Project1,
        link: "https://mercedes-esthetica.vercel.app/",
    },
    {
        name: "Skinthority",
        description: "Aesthetic Academy · Ludhiana",
        image: Project2,
        link: "https://skinthority.vercel.app/",
    },
    {
        name: "Innovative Cure",
        description: "Premium Skincare Clinic · Kolkata",
        image: Project3,
        link: "https://innovative-cure.vercel.app/",
    },
    {
        name: "3Sixty Studio",
        description: "Ladies Salon & Aesthetics · Kolkata",
        image: Project4,
        link: "https://3sixty.vercel.app/",
    },
];

const Projects = () => {
    return (
        <section id="projects" className="w-full scroll-mt-24">
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
                    className="flex items-center gap-3 mb-2"
                >
                    <div className="h-5 w-px bg-[#D9D9D9]" />

                    <h2 className="text-2xl tracking-tighter text-[#262626]">
                        Selected Work
                    </h2>
                </motion.div>

                {/* Projects */}

                <div>
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.name}
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
                                delay: index * 0.08,
                            }}
                            className="
                            py-10
                            border-b
                            border-[#ECECEC]
                            "
                        >
                            <div
                                className={`
                                flex
                                flex-col
                                lg:flex-row
                                gap-8
                                lg:gap-10
                                ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}
                                `}
                            >
                                {/* Image */}

                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="
                                    block
                                    w-full
                                    lg:w-[65%]
                                    overflow-hidden
                                    rounded-md
                                    "
                                >
                                    <motion.img
                                        src={project.image}
                                        alt={project.name}
                                        whileHover={{
                                            scale: 1.02,
                                        }}
                                        transition={{
                                            duration: 0.4,
                                        }}
                                        className="
                                        w-full
                                        h-auto
                                        object-cover
                                        "
                                    />
                                </a>

                                {/* Content */}

                                {/* Content */}

                                <div className="w-full lg:w-[35%] flex flex-col justify-between self-stretch py-2">
                                    <div>
                                        <h3 className="text-[18px] sm:text-[20px] text-[#262626] tracking-tight font-normal leading-none mb-1.5 ">
                                            {project.name}
                                        </h3>

                                        <p className="text-[13px] text-[#666666] tracking-tight leading-5 font-light ">
                                            {project.description}
                                        </p>
                                    </div>

                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-1 w-max text-[14px] text-[#262626] tracking-tight font-light mt-8 lg:mt-0 "
                                    >
                                        Live Link
                                        <motion.div
                                            whileHover={{
                                                x: 2,
                                                y: -2,
                                            }}
                                            transition={{
                                                duration: 0.2,
                                            }}
                                        >
                                            <ArrowUpRightIcon size={14} />
                                        </motion.div>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
