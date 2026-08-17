import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone } from "lucide-react";
import { site, whatsappLink } from "@/data/site";

export function StickyActions() {
  return (
    <>
      {/* Desktop floating WhatsApp */}
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-40 hidden h-14 items-center gap-3 bg-whatsapp px-5 text-sm font-semibold text-whatsapp-foreground shadow-lg transition-opacity hover:opacity-90 lg:inline-flex"
      >
        <MessageCircle className="h-5 w-5" />
        WhatsApp
      </a>

      {/* Mobile action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-hairline bg-background lg:hidden">
        <a
          href={site.phoneHref}
          className="flex h-14 items-center justify-center gap-2 text-sm font-semibold text-navy"
        >
          <Phone className="h-4 w-4" />
          Call
        </a>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
          className="flex h-14 items-center justify-center gap-2 bg-whatsapp text-sm font-semibold text-whatsapp-foreground"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
        <Link
          to="/quote"
          className="flex h-14 items-center justify-center bg-navy text-sm font-semibold text-navy-foreground"
        >
          Get a Quote
        </Link>
      </div>
      <div className="h-14 lg:hidden" aria-hidden />
    </>
  );
}
