import { FyiContactForm } from "./contact-form"

// Figma: fyiPage-v1 › 05 · Get in touch (Desktop 536:2429 · Tablet 536:2732 ·
// Mobile 536:3035). Centred Outfit heading over a 1089px form card. The card
// sits flush with the section bottom so the footer's flight path can "leave"
// from the Send button.
export function FyiContact() {
  return (
    <section
      id="contact"
      aria-labelledby="fyi-contact-heading"
      className="mx-auto flex max-w-[1440px] flex-col items-center gap-8 px-6 pt-16 md:gap-10 md:px-12 md:pt-20 lg:px-16 lg:pt-24"
    >
      <h2
        id="fyi-contact-heading"
        className="text-center font-fyi-display text-fyi-heading-section text-mira-text-heading"
      >
        Get in touch
      </h2>

      {/* 1px white gradient "border" (32% at the top-left / bottom-right
          corners), the surface shows through the padding. */}
      <div className="w-full max-w-[1089px] rounded-[28px] bg-[linear-gradient(to_bottom_right,rgb(255_255_255/0.32)_0%,transparent_20%,transparent_80%,rgb(255_255_255/0.32)_100%)] p-px">
        <FyiContactForm />
      </div>
    </section>
  )
}
