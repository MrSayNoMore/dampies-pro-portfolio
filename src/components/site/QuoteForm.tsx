import { useState } from "react";
import { z } from "zod";
import { Check, Loader2, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { quoteServiceOptions, startTimeframes } from "@/data/services";
import { site, whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(7, "Please enter a contact number").max(30),
  email: z.string().trim().email("Enter a valid email").max(255).or(z.literal("")),
  service: z.string().min(1, "Choose a service"),
  location: z.string().trim().max(160),
  timeframe: z.string().min(1, "Choose a timeframe"),
  details: z.string().trim().min(10, "Tell us a bit more about the project").max(2000),
});

type FormState = z.infer<typeof schema>;

const empty: FormState = {
  name: "",
  phone: "",
  email: "",
  service: "",
  location: "",
  timeframe: "",
  details: "",
};

const steps = ["Your project", "Your details", "Review"] as const;

const inputClass =
  "h-12 w-full border border-input bg-background px-4 text-sm text-charcoal outline-none transition-colors focus:border-gold";

export function QuoteForm({ initialService }: { initialService?: string }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    ...empty,
    service: initialService && quoteServiceOptions.includes(initialService as never) ? initialService : "",
  });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  function validate(fields: (keyof FormState)[]) {
    const result = schema.safeParse(form);
    const next: Record<string, string> = {};
    if (!result.success) {
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormState;
        if (fields.includes(key) && !next[key]) next[key] = issue.message;
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submit() {
    if (!validate(Object.keys(form) as (keyof FormState)[])) return;
    setSubmitting(true);
    setFailed(null);
    try {
      const paths: string[] = [];
      const stamp = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      for (const [i, file] of files.slice(0, 5).entries()) {
        const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
        const path = `${stamp}/${i + 1}.${ext}`;
        const { error } = await supabase.storage.from("quote-uploads").upload(path, file, {
          contentType: file.type || "image/jpeg",
        });
        if (!error) paths.push(path);
      }

      const { error } = await supabase.from("quote_requests").insert({
        name: form.name,
        phone: form.phone,
        email: form.email || null,
        service: form.service,
        location: form.location || null,
        timeframe: form.timeframe,
        details: form.details,
        photo_paths: paths,
      });
      if (error) throw error;
      setDone(true);
    } catch {
      setFailed(
        "We couldn't send your request just now. Please WhatsApp or call us and we'll pick it up right away.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="border border-hairline bg-paper p-8 lg:p-10">
        <span className="inline-flex h-12 w-12 items-center justify-center bg-gold text-gold-foreground">
          <Check className="h-6 w-6" />
        </span>
        <h2 className="mt-6 text-2xl text-navy">Request received</h2>
        <p className="mt-3 text-sm leading-relaxed text-charcoal/75">
          Thanks {form.name.split(" ")[0]} — we have your project details and will come back to you
          shortly. If it&apos;s urgent, message us directly.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={whatsappLink(`Hi Dampies & Sons, I just submitted a quote request for ${form.service}.`)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center bg-whatsapp px-6 text-sm font-semibold text-whatsapp-foreground"
          >
            WhatsApp us
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex h-12 items-center border border-navy px-6 text-sm font-semibold text-navy"
          >
            {site.phone}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-hairline bg-background p-6 sm:p-8 lg:p-10">
      <ol className="flex gap-2">
        {steps.map((s, i) => (
          <li key={s} className="flex-1">
            <div className={cn("h-1", i <= step ? "bg-gold" : "bg-hairline")} />
            <p
              className={cn(
                "eyebrow mt-3",
                i === step ? "text-navy" : "text-charcoal/45",
              )}
            >
              {s}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-8 space-y-5">
        {step === 0 ? (
          <>
            <Field label="What kind of work do you need?" error={errors.service}>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {quoteServiceOptions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => set("service", s)}
                    aria-pressed={form.service === s}
                    className={cn(
                      "h-12 border text-sm font-semibold transition-colors",
                      form.service === s
                        ? "border-navy bg-navy text-navy-foreground"
                        : "border-hairline text-charcoal hover:border-navy",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="When would you like to start?" error={errors.timeframe}>
              <div className="grid gap-2 sm:grid-cols-2">
                {startTimeframes.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => set("timeframe", t)}
                    aria-pressed={form.timeframe === t}
                    className={cn(
                      "h-12 border px-4 text-sm font-semibold transition-colors",
                      form.timeframe === t
                        ? "border-navy bg-navy text-navy-foreground"
                        : "border-hairline text-charcoal hover:border-navy",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Tell us about the project" error={errors.details}>
              <textarea
                value={form.details}
                onChange={(e) => set("details", e.target.value)}
                rows={5}
                maxLength={2000}
                placeholder="e.g. Full bathroom renovation — retile walls and floor, new shower and vanity."
                className="w-full border border-input bg-background p-4 text-sm text-charcoal outline-none transition-colors focus:border-gold"
              />
            </Field>

            <Field label="Photos of the space (optional, up to 5)">
              <label className="flex cursor-pointer items-center gap-3 border border-dashed border-input px-4 py-4 text-sm text-charcoal/70 transition-colors hover:border-gold">
                <Upload className="h-4 w-4 text-gold" />
                {files.length ? `${files.length} file(s) selected` : "Choose photos"}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={(e) => setFiles(Array.from(e.target.files ?? []).slice(0, 5))}
                />
              </label>
            </Field>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <Field label="Your name" error={errors.name}>
              <input
                className={inputClass}
                value={form.name}
                maxLength={100}
                onChange={(e) => set("name", e.target.value)}
              />
            </Field>
            <Field label="Contact number" error={errors.phone}>
              <input
                className={inputClass}
                value={form.phone}
                inputMode="tel"
                maxLength={30}
                onChange={(e) => set("phone", e.target.value)}
              />
            </Field>
            <Field label="Email (optional)" error={errors.email}>
              <input
                className={inputClass}
                value={form.email}
                inputMode="email"
                maxLength={255}
                onChange={(e) => set("email", e.target.value)}
              />
            </Field>
            <Field label="Where is the project? (optional)">
              <input
                className={inputClass}
                value={form.location}
                maxLength={160}
                placeholder="Suburb or town"
                onChange={(e) => set("location", e.target.value)}
              />
            </Field>
          </>
        ) : null}

        {step === 2 ? (
          <dl className="divide-y divide-hairline border-y border-hairline text-sm">
            {[
              ["Service", form.service],
              ["Timeframe", form.timeframe],
              ["Details", form.details],
              ["Name", form.name],
              ["Phone", form.phone],
              ["Email", form.email || "—"],
              ["Location", form.location || "—"],
              ["Photos", files.length ? `${files.length} attached` : "None"],
            ].map(([k, v]) => (
              <div key={k} className="grid gap-1 py-3 sm:grid-cols-[140px_1fr]">
                <dt className="eyebrow text-charcoal/55">{k}</dt>
                <dd className="text-charcoal/85">{v}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {failed ? <p className="text-sm text-destructive">{failed}</p> : null}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex h-12 items-center border border-hairline px-6 text-sm font-semibold text-charcoal"
          >
            Back
          </button>
        ) : null}
        {step < 2 ? (
          <button
            type="button"
            onClick={() => {
              const fields: (keyof FormState)[] =
                step === 0 ? ["service", "timeframe", "details"] : ["name", "phone", "email"];
              if (validate(fields)) setStep((s) => s + 1);
            }}
            className="inline-flex h-12 items-center bg-navy px-7 text-sm font-semibold text-navy-foreground transition-colors hover:bg-charcoal"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            disabled={submitting}
            onClick={submit}
            className="inline-flex h-12 items-center gap-2 bg-gold px-7 text-sm font-semibold text-gold-foreground transition-colors hover:bg-navy hover:text-navy-foreground disabled:opacity-60"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Send request
          </button>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-navy">{label}</p>
      {children}
      {error ? <p className="mt-2 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
