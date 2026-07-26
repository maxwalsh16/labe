import { BeakerLogo } from "@/components/brand/BeakerLogo";
import { Container } from "@/components/ui/Container";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Labe collects, uses, stores, and protects personal information.",
};

const sections = [
  {
    title: "1. About this policy",
    content: (
      <>
        <p>
          This privacy policy explains how Labe Labs (ABN 60 802 842 481),
          trading as Labe (&quot;Labe&quot;, &quot;we&quot;, &quot;us&quot;,
          or &quot;our&quot;), collects, uses, stores, and discloses personal
          information.
        </p>
        <p>
          We handle personal information responsibly and, where applicable, in
          accordance with the Privacy Act 1988 (Cth) and the Australian Privacy
          Principles.
        </p>
      </>
    ),
  },
  {
    title: "2. Information we collect",
    content: (
      <>
        <p>We may collect information including:</p>
        <ul>
          <li>your name, business name, email address, and phone number;</li>
          <li>your website or social media page;</li>
          <li>
            details you provide about your business, project, services, and
            enquiries, including onboarding questionnaire responses and files
            you choose to upload;
          </li>
          <li>
            the package and add-ons you select, transaction identifiers,
            payment status, billing details, and subscription status (but not
            your complete payment card details);
          </li>
          <li>
            correspondence, feedback, and other information you send to us;
          </li>
          <li>
            messages and information you provide through an AI chat assistant;
          </li>
          <li>
            call details and, where you are notified and consent, call
            recordings, transcripts, summaries, and information provided
            during a call; and
          </li>
          <li>
            technical and usage information, such as your device, browser, IP
            address, pages visited, and interactions with our website.
          </li>
        </ul>
        <p>
          Please do not send us sensitive information unless it is genuinely
          necessary for us to help you.
        </p>
      </>
    ),
  },
  {
    title: "3. How we collect information",
    content: (
      <>
        <p>
          We generally collect information directly from you when you submit
          our contact or checkout form, complete our onboarding questionnaire,
          use our AI chat assistant, email or call us, engage us for services,
          or otherwise communicate with us.
          Payment and subscription information is also provided to us by our
          payment processor. We may collect limited technical information
          automatically when you use our website.
        </p>
        <p>
          If a call may be recorded or transcribed, we will provide notice at
          the start of the call. Recording or transcription will only proceed
          where permitted by law and after any consent required by law has been
          obtained.
        </p>
      </>
    ),
  },
  {
    title: "4. How we use information",
    content: (
      <>
        <p>We may use personal information to:</p>
        <ul>
          <li>respond to enquiries and discuss your business needs;</li>
          <li>
            operate AI-assisted chat and phone services, prepare call or chat
            summaries, and route enquiries to the appropriate person;
          </li>
          <li>prepare proposals, provide services, and manage projects;</li>
          <li>
            send service emails, including payment confirmations, onboarding
            links, project updates, and support communications;
          </li>
          <li>
            process payments, administer subscriptions, issue receipts, prevent
            fraud, and maintain transaction records;
          </li>
          <li>operate, secure, maintain, and improve our website and services;</li>
          <li>communicate with clients and provide support;</li>
          <li>
            send relevant business updates or marketing where you have
            consented, or where otherwise permitted by law; and
          </li>
          <li>meet our legal, accounting, and regulatory obligations.</li>
        </ul>
        <p>We do not sell personal information.</p>
      </>
    ),
  },
  {
    title: "5. AI chat and AI-assisted calls",
    content: (
      <>
        <p>
          We may use clearly identified AI systems to answer common questions,
          collect enquiry details, assist with bookings, and help handle
          telephone calls. Information you provide may be processed by an AI
          service to generate a response, transcript, summary, or suggested
          next step.
        </p>
        <p>
          AI-generated responses can be incomplete or incorrect and are not a
          substitute for professional advice or confirmation from Labe. You can
          ask to communicate with a person instead. Please do not provide
          passwords, payment card details, health information, government
          identifiers, or other sensitive information through AI chat or an
          AI-assisted call unless we specifically ask for it through a secure
          and appropriate process.
        </p>
        <p>
          We do not use AI to make decisions that produce legal or similarly
          significant effects about you without appropriate human review. We
          may use information from a chat or call to respond to your enquiry,
          provide services, improve our customer experience, maintain security,
          and check the quality and accuracy of our systems.
        </p>
      </>
    ),
  },
  {
    title: "6. Cookies and analytics",
    content: (
      <p>
        Our website may use cookies, analytics, and similar technologies to
        understand website traffic, improve performance, remember preferences,
        and protect the website. You can limit cookies through your browser
        settings, although some website features may not work as intended.
      </p>
    ),
  },
  {
    title: "7. When we disclose information",
    content: (
      <>
        <p>
          We may disclose personal information to trusted service providers
          that help us operate our business, including providers of website
          hosting, payment processing, email delivery, analytics, cloud
          storage, AI chat, AI-assisted phone and transcription services,
          business software, and professional advice. Payment card details are
          entered into the payment processor&apos;s secure checkout and are
          not stored in full by Labe.
        </p>
        <p>
          We may also disclose information where you authorise us to do so, or
          where disclosure is required or permitted by law. We ask service
          providers to handle information only for the purposes for which it
          was provided and to protect it appropriately.
        </p>
        <p>
          When we configure an AI receptionist for a customer, currently
          through Hey Jodie unless another provider is requested or agreed,
          caller details, call recordings, transcripts, summaries, booking
          information, and other call data may be processed within the
          customer&apos;s provider account. Labe may select a different
          suitable provider for new customers and may recommend a provider
          change for an existing customer. Where a change materially affects
          an existing customer&apos;s account or data handling, we will explain
          it and obtain the required approval before migration. The customer
          owns or controls the provider account and is also responsible for
          the privacy notices, permissions, retention settings, and lawful use
          required for its callers and business.
        </p>
        <p>
          When Labe handles personal information on a customer&apos;s behalf
          through a website form, automation, booking tool, AI receptionist, or
          similar service, we use that information only to provide, secure,
          support, and improve the agreed service, or as otherwise instructed
          or required by law. The customer remains responsible for ensuring
          that its own collection and use of personal information is lawful and
          appropriately disclosed.
        </p>
      </>
    ),
  },
  {
    title: "8. Overseas processing",
    content: (
      <>
        <p>
          Some service providers may store or process information outside
          Australia. Depending on the service used, likely locations include
          Australia, the United States, the United Kingdom, and countries in
          the European Economic Area. Providers may also use infrastructure in
          other countries identified in their current privacy or data-location
          documentation.
        </p>
        <p>
          Provider locations and infrastructure can change. Where required, we
          take reasonable steps to ensure overseas recipients handle personal
          information consistently with applicable Australian privacy
          requirements. You may contact us for current information about the
          providers relevant to your information.
        </p>
      </>
    ),
  },
  {
    title: "9. Security, retention, and data breaches",
    content: (
      <>
        <p>
          We take reasonable technical and organisational steps to protect
          personal information from misuse, interference, loss, and
          unauthorised access, modification, or disclosure. No internet
          transmission or storage system is completely secure. Chat messages,
          call recordings, transcripts, and summaries are retained only for as
          long as reasonably necessary for the purposes described in this
          policy, to resolve disputes, or as required by law, then deleted or
          de-identified where practicable.
        </p>
        <p>
          If we become aware of a suspected data breach, we will take
          reasonable steps to contain it, assess its likely impact, and reduce
          the risk of harm. Where the Notifiable Data Breaches scheme or
          another applicable law requires notification, we will notify affected
          individuals and the relevant regulator as required.
        </p>
      </>
    ),
  },
  {
    title: "10. Access and correction",
    content: (
      <p>
        You may ask to access the personal information we hold about you, or
        ask us to correct information that is inaccurate, out of date,
        incomplete, irrelevant, or misleading. Email{" "}
        <a href="mailto:hello@labe.com.au">hello@labe.com.au</a>. We may need
        to verify your identity before responding.
      </p>
    ),
  },
  {
    title: "11. Marketing communications",
    content: (
      <p>
        We send marketing communications only where you have consented or where
        otherwise permitted by law. You can ask us to stop receiving marketing
        communications at any time by using the unsubscribe option in the
        message or emailing{" "}
        <a href="mailto:hello@labe.com.au">hello@labe.com.au</a>. We may still
        send service-related messages where necessary.
      </p>
    ),
  },
  {
    title: "12. Privacy questions and complaints",
    content: (
      <>
        <p>
          If you have a question or complaint about how we handle personal
          information, please email{" "}
          <a href="mailto:hello@labe.com.au">hello@labe.com.au</a>. Include
          enough detail for us to understand the issue. We will acknowledge
          your complaint and aim to provide a substantive response within 30
          days. If we need more time, we will explain why and provide an
          updated timeframe.
        </p>
        <p>
          If you are not satisfied with our response, you may be able to lodge
          a complaint with the{" "}
          <a
            href="https://www.oaic.gov.au/privacy/privacy-complaints"
            target="_blank"
            rel="noreferrer"
          >
            Office of the Australian Information Commissioner
          </a>
          .
        </p>
      </>
    ),
  },
  {
    title: "13. Third-party websites and services",
    content: (
      <p>
        Our website may link to, embed, or rely on services operated by other
        organisations, including AI chat and phone providers. Those providers
        may process information under their own privacy policies and service
        terms. We take reasonable care when selecting and configuring
        providers, but we do not control their independent privacy practices.
        We recommend reviewing any linked provider information before supplying
        personal information.
      </p>
    ),
  },
  {
    title: "14. Changes to this policy",
    content: (
      <p>
        We may update this policy as our services or legal obligations change.
        The current version will always be published on this page with its
        effective date.
      </p>
    ),
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <Container className="flex h-20 items-center justify-between">
          <Link href="/" aria-label="Return to Labe home">
            <BeakerLogo />
          </Link>
          <Link
            href="/"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700"
          >
            Back to home
          </Link>
        </Container>
      </header>

      <main className="bg-slate-50 py-16 sm:py-24">
        <Container>
          <article className="mx-auto max-w-4xl">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm sm:p-12 lg:p-16">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">
                Your information
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
                Privacy policy
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                A plain-English explanation of what information Labe collects
                and how we look after it.
              </p>
              <p className="mt-5 text-sm font-semibold text-slate-500">
                Effective 27 July 2026
              </p>

              <div className="mt-12 space-y-10">
                {sections.map((section) => (
                  <section
                    key={section.title}
                    className="border-t border-slate-200 pt-10"
                  >
                    <h2 className="text-2xl font-black tracking-[-0.025em] text-slate-950">
                      {section.title}
                    </h2>
                    <div className="mt-4 space-y-4 text-base leading-7 text-slate-600 [&_a]:font-bold [&_a]:text-blue-700 [&_a]:underline [&_a]:decoration-blue-200 [&_a]:underline-offset-4 hover:[&_a]:decoration-blue-600 [&_li]:pl-2 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2">
                      {section.content}
                    </div>
                  </section>
                ))}

                <section className="rounded-3xl bg-slate-950 p-7 text-white sm:p-9">
                  <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-300">
                    Contact Labe
                  </p>
                  <h2 className="mt-3 text-2xl font-black">
                    Questions about your privacy?
                  </h2>
                  <div className="mt-5 space-y-1 text-slate-300">
                    <p>Labe Labs · ABN 60 802 842 481</p>
                    <p>Level 30, 91 King William Street</p>
                    <p>Adelaide, Australia</p>
                    <a
                      href="mailto:hello@labe.com.au"
                      className="inline-block pt-3 font-bold text-white underline decoration-blue-400 underline-offset-4"
                    >
                      hello@labe.com.au
                    </a>
                  </div>
                </section>
              </div>
            </div>
          </article>
        </Container>
      </main>
    </>
  );
}
