import type { ReactNode } from "react";

import { Container } from "./Container";

type HeroSectionProps = {
  title: ReactNode;
  subtitle: ReactNode;
  children?: ReactNode;
};

export function HeroSection({ title, subtitle, children }: HeroSectionProps) {
  return (
    <section className="py-10 sm:py-14">
      <Container>
        <div className="rounded-3xl border border-black/[.08] bg-white/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur-sm dark:border-white/[.12] dark:bg-white/5 sm:p-12">
          <div className="max-w-3xl">
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-pretty text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:text-lg">
              {subtitle}
            </p>
            {children && <div className="mt-8">{children}</div>}
          </div>
        </div>
      </Container>
    </section>
  );
}
