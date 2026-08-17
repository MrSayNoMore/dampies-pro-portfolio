import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { site } from "@/data/site";
import { Container, SiteLayout } from "@/components/site/Layout";
import { Photo } from "@/components/site/Photo";
import { Reveal } from "@/components/site/Reveal";

const title = "About Us — A Family-Run Building Team | Dampies & Sons Pro Projects";
const description =
  "Dampies & Sons Pro Projects is a family-run South African building and renovation team known for detailed workmanship, honest quotes and reliable timelines.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const values = [
  {
    title: "Workmanship first",
    copy: "Level tiles, straight skirting, clean cuts. The details are the reason clients recommend us.",
  },
  {
    title: "Honest quoting",
    copy: "You get the scope written down, so there are no surprise line items halfway through the job.",
  },
  {
    title: "Reliable timelines",
    copy: "We commit to dates we can meet, and we tell you early if something changes on site.",
  },
  {
    title: "Respect for your home",
    copy: "Floors covered, site swept, materials stacked. We work in homes people are still living in.",
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="border-b border-hairline bg-paper py-16 lg:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow text-gold">About us</p>
              <h1 className="mt-4 text-4xl leading-[1.05] text-navy sm:text-5xl">
                A family name on every project we finish.
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-charcoal/80">
                Dampies &amp; Sons Pro Projects is a family-run building and renovation company
                working across South Africa. We take on kitchens, bathrooms, extensions, roofs,
                paving, painting and carpentry — and we stay on site until the finish is right.
              </p>
              <p className="mt-4 text-base leading-relaxed text-charcoal/70">
                Our reputation was built where our clients could see it: a Facebook community of{" "}
                {site.facebookFollowers} followers who have watched the projects go up, photo by
                photo. That same work is on this site.
              </p>
            </div>
            <Reveal delay={80}>
              <Photo src="team-1" alt="The Dampies & Sons Pro Projects team on site" ratio="4/3" />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <Reveal>
              <h2 className="text-3xl text-navy sm:text-4xl">What we stand for</h2>
              <p className="mt-4 text-base leading-relaxed text-charcoal/75">
                Four things decide whether a building team is worth hiring twice. These are ours.
              </p>
            </Reveal>
            <div className="grid gap-px bg-hairline sm:grid-cols-2">
              {values.map((v, i) => (
                <Reveal key={v.title} delay={i * 70}>
                  <div className="h-full bg-background p-6">
                    <Check className="h-5 w-5 text-gold" />
                    <h3 className="mt-4 text-lg text-navy">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{v.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-hairline bg-paper py-16 lg:py-20">
        <Container>
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="font-display text-4xl font-bold text-navy">{site.facebookFollowers}</p>
              <p className="mt-2 text-sm text-charcoal/70">Followers watching our projects</p>
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-navy">6</p>
              <p className="mt-2 text-sm text-charcoal/70">Trades handled in-house</p>
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-navy">100%</p>
              <p className="mt-2 text-sm text-charcoal/70">Photos on this site are our own work</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-navy py-16 lg:py-20">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <h2 className="max-w-xl text-3xl leading-tight text-navy-foreground sm:text-4xl">
              Let&apos;s talk about your project.
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/quote"
                className="inline-flex h-13 items-center gap-2 bg-gold px-7 text-sm font-semibold text-gold-foreground transition-colors hover:bg-navy-foreground"
              >
                Request a Free Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/work"
                className="inline-flex h-13 items-center gap-2 border border-navy-foreground/40 px-7 text-sm font-semibold text-navy-foreground transition-colors hover:bg-navy-foreground/10"
              >
                See our work
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
