import { BeakerLogo } from "@/components/brand/BeakerLogo";
import { Container } from "@/components/ui/Container";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply when you use Labe's website or engage Labe for services.",
};

const sections = [
  {
    title: "1. About these terms",
    content: (
      <>
        <p>
          These terms apply when you use this website or engage Labe Labs (ABN
          60 802 842 481), trading as Labe (&quot;Labe&quot;, &quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;), to provide services.
        </p>
        <p>
          If you engage us, these terms form part of your agreement with us,
          together with the proposal, quote, scope, or invoice we provide. If
          there is an inconsistency, the document prepared specifically for
          your project takes priority to the extent of that inconsistency.
        </p>
      </>
    ),
  },
  {
    title: "2. Our services",
    content: (
      <p>
        Labe provides websites, enquiry and booking tools, digital advertising
        setup, automation, practical AI solutions, and related services. The
        exact inclusions, price, timing, and deliverables for your project will
        be set out in writing before work begins.
      </p>
    ),
  },
  {
    title: "3. Quotes, acceptance, and scope",
    content: (
      <>
        <p>
          A quote or proposal is valid for the period stated in it. You accept
          it by confirming acceptance in writing, paying a requested deposit
          or invoice, or asking us to begin work.
        </p>
        <p>
          Only the items expressly included in the agreed scope are included
          in the price. New pages, features, integrations, rounds of changes,
          or other work outside that scope may require a revised quote. We will
          tell you the price and obtain your approval before beginning
          additional paid work.
        </p>
      </>
    ),
  },
  {
    title: "4. Your responsibilities",
    content: (
      <>
        <p>You agree to:</p>
        <ul>
          <li>
            provide accurate content, instructions, approvals, and system
            access reasonably required for the project;
          </li>
          <li>
            respond within a reasonable time so the project can stay on
            schedule;
          </li>
          <li>
            check names, prices, claims, contact details, and other business
            information before approving publication;
          </li>
          <li>
            ensure you have permission to use all text, photographs, logos,
            trademarks, data, and other materials you supply; and
          </li>
          <li>
            use the website and services lawfully and maintain any licences,
            disclosures, policies, or industry approvals your business needs.
          </li>
        </ul>
        <p>
          You remain responsible for your business decisions, advertising
          claims, customer communications, and compliance obligations.
        </p>
        <p>
          If the services collect or handle personal information about your
          customers, callers, staff, or other people, you are responsible for
          providing any required privacy notices and obtaining any required
          permissions or consents. You instruct Labe to handle that information
          only as reasonably necessary to provide, secure, support, and improve
          the agreed services, or as otherwise instructed or required by law.
        </p>
      </>
    ),
  },
  {
    title: "5. Delivery timeframes",
    content: (
      <>
        <p>
          Labe Launch and Labe Growth include a website going live within 48
          hours. Growth inclusions and selected add-ons are completed within 5
          business days. These priority periods apply only when the package
          setup price and selected one-off add-ons due at checkout are paid in
          full. They begin after we receive that payment, the required content,
          instructions, access, and approval to start. They exclude time spent
          waiting for your feedback, materials, or approvals.
        </p>
        <p>
          If we agree to accept a deposit, instalments, or staged payments, the
          project is scheduled into the next available waiting-list position
          and the advertised priority delivery period does not apply. Future
          monthly service fees do not need to be prepaid for priority status.
        </p>
        <p>
          A delay caused by you, a third-party platform, an outage, or an event
          outside our reasonable control pauses or reasonably extends the
          delivery period. Advertising platforms, AI phone providers, account
          verification, and other third-party add-ons may require additional
          approval or processing time. If the agreed scope requires a different
          timeframe, we will state that before work begins.
        </p>
        <p>
          After successful payment, we send a welcome email with a link to our
          onboarding questionnaire. The questionnaire helps us collect the
          information needed to begin your build. Your delivery timeframe starts
          only once we have received the required onboarding details and approval
          to start.
        </p>
      </>
    ),
  },
  {
    title: "6. Changes and approvals",
    content: (
      <>
        <p>
          The number of included revision rounds will be shown in your
          proposal. A revision means a reasonable change to work already
          included in the agreed scope; it does not include a new design
          direction, new feature, or expanded scope.
        </p>
        <p>
          You are responsible for reviewing the work and requesting corrections
          before final approval. Once you approve publication, later changes
          may be charged at the applicable update fee or quoted before work
          begins. Minor content updates are included in an active Labe Growth
          service as described in your proposal.
        </p>
      </>
    ),
  },
  {
    title: "7. Fees and payment",
    content: (
      <>
        <p>
          Prices are in Australian dollars. Any applicable GST, deposit,
          payment stages, and due dates will be shown in your proposal or
          invoice. You must pay invoices by their stated due date.
        </p>
        <p>
          The package and add-on prices displayed at checkout apply to that
          order. Labe Launch is currently $1,999 once. With Launch, custom
          business email, a professional email template, and email automation
          are currently $599; Google Business Profile setup and optimisation is
          currently $349; and AI receptionist setup is currently $499. Labe
          Growth is currently charged as a $2,999 setup payment and a $149
          monthly service beginning after a 7-day setup period. Growth includes
          custom business email, a professional email template, email
          automation, Google Business Profile setup and optimisation, AI
          receptionist setup, AI live chat setup, and Stripe payment setup.
          Labe&apos;s AI receptionist setup and standard ongoing configuration are
          included with an active Growth service. Labe currently uses Hey Jodie for this
          service unless another provider is requested or agreed. We may use a
          different suitable provider for new customers and may recommend or
          arrange a provider change for an existing customer where reasonably
          necessary. We will explain any material change, obtain the
          customer&apos;s approval before migrating a customer-controlled
          account, and confirm any changed provider fees before proceeding.
          With Launch, the AI receptionist setup is currently $499 once. In
          both cases, the customer creates or authorises the provider account
          and pays the provider&apos;s subscription, usage charges, taxes, and
          other fees directly. Advertising spend and any usage above an agreed
          allowance are separate. Promotional prices apply only while the
          relevant offer is displayed and available at checkout.
        </p>
        <p>
          By purchasing Labe Growth, you authorise Labe and its payment
          processor, Stripe, to charge the payment method used at checkout $149
          each month, beginning 7 days after the setup payment, until the
          recurring service is cancelled in accordance with these terms. If a
          recurring payment fails, Stripe may retry the charge and we will send
          you a reminder with a way to update your payment method or contact us.
          We will give you at least 14 days from our first written reminder to
          resolve the payment before pausing Growth-only support, upkeep, or
          managed features. We will not remove your website or customer-owned
          accounts merely because a recurring payment is overdue.
        </p>
        <p>
          If a Growth payment remains unpaid for 30 days after its due date, we
          may begin the cancellation and wind-down process after written notice.
          We will explain which managed services will be paused or ended, provide
          reasonable handover assistance, and help identify any provider-side
          steps needed to keep or cancel customer-owned accounts. Third-party
          charges may continue until the customer cancels them with the relevant
          provider.
        </p>
        <p>
          We will give reasonable advance notice of any proposed change to the
          recurring service price. A price change will not apply before the
          notified date, and you may cancel before it takes effect without a
          cancellation penalty.
        </p>
        <p>
          We may pause work or withhold launch, transfer, or final files while
          an invoice is overdue, after giving you reasonable notice. This does
          not affect any rights you have under applicable law.
        </p>
      </>
    ),
  },
  {
    title: "8. Domains and third-party services",
    content: (
      <>
        <p>
          Domain registration or renewal, advertising spend, and third-party
          usage or subscription charges are separate unless your proposal
          expressly includes them. Third-party services may include hosting,
          domain registrars, email, analytics, advertising platforms, AI
          providers, booking systems, and other integrations.
        </p>
        <p>
          Where practical, third-party accounts are created in, or transferred
          to, your business name and under your control. This includes your
          domain, email, Google Business Profile, Stripe, AI receptionist, AI
          chat, email automation, and advertising accounts. You are responsible
          for provider charges on those accounts unless we agree otherwise in
          writing.
        </p>
        <p>
          Those services are also governed by their providers&apos; terms,
          availability, pricing, and privacy practices. We are not responsible
          for a third-party change, suspension, outage, or decision outside our
          reasonable control, but we will provide reasonable assistance where
          that assistance is included in your service or separately agreed.
        </p>
        <p>
          Where Labe configures an AI receptionist, you remain responsible for
          maintaining the provider account, paying the provider, keeping your
          business information accurate, and using the service lawfully. Labe
          may assist with configuration but does not control the provider&apos;s
          pricing, service availability, call quality, features, or data
          handling. Separate telco costs may apply for phone numbers, call
          forwarding, or routing. We will explain any expected setup costs
          before proceeding.
        </p>
      </>
    ),
  },
  {
    title: "9. AI chat and AI-assisted calls",
    content: (
      <>
        <p>
          Our website may provide AI-assisted chat or telephone services for
          general information, enquiry handling, and booking assistance. We
          will identify an automated assistant as AI. AI responses may be
          incomplete, inaccurate, or unavailable and must not be relied on as
          legal, financial, medical, accounting, or other professional advice.
        </p>
        <p>
          Prices, scope, availability, deadlines, and commitments are only
          binding when confirmed by Labe in writing. An AI assistant cannot
          enter into an agreement, approve a refund, vary these terms, or make
          a binding promise on our behalf.
        </p>
        <p>
          Calls may be transcribed or recorded only where notice is provided
          and any consent required by law has been obtained. You may ask to
          speak or correspond with a person instead. You must not knowingly use
          our AI services to submit unlawful, harmful, deceptive, confidential,
          or security-sensitive material.
        </p>
      </>
    ),
  },
  {
    title: "10. Intellectual property",
    content: (
      <>
        <p>
          You retain ownership of the material you supply. You give us
          permission to use that material to provide the services.
        </p>
        <p>
          Once all project invoices are paid, Labe assigns to you the
          intellectual property rights that Labe owns in the project-specific
          deliverables created exclusively for your business. You own and may
          use, operate, publish, and modify the completed website, subject to
          the exclusions below.
        </p>
        <p>
          This means your finished website, brand content, and materials created
          specifically for your business are yours. An active Growth service is
          ongoing support and managed upkeep; it is not a rental of your website.
        </p>
        <p>
          Labe retains ownership of its pre-existing materials, reusable
          templates, components, methods, systems, know-how, and tools. We
          grant you an ongoing, worldwide, royalty-free licence to use those
          elements as incorporated into your completed website. This licence
          allows the finished website to continue operating and to be modified
          for your business, but does not transfer ownership of Labe&apos;s
          underlying reusable materials.
        </p>
        <p>
          Third-party software, fonts, photographs, and other licensed
          materials remain subject to their respective licence terms.
        </p>
      </>
    ),
  },
  {
    title: "11. Portfolio use",
    content: (
      <p>
        Unless you ask us not to in writing, we may identify your business and
        display the completed public-facing work in our portfolio, website,
        proposals, and social media. We will not disclose your confidential
        information for this purpose.
      </p>
    ),
  },
  {
    title: "12. Ongoing services and cancellation",
    content: (
      <>
        <p>
          Any recurring service continues for the period and at the price
          stated in your proposal. You may request cancellation of a Labe
          subscription or ongoing add-on at any time by emailing{" "}
          <a href="mailto:hello@labe.com.au">hello@labe.com.au</a>. For a
          Labe subscription billed through Stripe, we will provide a secure
          Stripe cancellation link and confirm the effective cancellation date.
          Unless a different notice period is agreed, cancellation takes effect
          at the end of the current paid billing period.
        </p>
        <p>
          We will provide reasonable assistance to wind down connected
          services, hand over relevant access, and address outstanding items.
          Third-party subscriptions, usage services, and advertising campaigns
          may also need to be stopped or cancelled through the relevant
          provider account. We will help identify those steps, but provider
          charges can continue until the provider-side cancellation takes
          effect.
        </p>
        <p>
          Cancelling Growth does not remove ownership of your website or
          customer-owned accounts. At the end of the paid period, ongoing Labe
          support, managed upkeep, and Growth-only features may end unless we
          agree otherwise in writing.
        </p>
        <p>
          If you cancel a project after work has begun, you must pay for work
          properly completed and non-cancellable costs reasonably incurred up
          to the cancellation date. We will refund any amount paid for work we
          will not perform, less those amounts, subject always to your rights
          under applicable law.
        </p>
      </>
    ),
  },
  {
    title: "13. Results and business decisions",
    content: (
      <p>
        We work to improve how your business presents itself, receives
        enquiries, and follows up with potential customers. Actual results
        depend on factors outside our control, including your offer, market,
        location, competition, advertising budget, customer demand, and how
        quickly leads are handled. We do not guarantee a particular number of
        visitors, enquiries, bookings, sales, search rankings, or advertising
        results.
      </p>
    ),
  },
  {
    title: "14. Australian Consumer Law",
    content: (
      <>
        <p>
          Nothing in these terms excludes, restricts, or modifies a consumer
          guarantee, right, or remedy that cannot lawfully be excluded,
          including under the Australian Consumer Law.
        </p>
        <p>
          Our services come with guarantees that cannot be excluded under the
          Australian Consumer Law. Where those guarantees apply, you may be
          entitled to remedies if a service does not meet them.
        </p>
      </>
    ),
  },
  {
    title: "15. Liability",
    content: (
      <>
        <p>
          To the extent permitted by law, neither party is liable to the other
          for indirect or consequential loss that was not reasonably
          foreseeable when the agreement was made.
        </p>
        <p>
          Nothing in these terms limits liability for fraud, wilful misconduct,
          breach of confidentiality, infringement of another person&apos;s
          intellectual property rights, or any liability that cannot lawfully
          be limited or excluded.
        </p>
      </>
    ),
  },
  {
    title: "16. Confidentiality",
    content: (
      <p>
        Each party must take reasonable steps to protect confidential
        information received from the other and use it only for the project,
        except where disclosure is authorised, required to provide the
        services, already public through no breach, or required by law.
      </p>
    ),
  },
  {
    title: "17. Website use",
    content: (
      <>
        <p>
          You may use this website for lawful purposes and to learn about or
          enquire about Labe&apos;s services. You must not interfere with the
          website, attempt unauthorised access, introduce malicious code,
          scrape it unreasonably, or use its content in a way that infringes
          our or another person&apos;s rights.
        </p>
        <p>
          General information on this website is not legal, accounting,
          financial, or other professional advice.
        </p>
      </>
    ),
  },
  {
    title: "18. Ending an agreement",
    content: (
      <p>
        Either party may end an agreement if the other materially breaches it
        and does not remedy that breach within a reasonable period after
        written notice. A party may also end an agreement immediately where
        continuing it would be unlawful or expose people, systems, or data to a
        material security risk. Rights and obligations intended to continue
        after termination remain in effect.
      </p>
    ),
  },
  {
    title: "19. Disputes",
    content: (
      <p>
        If a concern arises, please contact us first so we can try to resolve it
        promptly and fairly. Both parties agree to communicate in good faith
        and attempt to resolve a dispute before starting court proceedings,
        except where urgent relief is needed or this requirement would
        interfere with a right under applicable law.
      </p>
    ),
  },
  {
    title: "20. Governing law",
    content: (
      <p>
        These terms are governed by the laws of South Australia and the
        Commonwealth of Australia. The parties submit to the courts with
        jurisdiction in South Australia, subject to any rights that permit a
        claim to be brought elsewhere.
      </p>
    ),
  },
  {
    title: "21. Changes to these terms",
    content: (
      <p>
        We may update these website terms from time to time. The current
        version will be published on this page with its effective date. Changes
        will not retrospectively alter an agreed project unless both parties
        agree or the change is required by law.
      </p>
    ),
  },
] as const;

export default function TermsPage() {
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
                Clear expectations
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
                Terms of service
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Straightforward terms for using this website and working with
                Labe.
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
                    Have a question about these terms?
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
