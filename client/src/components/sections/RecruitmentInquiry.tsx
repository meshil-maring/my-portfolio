"use client";

import { useState, FormEvent } from "react";
import { Check, Send } from "lucide-react";
import { recruitment } from "@/data/site";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { cardTitleClass } from "@/lib/typography";
import { cn } from "@/lib/cn";

const fieldClass =
  "w-full min-h-[44px] rounded-btn border border-border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-faint outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20";

const labelClass = "mb-1.5 block text-[13px] font-bold text-text";

export function RecruitmentInquiry() {
  const [status, setStatus] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const role = String(data.get("role") ?? "").trim();
    const details = String(data.get("details") ?? "").trim();

    const subject = `Recruitment inquiry - ${role}${name ? ` - ${name}` : ""}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "(not provided)"}`,
      `Role: ${role}`,
      "",
      "Details:",
      details,
    ].join("\n");

    window.location.href = `mailto:${recruitment.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setStatus(
      `Your email app should open with the message ready - if nothing happens, write to ${recruitment.email}.`,
    );
    form.reset();
  }

  return (
    <Section
      id="recruitment"
      number="07"
      label="Recruitment Inquiry"
      title={<>Hiring for a <span className="text-accent">role?</span></>}
      className="bg-bg-2"
    >
      <div className="grid gap-3 md:grid-cols-2 md:gap-[14px] lg:gap-4">
        <Reveal className="flex flex-col gap-4">
          <div>
            <p className="max-w-[52ch] text-[15px] leading-[1.7] text-muted">
              {recruitment.description}
            </p>
            <h3 className={`mt-5 ${cardTitleClass}`}>
              {recruitment.checklistTitle}
            </h3>
            <ul className="mt-2.5 space-y-2">
              {recruitment.checklist.map((item) => (
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
              href={`mailto:${recruitment.email}`}
              className="font-semibold text-accent underline underline-offset-2 hover:opacity-80"
            >
              {recruitment.email}
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <Card className="h-full">
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid gap-3.5 sm:grid-cols-2">
                <div>
                  <label htmlFor="recruitment-name" className={labelClass}>
                    Your name
                  </label>
                  <input
                    id="recruitment-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="recruitment-email" className={labelClass}>
                    Your email
                  </label>
                  <input
                    id="recruitment-email"
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
                <label htmlFor="recruitment-company" className={labelClass}>
                  Company
                </label>
                <input
                  id="recruitment-company"
                  name="company"
                  type="text"
                  placeholder="Company name"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="recruitment-role" className={labelClass}>
                  Role you're hiring for
                </label>
                <select
                  id="recruitment-role"
                  name="role"
                  required
                  defaultValue={recruitment.roles[0] ?? ""}
                  className={fieldClass}
                >
                  {recruitment.roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="recruitment-details" className={labelClass}>
                  Details
                </label>
                <textarea
                  id="recruitment-details"
                  name="details"
                  required
                  rows={5}
                  placeholder="Role summary, team, tech stack, timeline, location / remote policy, compensation range..."
                  className={`${fieldClass} resize-y`}
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit">
                  <Send size={15} aria-hidden="true" />
                  {recruitment.submitLabel}
                </Button>
                <p
                  role="status"
                  aria-live="polite"
                  className="text-[12px] leading-[1.5] text-faint"
                >
                  {status ??
                    "Opens your email app - nothing is stored on this site."}
                </p>
              </div>
            </form>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
