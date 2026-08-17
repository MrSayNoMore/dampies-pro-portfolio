import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Phone, ShieldCheck, Hammer, Clock, Users } from "lucide-react";
import { site, whatsappLink } from "@/data/site";
import { photo } from "@/data/photos";
import { services } from "@/data/services";
import { featuredProjects } from "@/data/projects";
import { Container, SectionHead, SiteLayout } from "@/components/site/Layout";
import { Photo } from "@/components/site/Photo";
import { Reveal } from "@/components/site/Reveal";
import { BeforeAfter } from "@/components/site/BeforeAfter";

const title = "Dampies & Sons Pro Projects | Renovations & Building in South Africa";
const description =
  "Renovations, building, tiling, painting, carpentry and electrical work delivered by a hands-on family team. See real project photos and request a free quote.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "GeneralContractor",
          name: site.name,
          telephone: site.phone,
          email: site.email,
          address: { "@type": "PostalAddress", streetAddress: site.address, addressCountry: "ZA" },
          sameAs: [site.facebookUrl],
          areaServed: "South Africa",
          makesOffer: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name } })),
        }),
      },
    ],
  }),
  component: Home,
});

const trust = [
  { icon: Users, label: "Family-run team", copy: "A hands-on team led by the family whose name is on the board." },
  { icon: Hammer, label: "Full-service builds", copy: "Renovations, building, tiling, painting, carpentry and electrical." },
  { icon: ShieldCheck, label: "Quality workmanship", copy: "Detail-driven finishing you can inspect in every photo on this site." },
  { icon: Clock, label: "Reliable timelines", copy: "Clear scope, honest updates and a team that finishes what it starts." },
];

const process = [
  { step: "01", title: "Enquiry", copy: "Send us your project details on WhatsApp, by phone or through the quote form." },
  { step: "02", title: "Site visit", copy: "We look at the space, take measurements and understand exactly what you want." },
  { step: "03", title: "Quotation", copy: "You receive a written quote with scope, materials and what is included." },
  { step: "04", title: "Execution", copy: "The team gets to work, keeps the site tidy and keeps you updated as we go." },
  { step: "05", title: "Final walk-through", copy: "We walk the finished project with you and snag anything before signing off." },
];

const pavingProject = featuredProjects.find((p) => p.comparison);

function Home() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative">
        <div className="relative min-h-[560px] overflow-hidden lg:min-h-[680px]">
          <img
            src={photo["kitchen-island-2"]}
            alt="Completed modern kitchen with a dark island and pendant lighting"
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="scrim absolute inset-0" />
          <Container className="relative flex min-h-[560px] flex-col justify-center py-20 lg:min-h-[680px]">
            <p className="eyebrow text-gold">{site.tagline}</p>
            <h1 className="mt-5 max-w-3xl text-4xl leading-[1.05] text-navy-foreground sm:text-5xl lg:text-6xl">
              Renovations and builds finished to a standard you can point at.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-foreground/85">
              Dampies &amp; Sons Pro Projects is a family-run team delivering kitchens, bathrooms,
              extensions, tiling, painting and carpentry — start to finish.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/quote"
                className="inline-flex h-13 items-center gap-2 bg-gold px-7 text-sm font-semibold text-gold-foreground transition-colors hover:bg-navy-foreground"
              >
                Request a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-13 items-center gap-2 border border-navy-foreground/50 px-7 text-sm font-semibold text-navy-foreground transition-colors hover:bg-navy-foreground/10"
              >
                WhatsApp us
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-navy-foreground/75">
              <a href={site.phoneHref} className="inline-flex items-center gap-2 font-semibold hover:text-gold">
                <Phone className="h-4 w-4 text-gold" />
                {site.phone}
              </a>
              <span>{site.facebookFollowers} followers on Facebook</span>
              <span>Registered in South Africa</span>
            </div>
          </Container>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-b border-hairline bg-paper py-14 lg:py-16">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map((t, i) => (
              <Reveal key={t.label} delay={i * 70}>
                <t.icon className="h-6 w-6 text-gold" strokeWidth={1.75} />
                <h3 className="mt-4 text-base font-bold text-navy">{t.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{t.copy}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* SERVICES */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="What we do"
              title="Six trades, one accountable team"
              intro="From structural building work to the last coat of paint, every stage is handled in-house so nothing falls between contractors."
            />
          </Reveal>
          <div className="mt-12 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 60}>
                <Link
                  to="/services"
                  hash={s.slug}
                  className="group flex h-full flex-col bg-background transition-colors hover:bg-paper"
                >
                  <Photo src={s.cover} alt={s.name} ratio="4/3" />
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl text-navy">{s.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/70">{s.short}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors group-hover:text-gold">
                      View service
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FEATURED WORK */}
      <section className="bg-navy py-20 lg:py-28">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHead
                eyebrow="Selected projects"
                title="Work that speaks for itself"
                intro="Real jobs, photographed on site — before, during and after."
                tone="dark"
              />
              <Link
                to="/work"
                className="inline-flex h-12 items-center gap-2 border border-navy-foreground/40 px-6 text-sm font-semibold text-navy-foreground transition-colors hover:bg-navy-foreground/10"
              >
                See all work
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {featuredProjects.slice(0, 4).map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link
                  to="/work/$slug"
                  params={{ slug: p.slug }}
                  className="group block"
                >
                  <Photo src={p.cover} alt={p.title} ratio="3/2" />
                  <div className="mt-5">
                    <p className="eyebrow text-gold">{p.category}</p>
                    <h3 className="mt-2 text-2xl text-navy-foreground">{p.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-navy-foreground/65">
                      {p.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy-foreground transition-colors group-hover:text-gold">
                      View project
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* BEFORE / AFTER */}
      {pavingProject?.comparison ? (
        <section className="py-20 lg:py-28">
          <Container>
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <SectionHead
                  eyebrow="Before &amp; after"
                  title="The difference is the finish"
                  intro="Drag the handle to see a driveway taken from bare ground to laid paving by our team."
                />
                <ul className="mt-8 space-y-3">
                  {pavingProject.scope.map((s) => (
                    <li key={s} className="flex gap-3 text-sm text-charcoal/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      {s}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/work/$slug"
                  params={{ slug: pavingProject.slug }}
                  className="mt-8 inline-flex h-12 items-center gap-2 bg-navy px-6 text-sm font-semibold text-navy-foreground transition-colors hover:bg-charcoal"
                >
                  See the full project
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>
              <Reveal delay={100}>
                <BeforeAfter
                  before={pavingProject.comparison.before}
                  after={pavingProject.comparison.after}
                  beforeAlt={pavingProject.comparison.beforeAlt}
                  afterAlt={pavingProject.comparison.afterAlt}
                />
              </Reveal>
            </div>
          </Container>
        </section>
      ) : null}

      {/* PROCESS */}
      <section className="border-y border-hairline bg-paper py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHead
              eyebrow="How we work"
              title="A clear process from first call to final walk-through"
            />
          </Reveal>
          <ol className="mt-12 grid gap-px bg-hairline lg:grid-cols-5">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 60}>
                <li className="h-full bg-paper p-6">
                  <span className="font-display text-3xl font-bold text-gold">{p.step}</span>
                  <h3 className="mt-3 text-lg text-navy">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{p.copy}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20 lg:py-24">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="text-3xl leading-tight text-navy-foreground sm:text-4xl">
                Tell us about your project — we&apos;ll quote it properly.
              </h2>
              <p className="mt-4 text-navy-foreground/70">
                Send photos, measurements or just a description. We&apos;ll come back with a written
                quote and a realistic timeline.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/quote"
                className="inline-flex h-13 items-center gap-2 bg-gold px-7 text-sm font-semibold text-gold-foreground transition-colors hover:bg-navy-foreground"
              >
                Request a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={site.phoneHref}
                className="inline-flex h-13 items-center gap-2 border border-navy-foreground/40 px-7 text-sm font-semibold text-navy-foreground transition-colors hover:bg-navy-foreground/10"
              >
                <Phone className="h-4 w-4" />
                {site.phone}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
