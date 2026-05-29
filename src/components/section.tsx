import { type ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  wide?: boolean;
}

export function Section({ id, children, className = "", wide = false }: SectionProps) {
  return (
    <section
      id={id}
      className={`
        px-6 md:px-8
        py-24 md:py-36
        mx-auto
        ${wide ? "max-w-[56rem]" : "max-w-[42.5rem]"}
        ${className}
      `}
    >
      {children}
    </section>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="section-label">{children}</p>;
}
