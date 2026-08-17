import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { photo } from "@/data/photos";
import { Container, SiteLayout } from "@/components/site/Layout";
import { Photo } from "@/components/site/Photo";
import { Reveal } from "@/components/site/Reveal";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { Lightbox } from "@/components/site/Lightbox";
import { whatsappLink } from "@/data/site";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project not found | Dampies & Sons" }, { name: "robots", content: "noindex" }],
      };
    }
    const p = loaderData.project;
    const title = `${p.title} | Dampies & Sons Pro Projects`;
    return {
      meta: [
        { title },
        { name: "description", content: p.description },
        { property: "og:title", content: title },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/work/${p.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/work/${p.slug}` }],
    };
  },
  component: ProjectPage,
  notFoundComponent: ProjectNotFound,
  errorComponent: ProjectNotFound,
});

function ProjectNotFound() {
  return (
    <SiteLayout>
      <Container className="py-28 text-center">
        <h1 className="text-3xl text-navy">We couldn&apos;t find that project</h1>
        <p className="mt-3 text-charcoal/70">It may have been renamed or moved.</p>
        <Link
          to="/work"
          className="mt-8 inline-flex h-12 items-center gap-2 bg-navy px-6 text-sm font-semibold text-navy-foreground"
        >
          Back to all work
        </Link>
      </Container>
    </SiteLayout>
  );
}

function ProjectPage() {
  const { project } = Route.useLoaderData();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length] ?? projects[0]!;

  return (
    <SiteLayout>
      <section className="relative">
        <div className="relative min-h-[380px] overflow-hidden lg:min-h-[520px]">
          <img
            src={photo[project.cover]}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="scrim absolute inset-0" />
          <Container className="relative flex min-h-[380px] flex-col justify-end py-14 lg:min-h-[520px]">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy-foreground/80 hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" />
              All work
            </Link>
            <p className="eyebrow mt-8 text-gold">{project.category}</p>
            <h1 className="mt-3 max-w-3xl text-4xl leading-[1.05] text-navy-foreground sm:text-5xl">
              {project.title}
            </h1>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="border border-navy-foreground/35 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-navy-foreground/85"
                >
                  {t}
                </span>
              ))}
            </div>
          </Container>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <Reveal>
              <h2 className="text-2xl text-navy sm:text-3xl">About this project</h2>
              <p className="mt-5 text-base leading-relaxed text-charcoal/80">{project.description}</p>
            </Reveal>
            <Reveal delay={80}>
              <div className="border-t-2 border-gold pt-6">
                <h3 className="eyebrow text-charcoal/60">Scope of work</h3>
                <ul className="mt-4 space-y-3">
                  {project.scope.map((s) => (
                    <li key={s} className="flex gap-3 text-sm text-charcoal/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {project.stages && project.stages.length > 1 ? (
        <section className="border-y border-hairline bg-paper py-16 lg:py-20">
          <Container>
            <h2 className="text-2xl text-navy sm:text-3xl">Project stages</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {project.stages.map((s, i) => (
                <Reveal key={s.label + i} delay={i * 80}>
                  <Photo src={s.key} alt={s.alt} ratio="4/3" />
                  <p className="eyebrow mt-4 text-gold">{s.label}</p>
                  <p className="mt-2 text-sm text-charcoal/70">{s.alt}</p>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {project.comparison ? (
        <section className="py-16 lg:py-20">
          <Container>
            <h2 className="text-2xl text-navy sm:text-3xl">Before &amp; after</h2>
            <div className="mt-8 max-w-3xl">
              <BeforeAfter
                before={project.comparison.before}
                after={project.comparison.after}
                beforeAlt={project.comparison.beforeAlt}
                afterAlt={project.comparison.afterAlt}
              />
            </div>
          </Container>
        </section>
      ) : null}

      <section className="pb-16 lg:pb-24">
        <Container>
          <h2 className="text-2xl text-navy sm:text-3xl">Project gallery</h2>
          <p className="mt-2 text-sm text-charcoal/60">Tap any photo to view it larger.</p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {project.images.map((im, i) => (
              <button
                key={im.key + i}
                type="button"
                onClick={() => setOpenIndex(i)}
                className="group text-left"
                aria-label={`Open photo: ${im.alt}`}
              >
                <Photo src={im.key} alt={im.alt} ratio="1/1" />
                {im.caption ? (
                  <span className="eyebrow mt-2 block text-charcoal/55">{im.caption}</span>
                ) : null}
              </button>
            ))}
          </div>
        </Container>
      </section>

      <Lightbox
        items={project.images}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />

      <section className="bg-navy py-16 lg:py-20">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="eyebrow text-gold">Next project</p>
              <Link
                to="/work/$slug"
                params={{ slug: next.slug }}
                className="mt-2 inline-flex items-center gap-3 text-2xl text-navy-foreground hover:text-gold sm:text-3xl"
              >
                {next.title}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/quote"
                className="inline-flex h-13 items-center gap-2 bg-gold px-7 text-sm font-semibold text-gold-foreground transition-colors hover:bg-navy-foreground"
              >
                Request a Free Quote
              </Link>
              <a
                href={whatsappLink(`Hi Dampies & Sons, I saw your ${project.title} project and would like something similar.`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-13 items-center gap-2 border border-navy-foreground/40 px-7 text-sm font-semibold text-navy-foreground transition-colors hover:bg-navy-foreground/10"
              >
                WhatsApp about this
              </a>
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
