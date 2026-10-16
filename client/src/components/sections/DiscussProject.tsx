"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Check, Send } from "lucide-react";
import { discuss } from "@/data/site";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cardTitleClass } from "@/lib/typography";

// Field styling shared by input/select/textarea — design-system §05:
// 44px min touch target, 8px radius, border + focus ring in accent.
const fieldClass =
  "w-full min-h-[44px] rounded-btn border border-border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-faint outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20";

const labelClass = "mb-1.5 block text-[13px] font-bold text-text";

// Discuss a Project (#discuss, 06) — project-inquiry form sitting directly
// above Contact. Static site: submit composes a prefilled mailto: to the
// owner (nothing is stored or POSTed) and confirms via role="status".
export function DiscussProject() {
  const [status, setStatus] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    // Browser constraint validation (required / type=email) runs before the
    // submit event, so reaching this handler means the form is valid.
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const type = String(data.get("type") ?? "").trim();
    const details = String(data.get("details") ?? "").trim();

    const subject = `Project inquiry — ${type}${name ? ` (${name})` : ""}`;
    const body = [
      `Project type: ${type}`,
      `Name: ${name}`,
      `Reply-to: ${email}`,
      "",
      details,
    ].join("\n");

    window.location.href = `mailto:${discuss.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setStatus(
      `Your email app should open with the message ready — if nothing happens, write to ${discuss.email}.`,
    );
    form.reset();
  }

  return (
    <Section
      id="discuss"
      number="06"
      label="Discuss a Project"
      title={<>Have a project in <span className="text-accent">mind?</span></>}
    >
      <div className="grid gap-3 md:grid-cols-2 md:gap-[14px] lg:gap-4">
        <Reveal className="flex flex-col gap-4">
          <div>
            <p className="max-w-[52ch] text-[15px] leading-[1.7] text-muted">
              {discuss.description}
            </p>
            <h3 className={`mt-5 ${cardTitleClass}`}>{discuss.checklistTitle}</h3>
            <ul className="mt-2.5 space-y-2">
              {discuss.checklist.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[13.5px] leading-[1.6] text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-soft text-accent"
                  >
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-[13px] text-faint">
            Prefer email?{" "}
            <a
              href={`mailto:${discuss.email}`}
              className="font-semibold text-accent underline underline-offset-2 hover:opacity-80"
            >
              {discuss.email}
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <Card className="h-full">
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid gap-3.5 sm:grid-cols-2">
                <div>
                  <label htmlFor="discuss-name" className={labelClass}>
                    Your name
                  </label>
                  <input
                    id="discuss-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="discuss-email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="discuss-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="jane@company.com"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="discuss-type" className={labelClass}>
                  Project type
                </label>
                <select
                  id="discuss-type"
                  name="type"
                  required
                  defaultValue={discuss.projectTypes[0] ?? ""}
                  className={fieldClass}
                >
                  {discuss.projectTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="discuss-details" className={labelClass}>
                  Project details
                </label>
                <textarea
                  id="discuss-details"
                  name="details"
                  required
                  rows={5}
                  placeholder="What are you building, for whom, and by when?"
                  className={`${fieldClass} resize-y`}
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit">
                  <Send size={15} aria-hidden="true" />
                  {discuss.submitLabel}
                </Button>
                <p role="status" aria-live="polite" className="text-[12px] leading-[1.5] text-faint">
                  {status ?? "Opens your email app — nothing is stored on this site."}
                </p>
              </div>
            </form>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
