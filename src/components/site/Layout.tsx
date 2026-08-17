import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyActions } from "./StickyActions";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyActions />
    </div>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className={`eyebrow ${tone === "dark" ? "text-gold" : "text-gold"}`}>{eyebrow}</p>
      ) : null}
      <h2
        className={`mt-3 text-3xl leading-[1.1] sm:text-4xl lg:text-[2.75rem] ${
          tone === "dark" ? "text-navy-foreground" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-4 text-base leading-relaxed ${
            tone === "dark" ? "text-navy-foreground/70" : "text-charcoal/75"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
