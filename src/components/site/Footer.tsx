import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Facebook } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import { photo } from "@/data/photos";
import { services } from "@/data/services";

export function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <img src={photo["logomark"]} alt="" className="h-12 w-12 object-contain" />
            <p className="mt-4 font-display text-lg font-bold uppercase leading-tight">
              Dampies &amp; Sons
              <span className="block text-gold">Pro Projects</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-foreground/70">
              Renovations, building, tiling, painting and carpentry delivered by a hands-on team that
              finishes what it starts.
            </p>
          </div>

          <div>
            <h3 className="eyebrow text-gold">Services</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/75">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to="/services" hash={s.slug} className="transition-colors hover:text-gold">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-gold">Company</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/75">
              <li>
                <Link to="/work" className="transition-colors hover:text-gold">
                  Our Work
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-gold">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-gold">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/quote" className="transition-colors hover:text-gold">
                  Request a Quote
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-gold">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm text-navy-foreground/80">
              <li>
                <a href={site.phoneHref} className="inline-flex items-center gap-2.5 hover:text-gold">
                  <Phone className="h-4 w-4 shrink-0 text-gold" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className="inline-flex items-center gap-2.5 break-all hover:text-gold">
                  <Mail className="h-4 w-4 shrink-0 text-gold" />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{site.address}</span>
              </li>
              <li>
                <a
                  href={site.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-gold"
                >
                  <Facebook className="h-4 w-4 shrink-0 text-gold" />
                  Facebook — {site.facebookFollowers} followers
                </a>
              </li>
            </ul>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex h-11 items-center bg-whatsapp px-5 text-sm font-semibold text-whatsapp-foreground transition-opacity hover:opacity-90"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-navy-foreground/15 pt-6 text-xs text-navy-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{site.registration}</p>
        </div>
      </div>
    </footer>
  );
}
