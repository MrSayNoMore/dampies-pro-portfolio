import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import { photo } from "@/data/photos";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/work", label: "Our Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-10">
        <Link to="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
          <img
            src={photo["logomark"]}
            alt=""
            className="h-10 w-10 object-contain lg:h-11 lg:w-11"
          />
          <span className="leading-none">
            <span className="block font-display text-[15px] font-bold uppercase tracking-tight text-navy lg:text-base">
              Dampies &amp; Sons
            </span>
            <span className="eyebrow block text-warmgrey">Pro Projects</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="relative py-1 text-sm font-medium text-charcoal transition-colors hover:text-navy data-[status=active]:text-navy"
              activeProps={{ className: "after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:bg-gold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-gold"
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
          <Link
            to="/quote"
            className="inline-flex h-11 items-center bg-navy px-5 text-sm font-semibold text-navy-foreground transition-colors hover:bg-charcoal"
          >
            Request a Quote
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center border border-hairline text-navy lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-hairline bg-background lg:hidden",
          open ? "max-h-[520px]" : "max-h-0 border-t-0",
        )}
        style={{ transition: "max-height 300ms cubic-bezier(0.16,1,0.3,1)" }}
      >
        <nav className="px-4 py-3 sm:px-6" aria-label="Mobile">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="block border-b border-hairline py-3.5 font-display text-lg font-semibold text-navy last:border-b-0"
            >
              {item.label}
            </Link>
          ))}
          <div className="grid gap-2 py-4">
            <Link
              to="/quote"
              className="inline-flex h-12 items-center justify-center bg-navy text-sm font-semibold text-navy-foreground"
            >
              Request a Quote
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center border border-navy text-sm font-semibold text-navy"
            >
              WhatsApp us
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
