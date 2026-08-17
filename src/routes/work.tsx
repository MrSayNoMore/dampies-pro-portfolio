import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { projects, projectTags, type ProjectTag } from "@/data/projects";
import { Container, SiteLayout } from "@/components/site/Layout";
import { Photo } from "@/components/site/Photo";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

const title = "Our Work — Real Project Photos | Dampies & Sons Pro Projects";
const description =
  "Browse completed kitchens, bathrooms, extensions, paving and carpentry projects photographed on site by Dampies & Sons Pro Projects.";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/work" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
  component: WorkPage,
});

function WorkPage() {
  const [filter, setFilter] = useState<"All" | ProjectTag>("All");

  const shown = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter))),
    [filter],
  );

  return (
    <SiteLayout>
      <section className="border-b border-hairline bg-paper py-16 lg:py-24">
        <Container>
          <p className="eyebrow text-gold">Our work</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] text-navy sm:text-5xl">
            Every photo on this page is our own work.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-charcoal/75">
            No stock photography. Browse the projects by trade and open any one to see the full story
            from before to completed.
          </p>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
            {projectTags.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setFilter(t)}
                aria-pressed={filter === t}
                className={cn(
                  "shrink-0 border px-4 py-2 text-sm font-semibold transition-colors",
                  filter === t
                    ? "border-navy bg-navy text-navy-foreground"
                    : "border-hairline text-charcoal hover:border-navy",
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-10 sm:grid-cols-2">
            {shown.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <Link to="/work/$slug" params={{ slug: p.slug }} className="group block">
                  <Photo src={p.cover} alt={p.title} ratio="3/2" />
                  <p className="eyebrow mt-5 text-gold">{p.category}</p>
                  <h2 className="mt-2 text-2xl text-navy">{p.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{p.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors group-hover:text-gold">
                    {p.images.length} photos
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          {shown.length === 0 ? (
            <p className="py-16 text-center text-charcoal/60">
              No projects in this category yet — get in touch and yours could be the first.
            </p>
          ) : null}
        </Container>
      </section>

      <section className="bg-navy py-16 lg:py-20">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <h2 className="max-w-xl text-3xl leading-tight text-navy-foreground sm:text-4xl">
              Want something like this at your place?
            </h2>
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
