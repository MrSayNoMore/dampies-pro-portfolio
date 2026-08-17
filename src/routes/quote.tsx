import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Container, SiteLayout } from "@/components/site/Layout";
import { QuoteForm } from "@/components/site/QuoteForm";

const title = "Request a Free Quote | Dampies & Sons Pro Projects";
const description =
  "Tell us about your renovation, building, tiling, painting or carpentry project and get a written quote from Dampies & Sons Pro Projects.";

export const Route = createFileRoute("/quote")({
  validateSearch: z.object({ service: z.string().optional() }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/quote" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/quote" }],
  }),
  component: QuotePage,
});

function QuotePage() {
  const { service } = Route.useSearch();

  return (
    <SiteLayout>
      <section className="border-b border-hairline bg-paper py-16 lg:py-20">
        <Container>
          <p className="eyebrow text-gold">Request a quote</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] text-navy sm:text-5xl">
            Three short steps and we&apos;ll come back to you.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-charcoal/75">
            The more detail you give us, the more accurate the quote. Photos of the space help a lot.
          </p>
        </Container>
      </section>

      <section className="py-14 lg:py-20">
        <Container>
          <div className="max-w-2xl">
            <QuoteForm initialService={service} />
          </div>
        </Container>
      </section>
    </SiteLayout>
  );
}
