"use client"

import { useState, type FormEvent, type ReactNode } from "react"

import { cn } from "@/lib/utils"

import { FyiButton } from "./fyi-button"

// Figma: fyiPage-v1 › 05 · Get in touch › Form card (Desktop 536:2431 ·
// Tablet 536:2734 · Mobile 536:3037). Two fields per row from tablet up,
// a single column with a full-width Send on mobile.
//
// No network call yet: submit validates in the browser, resets the form and
// shows an inline confirmation. Wire a server action / API route in here.

type FieldName = "name" | "company" | "email" | "telegram" | "message"
type Errors = Partial<Record<FieldName, string>>

const REQUIRED: { name: FieldName; message: string }[] = [
  { name: "name", message: "Enter your name." },
  { name: "company", message: "Enter your company." },
  { name: "email", message: "Enter your email." },
  { name: "message", message: "Enter a message." },
]

function validate(form: HTMLFormElement): Errors {
  const errors: Errors = {}
  for (const { name, message } of REQUIRED) {
    const el = form.elements.namedItem(name) as
      HTMLInputElement | HTMLTextAreaElement | null
    if (!el) continue
    if (!el.value.trim()) errors[name] = message
    else if (!el.validity.valid) errors[name] = "Enter a valid email address."
  }
  return errors
}

// Filled Mira input: Background/Input + Border/Input drawn as an inset shadow.
// Focus swaps in Border/Input focus and adds the Mira 2px-gap focus ring.
const control = cn(
  "w-full min-w-0 rounded-[10px] bg-mira-background-input px-4 text-mira-normal text-mira-text-body shadow-mira-input outline-none",
  "transition-shadow duration-150 ease-out motion-reduce:transition-none",
  "placeholder:text-mira-text-placeholder hover:shadow-mira-input-hover",
  "aria-invalid:shadow-mira-input-error",
  "focus-visible:shadow-mira-input-focus focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mira-border-focus-ring"
)

const input = cn(control, "h-12 lg:h-[52px]")

function Field({
  id,
  label,
  optional,
  error,
  className,
  children,
}: {
  id: string
  label: string
  optional?: boolean
  error?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-2.5", className)}>
      <label
        htmlFor={id}
        className="flex gap-1.5 text-[13px] leading-[1.4] font-bold whitespace-nowrap text-mira-text-body md:text-mira-small"
      >
        <span>
          {label}
          {optional ? null : <span aria-hidden>*</span>}
        </span>
        {optional ? (
          <span className="font-normal text-mira-text-meta">(optional)</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          className="-mt-1 text-[13px] leading-[1.4] text-mira-feedback-error-text md:text-mira-small"
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function FyiContactForm() {
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const next = validate(form)
    setErrors(next)

    const firstInvalid = REQUIRED.find(({ name }) => next[name])
    if (firstInvalid) {
      setSent(false)
      ;(form.elements.namedItem(firstInvalid.name) as HTMLElement).focus()
      return
    }

    form.reset()
    setSent(true)
  }

  function clearError(name: string) {
    if (sent) setSent(false)
    if (errors[name as FieldName]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name as FieldName]
        return next
      })
    }
  }

  const describe = (name: FieldName) =>
    errors[name] ? `contact-${name}-error` : undefined

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      onChange={(event) => {
        const field = event.target
        if (
          field instanceof HTMLInputElement ||
          field instanceof HTMLTextAreaElement
        ) {
          clearError(field.name)
        }
      }}
      className="flex flex-col gap-5 rounded-[27px] bg-mira-background-card p-6 md:gap-6 md:p-10 lg:p-12"
    >
      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        <Field id="contact-name" label="Name" error={errors.name}>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describe("name")}
            className={input}
          />
        </Field>
        <Field id="contact-company" label="Company" error={errors.company}>
          <input
            id="contact-company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={describe("company")}
            className={input}
          />
        </Field>
        <Field id="contact-email" label="Email" error={errors.email}>
          <input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            required
            autoComplete="email"
            spellCheck={false}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describe("email")}
            className={input}
          />
        </Field>
        <Field id="contact-telegram" label="Telegram" optional>
          <input
            id="contact-telegram"
            name="telegram"
            type="text"
            placeholder="@username"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            className={input}
          />
        </Field>
        <Field
          id="contact-message"
          label="Message"
          error={errors.message}
          className="md:col-span-2"
        >
          <textarea
            id="contact-message"
            name="message"
            required
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describe("message")}
            className={cn(control, "h-40 resize-none py-4 md:h-[180px]")}
          />
        </Field>
      </div>

      <div className="flex flex-col items-center pt-2 md:flex-row md:justify-end">
        {/* Live region stays mounted so the confirmation is announced. */}
        <p
          role="status"
          className={cn(
            "text-mira-small font-bold text-mira-feedback-success-text max-md:order-last",
            sent && "max-md:mt-4 md:mr-4"
          )}
        >
          {sent ? "Thanks — we’ll be in touch." : null}
        </p>
        <FyiButton type="submit" size="lg" className="max-md:w-full">
          Send
        </FyiButton>
      </div>
    </form>
  )
}
