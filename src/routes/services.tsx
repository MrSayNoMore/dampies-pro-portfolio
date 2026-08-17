import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/data/services";
import { Container, SectionHead, SiteLayout } from "@/components/site/Layout";
import { Photo } from "@/components/site/Photo";
import { Reveal } from "@/components/site/Reveal";
import { whatsappLink } from "@/data/site";

const title = "Services — Renovations, Building, Tiling & Painting | Dampies & Sons";
const description =
  "Renovations, building, painting, tiling, carpentry and electrical/COC work handled in-house by Dampies & Sons Pro Projects.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/services" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="border-b border-hairline bg-paper py-16 lg:py-24">
        <Container>
          <p className="eyebrow text-gold">Services</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] text-navy sm:text-5xl">
            Everything your project needs, under one team.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-charcoal/75">
            We take on full projects and single trades. Whichever it is, the same team is
            accountable for the scope, the site and the finish.
          </p>
        </Container>
      </section>

      <div className="divide-y divide-hairline">
        {services.map((s, i) => (
          <section key={s.slug} id={s.slug} className="scroll-mt-24 py-16 lg:py-24">
            <Container>
              <div
                className={`grid items-start gap-10 lg:grid-cols-2 lg:gap-16 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal>
                  <p className="eyebrow text-gold">0{i + 1}</p>
                  <h2 className="mt-3 text-3xl text-navy sm:text-4xl">{s.name}</h2>
                  <p className="mt-5 text-base leading-relaxed text-charcoal/80">{s.description}</p>
                  <ul className="mt-7 space-y-3">
                    {s.examples.map((e) => (
                      <li key={e} className="flex gap-3 text-sm text-charcoal/80">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        {e}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      to="/quote"
                      search={{ service: s.name }}
                      className="inline-flex h-12 items-center gap-2 bg-navy px-6 text-sm font-semibold text-navy-foreground transition-colors hover:bg-charcoal"
                    >
                      Get a quote for {s.name.split(" ")[0]}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a
                      href={whatsappLink(`Hi Dampies & Sons, I'd like to enquire about ${s.name}.`)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-12 items-center px-6 text-sm font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
                    >
                      Ask on WhatsApp
                    </a>
                  </div>
                </Reveal>

                <Reveal delay={90}>
                  <div className="grid grid-cols-2 gap-3">
                    <Photo src={s.cover} alt={`${s.name} example`} ratio="3/4" className="col-span-2" />
                    {s.gallery.slice(0, 4).map((g) => (
                      <Photo key={g} src={g} alt={`${s.name} project detail`} ratio="1/1" />
                    ))}
                  </div>
                </Reveal>
              </div>
            </Container>
          </section>
        ))}
      </div>

      <section className="bg-navy py-16 lg:py-20">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <SectionHead
              title="Not sure which trade you need?"
              intro="Describe the problem and we'll tell you what the job actually involves."
              tone="dark"
            />
            <Link
              to="/quote"
              className="inline-flex h-13 items-center gap-2 bg-gold px-7 text-sm font-semibold text-gold-foreground transition-colors hover:bg-navy-foreground"
            >
              Request a Free Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
