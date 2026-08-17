import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin, Phone, MessageCircle, Facebook } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import { Container, SiteLayout } from "@/components/site/Layout";
import { Photo } from "@/components/site/Photo";

const title = "Contact Dampies & Sons Pro Projects | Call, WhatsApp or Email";
const description =
  "Get in touch with Dampies & Sons Pro Projects. Call +27 62 592 7737, message us on WhatsApp or email deetinstall21@gmail.com for a free project quote.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteLayout>
      <section className="border-b border-hairline bg-paper py-16 lg:py-24">
        <Container>
          <p className="eyebrow text-gold">Contact</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] text-navy sm:text-5xl">
            Talk to us about your project.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-charcoal/75">
            WhatsApp is usually fastest. Send photos of the space and a short description and we&apos;ll
            come back to you.
          </p>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <ul className="divide-y divide-hairline border-y border-hairline">
                <li>
                  <a href={site.phoneHref} className="flex items-center gap-4 py-5 hover:text-gold">
                    <Phone className="h-5 w-5 shrink-0 text-gold" />
                    <span>
                      <span className="eyebrow block text-charcoal/55">Phone</span>
                      <span className="text-lg font-semibold text-navy">{site.phone}</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 py-5 hover:text-gold"
                  >
                    <MessageCircle className="h-5 w-5 shrink-0 text-gold" />
                    <span>
                      <span className="eyebrow block text-charcoal/55">WhatsApp</span>
                      <span className="text-lg font-semibold text-navy">Start a chat</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href={site.emailHref} className="flex items-center gap-4 py-5 hover:text-gold">
                    <Mail className="h-5 w-5 shrink-0 text-gold" />
                    <span>
                      <span className="eyebrow block text-charcoal/55">Email</span>
                      <span className="break-all text-lg font-semibold text-navy">{site.email}</span>
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-4 py-5">
                  <MapPin className="h-5 w-5 shrink-0 text-gold" />
                  <span>
                    <span className="eyebrow block text-charcoal/55">Based at</span>
                    <span className="text-lg font-semibold text-navy">{site.address}</span>
                  </span>
                </li>
                <li>
                  <a
                    href={site.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 py-5 hover:text-gold"
                  >
                    <Facebook className="h-5 w-5 shrink-0 text-gold" />
                    <span>
                      <span className="eyebrow block text-charcoal/55">Facebook</span>
                      <span className="text-lg font-semibold text-navy">
                        {site.facebookFollowers} followers
                      </span>
                    </span>
                  </a>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/quote"
                  className="inline-flex h-13 items-center gap-2 bg-navy px-7 text-sm font-semibold text-navy-foreground transition-colors hover:bg-charcoal"
                >
                  Request a Free Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-13 items-center gap-2 bg-whatsapp px-7 text-sm font-semibold text-whatsapp-foreground transition-opacity hover:opacity-90"
                >
                  WhatsApp us
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Photo src="bath-tub-1" alt="Completed bathroom with freestanding bath" ratio="3/4" />
              <Photo src="kitchen-island-1" alt="Completed kitchen with island" ratio="3/4" />
              <Photo src="paving-after-1" alt="Completed paved driveway" ratio="4/3" className="col-span-2" />
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
