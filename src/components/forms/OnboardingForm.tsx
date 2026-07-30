"use client";

import { DragEvent, FormEvent, useRef, useState } from "react";
import { siCloudflare, siFacebook, siGmail, siGodaddy, siGoogle, siGooglecalendar, siGooglesheets, siInstagram, siMyob, siNamecheap, siPaypal, siProtonmail, siShopify, siSquare, siSquarespace, siStripe, siTiktok, siVodafone, siWhatsapp, siWix, siWordpress, siXero, siYoutube, siZoho } from "simple-icons";

type OnboardingFormProps = {
  token: string;
  name: string;
  business: string;
  email: string;
  phone: string;
  website: string;
  plan: "launch" | "growth";
};

const inputClassName =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

export function OnboardingForm({
  token,
  name,
  business,
  email,
  phone,
  website,
  plan,
}: OnboardingFormProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function addPhotos(files: File[]) {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const oversized = imageFiles.find((file) => file.size > 5 * 1024 * 1024);

    if (oversized) {
      setStatus("error");
      setMessage(`“${oversized.name}” is over the 5 MB limit. Please choose a smaller photo.`);
      return;
    }

    const nextPhotos = [...photos, ...imageFiles].slice(0, 5);
    setPhotos(nextPhotos);
    setStatus("idle");
    setMessage("");
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    addPhotos(Array.from(event.dataTransfer.files));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("token", token);
    photos.forEach((photo) => formData.append("photos", photo));

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) throw new Error(data.message || "Please try again.");

      setStatus("sent");
      setMessage(data.message || "Thanks—your onboarding has been received.");
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-[1.75rem] border border-emerald-200 bg-emerald-50 p-7 text-center sm:p-10">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-emerald-700">
          Onboarding received
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950">
          You&apos;re all set for now.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">
          {message} Max will review your details and get in touch if anything else is needed.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" />
      <input name="plan" type="hidden" value={plan} />

      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-start gap-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">1</span>
          <div>
            <h2 className="text-xl font-black tracking-[-0.03em] text-slate-950">The essentials</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">Confirm the details we will use to get your project moving.</p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="Your name" name="name" defaultValue={name} required />
          <Field label="Business name" name="business" defaultValue={business} required />
          <Field label="Personal phone number" name="phone" defaultValue={phone} required />
          <Field label="Business phone number (if you have one)" name="businessPhone" placeholder="The number customers should call" />
          <Field label="Personal email" name="email" type="email" defaultValue={email} required />
          <Field label="Business email (if you have one)" name="publicEmail" type="email" placeholder="e.g. hello@yourbusiness.com.au" />
          <Field label="Business address (only if public)" name="publicAddress" placeholder="e.g. suburb, or full shop address" />
          <Field label="Main service area" name="serviceArea" placeholder="e.g. Adelaide metro and surrounding suburbs" required />
          <Field label="ABN" name="abn" placeholder="e.g. 12 345 678 901" />
          <Field label="ACN (if applicable)" name="acn" placeholder="e.g. 123 456 789" />
          <div className="sm:col-span-2"><RadioGroup label="Where are you starting from?" name="websiteStatus" required options={[
            ["new", "I need a brand-new website", "We will help you choose and set up the right web address."],
            ["existing", "I have a website that needs improving", "Share the link below and tell us what you would like to change."],
            ["replacement", "I have a website I need to update and move to a new domain", "Share the current website and the domain you would like to use."],
          ]} /></div>
          <Field label="Current website address (if you have one)" name="website" defaultValue={website} placeholder="e.g. https://yourbusiness.com.au" />
          <Field label="Preferred web address for your new site" name="preferredDomain" placeholder="e.g. yourbusiness.com.au" />
          <div className="sm:col-span-2"><RadioGroup label="Do you already own your domain or preferred web address?" name="domainOwnership" required options={[
            ["yes", "Yes, I already own it", "Great—we will let you know the safe way to connect it."],
            ["no", "No, I need help getting it", "We can help you choose and register the right address."],
            ["unsure", "I am not sure", "That is completely fine—we will check it with you."],
          ]} /></div>
          <div className="sm:col-span-2"><ProviderPicker /></div>
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-start gap-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">2</span>
          <div>
            <h2 className="text-xl font-black tracking-[-0.03em] text-slate-950">Your business</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">Tell us what makes a good customer and enquiry for you. Short answers are completely fine.</p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <TextArea label="What services do you offer?" name="services" placeholder="List the jobs or services you want more of." required />
          <TextArea label="What do you need from a customer before you can quote or start work?" name="customerDetails" placeholder="For example: photos, measurements, location, budget, preferred dates…" required />
          <TextArea label="What is taking too much time out of your day?" name="painPoints" placeholder="For example: missed calls, repeat questions, chasing quotes, booking, admin…" />
          <TextArea label="What would make this project a win for you?" name="goals" placeholder="For example: more quote-ready enquiries, easier payments, less admin…" required />
          <TextArea label="Pricing and payment approach" name="pricingAndPayments" placeholder="Typical starting prices, deposits, payment timing, finance options, or anything customers should understand before booking." />
          <TextArea label="Service and travel boundaries" name="serviceBoundaries" placeholder="Jobs you do not take, suburbs or distances you will not travel, minimum job values, or other limits." />
          <TextArea label="Customer FAQs" name="customerFaqs" placeholder="The questions customers ask most often—and the answers you would like them to receive." />
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-start gap-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">3</span>
          <div>
            <h2 className="text-xl font-black tracking-[-0.03em] text-slate-950">Your workflow and tools</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">This helps us fit the setup around the way you already operate, rather than adding more work.</p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <p className="text-base font-black tracking-[-0.02em] text-slate-950">Business email &amp; automation</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">Let us know what you already use and what you would like us to set up, improve, or automate.</p>
            <div className="mt-5 space-y-5">
              <RadioGroup label="What best describes your business email?" name="businessEmailSetup" required options={[
                ["new", "I need a new professional business email", "We will set it up around your business and domain."],
                ["existing", "I already have a business email", "Add the address in the essentials section if you have not already."],
                ["unsure", "I am not sure what I need", "That is okay—we will recommend the simplest useful option."],
              ]} />
              <RadioGroup label="Do you have an email template you would like improved?" name="emailTemplateStatus" required options={[
                ["new", "No—I need a professional email template", "We will create one you can use for day-to-day communication."],
                ["upgrade", "Yes—I have one I would like upgraded", "We will make it feel more professional and on-brand."],
                ["not-now", "I do not need an email template right now", "No problem—we can keep this aside for now."],
              ]} />
              <RadioGroup label="What is your current email automation setup?" name="emailAutomationStatus" required options={[
                ["new", "I would like automated emails set up", "We will help choose the useful emails for your customer journey."],
                ["existing", "I already use automated emails", "Tell us below what is working and what needs improving."],
                ["not-now", "I do not use email automation yet", "That is fine—we will explain the options without overcomplicating it."],
              ]} />
              <TextArea label="Which staff members need a business email?" name="staffBusinessEmails" placeholder="List each person’s name, role, and preferred email address—for example: Sam, Office Manager, sam@yourbusiness.com.au. Leave blank if it is just you." />
              <TextArea label="Anything we should know about your emails or automation?" name="emailAutomationNotes" placeholder="For example: enquiry replies, quote follow-up, booking reminders, invoice emails, existing templates, or a provider you already use." />
            </div>
          </div>
          <TextArea label="Walk us through a typical customer journey" name="workflowSteps" placeholder="From first enquiry to quote, booking, payment, and completing the job—what happens now?" required />
          <ToolPicker />
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-start gap-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">4</span>
          <div>
            <h2 className="text-xl font-black tracking-[-0.03em] text-slate-950">AI receptionist and calls</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">Tell us how you want calls handled. If you are unsure, choose the closest option and we will guide you.</p>
          </div>
        </div>
        <div className="mt-6 space-y-5">
          <RadioGroup
            label="How would you like the AI receptionist to work?"
            name="receptionistSetup"
            required
            options={[
              ["dedicated", "A dedicated AI business number", "Customers call a separate number answered by the AI receptionist."],
              ["missed-calls", "Answer missed calls on my usual business number", "The AI receptionist steps in when you cannot answer your existing number."],
              ["discuss", "I would like Labe to recommend the best setup", "We will talk through your call flow before anything is connected."],
              ["not-now", "I am not adding an AI receptionist right now", "No problem—we will keep this part aside for now."],
            ]}
          />
          <div className="grid gap-4 sm:grid-cols-2 sm:items-end">
            <Field label="Current business call number (if applicable)" name="businessCallNumber" placeholder="e.g. 08 0000 0000" />
            <Field label="Usual business hours for calls" name="businessHours" placeholder="e.g. Mon–Fri, 7:30am–5pm" />
          </div>
          <TextArea label="Who is involved in answering calls, enquiries, or admin?" name="teamAndContacts" placeholder="Names, roles, who should receive new leads, and who can approve urgent decisions." />
          <TextArea label="What should the AI receptionist help callers with?" name="receptionistTasks" placeholder="For example: answer common questions, capture job details, qualify leads, send booking links, take messages, transfer urgent calls…" />
          <TextArea label="Which calls are urgent, and where should they go?" name="callRouting" placeholder="For example: existing customer emergencies to Sam by text; new quote requests to the office; everything else captured for follow-up." />
          <TextArea label="Anything the receptionist must always know or never say?" name="receptionistNotes" placeholder="For example: service boundaries, pricing rules, safety issues, tone of voice, jobs you do not take…" />
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-start gap-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">5</span>
          <div>
            <h2 className="text-xl font-black tracking-[-0.03em] text-slate-950">Google &amp; Meta ads</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">If ads are part of your package, let us know what you already have. If not, you can skip this section.</p>
          </div>
        </div>
        <div className="mt-6 space-y-5">
          <RadioGroup
            label="Do you already have a Google Ads account?"
            name="googleAdsAccount"
            options={[
              ["new", "No, I need one set up", "We will guide you through creating it in your name."],
              ["existing", "Yes, it is already set up", "We will review what is there and help connect the right access."],
              ["unsure", "I am not sure", "That is completely fine—we will help work it out."],
              ["not-now", "Google Ads is not part of my package", "You can add it later if you need it."],
            ]}
          />
          <RadioGroup
            label="Do you already have a Meta ads account?"
            name="metaAdsAccount"
            options={[
              ["new", "No, I need one set up", "We will guide you through creating it in your name."],
              ["existing", "Yes, it is already set up", "We will review what is there and help connect the right access."],
              ["unsure", "I am not sure", "That is completely fine—we will help work it out."],
              ["not-now", "Meta ads are not part of my package", "You can add them later if you need them."],
            ]}
          />
          <TextArea label="Where should your ads be shown?" name="advertisingLocations" placeholder="Suburbs, postcodes, regions, or areas you do and do not want to target." />
          <TextArea label="Which services should ads promote first?" name="advertisingServices" placeholder="List your highest-value or most in-demand services, offers, or jobs you want more of." />
          <Field label="Rough monthly advertising budget" name="advertisingBudget" placeholder="e.g. $500 per month, or 'not sure yet'" />
          <TextArea label="Anything we should know about your advertising?" name="advertisingNotes" placeholder="For example: current campaigns, previous results, your usual ad spend, a current agency, or goals you would like help with." />
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-start gap-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-black text-white">6</span>
          <div>
            <h2 className="text-xl font-black tracking-[-0.03em] text-slate-950">Your look and content</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">Send what you have. You can add more later, and nothing needs to be perfect.</p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <TextArea label="A little about your business" name="businessStory" placeholder="How long you have been operating, who you help, what you are known for…" />
          <div>
            <p className="text-sm font-bold text-slate-800">Social links and profiles <span className="font-normal text-slate-500">(optional)</span></p>
            <p className="mt-1 text-xs leading-5 text-slate-500">Paste any links you have. Empty boxes are completely fine.</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <SocialLinkField label="Facebook" name="socialFacebook" icon={siFacebook} placeholder="facebook.com/yourbusiness" />
              <SocialLinkField label="Instagram" name="socialInstagram" icon={siInstagram} placeholder="instagram.com/yourbusiness" />
              <SocialLinkField label="LinkedIn" name="socialLinkedIn" fallback="in" fallbackClassName="bg-[#0A66C2]" placeholder="linkedin.com/company/yourbusiness" />
              <SocialLinkField label="TikTok" name="socialTiktok" icon={siTiktok} placeholder="tiktok.com/@yourbusiness" />
              <SocialLinkField label="YouTube" name="socialYoutube" icon={siYoutube} placeholder="youtube.com/@yourbusiness" />
              <SocialLinkField label="Google Business Profile" name="socialGoogleBusiness" icon={siGoogle} placeholder="Google Business Profile link" />
              <SocialLinkField label="WhatsApp" name="socialWhatsapp" icon={siWhatsapp} placeholder="wa.me/yourbusiness" />
              <SocialLinkField label="Another link" name="socialOther" fallback="+" fallbackClassName="bg-slate-700" placeholder="Any other profile or directory" />
            </div>
          </div>
          <ColourPicker />
          <div>
            <p className="text-sm font-bold text-slate-800">Upload photos or your logo <span className="font-normal text-slate-500">(optional)</span></p>
            <div
              onDragOver={(event) => event.preventDefault()}
              onDrop={handleDrop}
              className="mt-2 rounded-2xl border border-dashed border-blue-300 bg-blue-50/70 p-5 text-center sm:p-7"
            >
              <input
                ref={fileInputRef}
                id="project-photos"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                multiple
                className="sr-only"
                onChange={(event) => {
                  addPhotos(Array.from(event.target.files || []));
                  event.target.value = "";
                }}
              />
              <p className="text-sm font-bold text-slate-900">Drag photos here, or choose them from your device.</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Up to 5 images · 5 MB each · your phone&apos;s photo library and Files app are both supported.</p>
              <button type="button" onClick={() => fileInputRef.current?.click()} className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-white px-5 text-sm font-black text-blue-700 shadow-sm ring-1 ring-blue-200 transition hover:bg-blue-100">Choose photos</button>
            </div>
            {photos.length > 0 && (
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {photos.map((photo, index) => (
                  <li key={`${photo.name}-${photo.lastModified}-${index}`} className="flex items-center justify-between gap-3 rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-700">
                    <span className="min-w-0 truncate font-semibold">{photo.name}</span>
                    <button type="button" onClick={() => setPhotos(photos.filter((_, photoIndex) => photoIndex !== index))} className="shrink-0 font-bold text-blue-700 underline underline-offset-4">Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <TextArea label="Anything else you would like us to know?" name="assetLink" placeholder="You can add links, notes, or leave this blank for now." />
        </div>
      </section>

      <section className="rounded-[1.5rem] border border-blue-200 bg-blue-50 p-5 sm:p-7">
        <p className="text-sm font-black text-slate-950">A quick note on access</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">Please do not share passwords here. After we review your onboarding, we will let you know the safe way to provide any account access we need.</p>
      </section>

      <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">
        <input name="confirm" type="checkbox" required className="mt-1 h-4 w-4 accent-blue-600" />
        <span>I confirm these details are accurate to the best of my knowledge and Labe may use them to prepare my project.</span>
      </label>

      {status === "error" && <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{message}</p>}

      <button disabled={status === "sending"} className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-70 sm:w-auto" type="submit">
        {status === "sending" ? "Sending your onboarding…" : "Send my onboarding"}
      </button>
    </form>
  );
}

function Field({ label, name, type = "text", ...props }: { label: string; name: string; type?: string; defaultValue?: string; placeholder?: string; required?: boolean }) {
  return <label className="flex h-full flex-col text-sm font-bold text-slate-800"><span className="sm:min-h-10">{label}</span><input name={name} type={type} className={`${inputClassName} mt-2 sm:mt-auto`} {...props} /></label>;
}

function TextArea({ label, name, ...props }: { label: string; name: string; placeholder?: string; required?: boolean }) {
  return <label className="block text-sm font-bold text-slate-800">{label}<textarea name={name} rows={4} className={`${inputClassName} mt-2 resize-y`} {...props} /></label>;
}

function ToolPicker() {
  type Tool = {
    label: string;
    icon?: { svg: string; hex: string };
    microsoft?: boolean;
    logo?: string;
    logoClassName?: string;
    logoUnselectedClassName?: string;
    selectedMark?: string;
    badge?: string;
    badgeClassName?: string;
  };
  const noTools = "None yet — starting fresh";
  const tools: Tool[] = [
    { label: "Xero", icon: siXero },
    { label: "MYOB", icon: siMyob },
    { label: "hipages", logo: "/tool-logos/hipages.ico", selectedMark: "hi" },
    { label: "AirTasker", logo: "/tool-logos/airtasker.ico" },
    { label: "Gmail / Google Workspace", icon: siGmail },
    { label: "Google Calendar", icon: siGooglecalendar },
    { label: "Google Sheets", icon: siGooglesheets },
    { label: "Outlook / Microsoft 365", microsoft: true },
    { label: "CRM", badge: "CRM", badgeClassName: "bg-violet-600" },
    { label: "ServiceM8", logo: "/tool-logos/servicem8.png", selectedMark: "M8" },
    { label: "Tradify", logo: "/tool-logos/tradify.png" },
    { label: "simPRO", logo: "/tool-logos/simpro.ico", selectedMark: "sP" },
    { label: "AroFlo", logo: "/tool-logos/aroflo.png", selectedMark: "AF" },
    { label: "Fergus", logo: "/tool-logos/fergus.webp", logoClassName: "w-8", logoUnselectedClassName: "rounded-sm bg-[#00A86B] p-0.5" },
    { label: noTools, badge: "—", badgeClassName: "bg-slate-400" },
  ];
  const [selected, setSelected] = useState<string[]>([]);
  const [other, setOther] = useState("");
  const value = [...selected, other.trim()].filter(Boolean).join(", ");

  function toggle(tool: string) {
    if (tool === noTools) {
      setSelected((current) => current.includes(noTools) ? [] : [noTools]);
      return;
    }

    setSelected((current) => current.includes(tool)
      ? current.filter((item) => item !== tool)
      : [...current.filter((item) => item !== noTools), tool]);
  }

  return (
    <fieldset>
      <legend className="text-sm font-bold text-slate-800">What business tools do you already use?</legend>
      <p className="mt-1 text-xs leading-5 text-slate-500">Select everything that applies, or choose “None yet” if you are starting fresh.</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {tools.map((tool) => {
          const isSelected = selected.includes(tool.label);
          return (
            <button
              key={tool.label}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggle(tool.label)}
              className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold transition ${isSelected ? "border-blue-600 bg-blue-600 text-white shadow-sm" : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"}`}
            >
              {tool.selectedMark && isSelected ? (
                <span aria-hidden="true" className="flex h-5 min-w-5 shrink-0 items-center justify-center text-[9px] font-black tracking-[-0.08em] text-white">{tool.selectedMark}</span>
              ) : tool.microsoft ? (
                <span aria-hidden="true" className="grid h-5 w-5 shrink-0 grid-cols-2 gap-px">
                  {["bg-[#f25022]", "bg-[#7fba00]", "bg-[#00a4ef]", "bg-[#ffb900]"].map((colour) => (
                    <span key={colour} className={`block ${isSelected ? "bg-white" : colour}`} />
                  ))}
                </span>
              ) : tool.logo ? (
                <span aria-hidden="true" className={`flex h-5 w-5 shrink-0 items-center justify-center ${tool.logoClassName || ""} ${isSelected ? "" : tool.logoUnselectedClassName || ""}`}>
                  <img src={tool.logo} alt="" className={`h-full w-full object-contain ${isSelected ? "brightness-0 invert" : ""}`} />
                </span>
              ) : tool.icon ? (
                <span aria-hidden="true" className="flex h-5 w-5 shrink-0 items-center justify-center [&>svg]:h-4 [&>svg]:w-4 [&>svg]:fill-current" style={{ color: isSelected ? "#FFFFFF" : `#${tool.icon.hex}` }} dangerouslySetInnerHTML={{ __html: tool.icon.svg }} />
              ) : (
                <span aria-hidden="true" className={`flex h-5 min-w-5 shrink-0 items-center justify-center rounded-md px-1 text-[9px] font-black ${isSelected ? "bg-white/20 text-white" : `text-white ${tool.badgeClassName}`}`}>{tool.badge}</span>
              )}
              {tool.label}
            </button>
          );
        })}
      </div>
      <label className="mt-4 block text-sm font-bold text-slate-800">
        Anything else you use?
        <input
          value={other}
          onChange={(event) => {
            setOther(event.target.value);
            if (event.target.value.trim()) setSelected((current) => current.filter((item) => item !== noTools));
          }}
          placeholder="Add any other apps, job systems, booking tools, or software"
          className={`${inputClassName} mt-2`}
        />
      </label>
      <input name="currentTools" type="hidden" value={value} />
    </fieldset>
  );
}

function ProviderPicker() {
  type Provider = {
    label: string;
    group: string;
    icon?: { svg: string; hex: string };
    logo?: string;
    microsoft?: boolean;
    selectedMark?: string;
    fallback: string;
    fallbackClassName: string;
  };
  const notSure = "I'm not sure yet";
  const providers: Provider[] = [
    { label: "GoDaddy", group: "Website, domain & hosting", icon: siGodaddy, fallback: "GD", fallbackClassName: "bg-emerald-600" },
    { label: "Crazy Domains", group: "Website, domain & hosting", logo: "https://www.google.com/s2/favicons?domain=crazydomains.com.au&sz=128", fallback: "CD", fallbackClassName: "bg-purple-600" },
    { label: "Namecheap", group: "Website, domain & hosting", icon: siNamecheap, fallback: "N", fallbackClassName: "bg-orange-600" },
    { label: "WordPress", group: "Website, domain & hosting", icon: siWordpress, fallback: "W", fallbackClassName: "bg-sky-700" },
    { label: "Wix", group: "Website, domain & hosting", icon: siWix, fallback: "W", fallbackClassName: "bg-slate-900" },
    { label: "Squarespace", group: "Website, domain & hosting", icon: siSquarespace, fallback: "S", fallbackClassName: "bg-slate-700" },
    { label: "Shopify", group: "Website, domain & hosting", icon: siShopify, fallback: "S", fallbackClassName: "bg-emerald-600" },
    { label: "VentraIP", group: "Website, domain & hosting", logo: "https://www.google.com/s2/favicons?domain=ventraip.com.au&sz=128", fallback: "V", fallbackClassName: "bg-blue-600" },
    { label: "Cloudflare", group: "Website, domain & hosting", icon: siCloudflare, fallback: "CF", fallbackClassName: "bg-amber-500" },
    { label: "Square", group: "Payments", icon: siSquare, fallback: "□", fallbackClassName: "bg-slate-800" },
    { label: "PayPal", group: "Payments", icon: siPaypal, fallback: "P", fallbackClassName: "bg-blue-700" },
    { label: "Stripe", group: "Payments", icon: siStripe, fallback: "S", fallbackClassName: "bg-indigo-600" },
    { label: "Tyro", group: "Payments", logo: "https://www.google.com/s2/favicons?domain=tyro.com&sz=128", fallback: "T", fallbackClassName: "bg-emerald-700" },
    { label: "Zeller", group: "Payments", logo: "https://www.google.com/s2/favicons?domain=myzeller.com&sz=128", selectedMark: "Z", fallback: "Z", fallbackClassName: "bg-orange-500" },
    { label: "Google Workspace", group: "Business email", icon: siGoogle, fallback: "G", fallbackClassName: "bg-blue-600" },
    { label: "Microsoft 365", group: "Business email", microsoft: true, fallback: "M", fallbackClassName: "bg-indigo-600" },
    { label: "Telstra / BigPond email", group: "Business email", logo: "https://www.google.com/s2/favicons?domain=telstra.com.au&sz=128", fallback: "T", fallbackClassName: "bg-blue-700" },
    { label: "Zoho Mail", group: "Business email", icon: siZoho, fallback: "Z", fallbackClassName: "bg-red-600" },
    { label: "Fastmail", group: "Business email", logo: "https://www.google.com/s2/favicons?domain=fastmail.com&sz=128", selectedMark: "FM", fallback: "F", fallbackClassName: "bg-violet-600" },
    { label: "Proton Mail", group: "Business email", icon: siProtonmail, fallback: "P", fallbackClassName: "bg-indigo-700" },
    { label: "iCloud Mail", group: "Business email", logo: "https://www.google.com/s2/favicons?domain=icloud.com&sz=128", selectedMark: "i", fallback: "i", fallbackClassName: "bg-sky-500" },
    { label: "Yahoo Mail", group: "Business email", logo: "https://www.google.com/s2/favicons?domain=mail.yahoo.com&sz=128", selectedMark: "Y!", fallback: "Y", fallbackClassName: "bg-purple-700" },
    { label: "Telstra", group: "Phone & internet", logo: "https://www.google.com/s2/favicons?domain=telstra.com.au&sz=128", fallback: "T", fallbackClassName: "bg-blue-700" },
    { label: "Optus", group: "Phone & internet", logo: "https://www.google.com/s2/favicons?domain=optus.com.au&sz=128", selectedMark: "O", fallback: "O", fallbackClassName: "bg-yellow-500" },
    { label: "Vodafone", group: "Phone & internet", icon: siVodafone, fallback: "V", fallbackClassName: "bg-red-600" },
    { label: notSure, group: "Not sure yet", fallback: "?", fallbackClassName: "bg-slate-400" },
  ];
  const groups = ["Website, domain & hosting", "Payments", "Business email", "Phone & internet", "Not sure yet"];
  const [selected, setSelected] = useState<string[]>([]);
  const [other, setOther] = useState("");
  const value = [...selected, other.trim()].filter(Boolean).join(", ");

  function toggle(provider: string) {
    if (provider === notSure) {
      setSelected((current) => current.includes(notSure) ? [] : [notSure]);
      return;
    }

    setSelected((current) => current.includes(provider)
      ? current.filter((item) => item !== provider)
      : [...current.filter((item) => item !== notSure), provider]);
  }

  return (
    <fieldset>
      <legend className="text-sm font-bold text-slate-800">Which providers do you currently use?</legend>
      <p className="mt-1 text-xs leading-5 text-slate-500">Select any domain, website, email, or phone providers you recognise. No passwords needed.</p>
      <div className="mt-4 space-y-5">
        {groups.map((group) => (
          <div key={group}>
            <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-slate-500">{group}</p>
            <div className="flex flex-wrap gap-2">
              {providers.filter((provider) => provider.group === group).map((provider) => {
          const isSelected = selected.includes(provider.label);
          return (
            <button key={provider.label} type="button" aria-pressed={isSelected} onClick={() => toggle(provider.label)} className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold transition ${isSelected ? "border-blue-600 bg-blue-600 text-white shadow-sm" : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50"}`}>
              {provider.selectedMark && isSelected ? (
                <span aria-hidden="true" className="flex h-5 min-w-5 shrink-0 items-center justify-center text-[9px] font-black tracking-[-0.08em] text-white">{provider.selectedMark}</span>
              ) : provider.microsoft ? (
                <span aria-hidden="true" className="grid h-5 w-5 shrink-0 grid-cols-2 gap-px">
                  {["bg-[#f25022]", "bg-[#7fba00]", "bg-[#00a4ef]", "bg-[#ffb900]"].map((colour) => <span key={colour} className={`block ${isSelected ? "bg-white" : colour}`} />)}
                </span>
              ) : provider.logo ? (
                <span aria-hidden="true" className="flex h-5 w-5 shrink-0 items-center justify-center">
                  <img src={provider.logo} alt="" className={`h-full w-full object-contain ${isSelected ? "brightness-0 invert" : ""}`} />
                </span>
              ) : provider.icon ? (
                <span aria-hidden="true" className="flex h-5 w-5 shrink-0 items-center justify-center [&>svg]:h-4 [&>svg]:w-4 [&>svg]:fill-current" style={{ color: isSelected ? "#FFFFFF" : `#${provider.icon.hex}` }} dangerouslySetInnerHTML={{ __html: provider.icon.svg }} />
              ) : (
                <span aria-hidden="true" className={`flex h-5 min-w-5 shrink-0 items-center justify-center rounded-md px-1 text-[9px] font-black ${isSelected ? "bg-white/20 text-white" : `text-white ${provider.fallbackClassName}`}`}>{provider.fallback}</span>
              )}
              {provider.label}
            </button>
          );
              })}
            </div>
          </div>
        ))}
      </div>
      <label className="mt-4 block text-sm font-bold text-slate-800">
        Anything else you use?
        <input value={other} onChange={(event) => { setOther(event.target.value); if (event.target.value.trim()) setSelected((current) => current.filter((item) => item !== notSure)); }} placeholder="Another provider, host, email service, or phone system" className={`${inputClassName} mt-2`} />
      </label>
      <input name="currentProviders" type="hidden" value={value} />
    </fieldset>
  );
}

function RadioGroup({ label, name, options, required = false }: { label: string; name: string; required?: boolean; options: [string, string, string][] }) {
  return <fieldset>
    <legend className="text-sm font-bold text-slate-800">{label}</legend>
    <div className="mt-3 grid gap-2">
      {options.map(([value, title, description], index) => (
        <label key={value} className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5 text-sm transition hover:border-blue-300 hover:bg-blue-50/40">
          <input type="radio" name={name} value={value} required={required && index === 0} className="mt-1 h-4 w-4 shrink-0 accent-blue-600" />
          <span><span className="font-bold text-slate-900">{title}</span><span className="mt-0.5 block leading-5 text-slate-500">{description}</span></span>
        </label>
      ))}
    </div>
  </fieldset>;
}

function SocialLinkField({ label, name, placeholder, icon, fallback, fallbackClassName = "" }: { label: string; name: string; placeholder: string; icon?: { svg: string; hex: string }; fallback?: string; fallbackClassName?: string }) {
  return <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
    {icon ? <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center [&>svg]:h-5 [&>svg]:w-5 [&>svg]:fill-current" style={{ color: `#${icon.hex}` }} dangerouslySetInnerHTML={{ __html: icon.svg }} /> : <span aria-hidden="true" className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-black text-white ${fallbackClassName}`}>{fallback}</span>}
    <span className="min-w-0 flex-1"><span className="mb-0.5 block text-xs font-black text-slate-700">{label}</span><input name={name} type="url" placeholder={placeholder} className="w-full bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-300" /></span>
  </label>;
}

function ColourPicker() {
  type ColourRole = "primary" | "secondary" | "background" | "accent";

  const [colours, setColours] = useState({ primary: "", secondary: "", background: "", accent: "" });
  const [rgbColours, setRgbColours] = useState({ primary: "", secondary: "", background: "", accent: "" });
  const [active, setActive] = useState<ColourRole>("primary");
  const [advancedMode, setAdvancedMode] = useState<"hex" | "rgb">("hex");
  const slots = [
    { key: "primary", label: "Primary", hexName: "brandPrimaryHex", rgbName: "brandPrimaryRgb" },
    { key: "secondary", label: "Secondary", hexName: "brandSecondaryHex", rgbName: "brandSecondaryRgb" },
    { key: "background", label: "Background", hexName: "brandBackgroundHex", rgbName: "brandBackgroundRgb" },
    { key: "accent", label: "Accent", hexName: "brandAccentHex", rgbName: "brandAccentRgb" },
  ] as const;
  const palette = [
    ["#08090C", "Ink"], ["#1E293B", "Charcoal"], ["#64748B", "Slate"], ["#CBD5E1", "Mist"], ["#E7E5E4", "Stone"], ["#F7F5F0", "Warm white"], ["#FFFFFF", "White"],
    ["#C52020", "Golden vivid 01"], ["#DE7373", "Golden soft 01"], ["#C53520", "Golden vivid 22"], ["#DE8073", "Golden soft 22"], ["#C55720", "Golden vivid 09"], ["#DE9673", "Golden soft 09"], ["#C58F20", "Golden vivid 17"], ["#DEBA73", "Golden soft 17"],
    ["#C5B120", "Golden vivid 04"], ["#DED173", "Golden soft 04"], ["#A3C520", "Golden vivid 12"], ["#C8DE73", "Golden soft 12"], ["#6BC520", "Golden vivid 20"], ["#A4DE73", "Golden soft 20"], ["#49C520", "Golden vivid 07"], ["#8DDE73", "Golden soft 07"],
    ["#20C52E", "Golden vivid 15"], ["#73DE7C", "Golden soft 15"], ["#20C550", "Golden vivid 02"], ["#73DE92", "Golden soft 02"], ["#20C565", "Golden vivid 23"], ["#73DEA0", "Golden soft 23"], ["#20C588", "Golden vivid 10"], ["#73DEB6", "Golden soft 10"],
    ["#20C5BF", "Golden vivid 18"], ["#73DEDA", "Golden soft 18"], ["#20AAC5", "Golden vivid 05"], ["#73CCDE", "Golden soft 05"], ["#2072C5", "Golden vivid 13"], ["#73A8DE", "Golden soft 13"], ["#203BC5", "Golden vivid 21"], ["#7384DE", "Golden soft 21"],
    ["#2720C5", "Golden vivid 08"], ["#7773DE", "Golden soft 08"], ["#5E20C5", "Golden vivid 16"], ["#9B73DE", "Golden soft 16"], ["#8120C5", "Golden vivid 03"], ["#B173DE", "Golden soft 03"], ["#9620C5", "Golden vivid 24"], ["#BF73DE", "Golden soft 24"],
    ["#B820C5", "Golden vivid 11"], ["#D573DE", "Golden soft 11"], ["#C5209C", "Golden vivid 19"], ["#DE73C3", "Golden soft 19"], ["#C5207A", "Golden vivid 06"], ["#DE73AD", "Golden soft 06"], ["#C52042", "Golden vivid 14"], ["#DE7389", "Golden soft 14"],
  ];
  const neutralPalette = palette.slice(0, 7);
  const paintPairs = Array.from({ length: (palette.length - neutralPalette.length) / 2 }, (_, index) =>
    palette.slice(neutralPalette.length + index * 2, neutralPalette.length + index * 2 + 2));

  const previewBackground = colours.background || "#FFFFFF";
  const previewIsLight = isLightHex(previewBackground);
  const previewInk = previewIsLight ? "#0F172A" : "#FFFFFF";
  const previewMuted = previewIsLight ? "#CBD5E1" : "rgba(255,255,255,0.38)";
  const activeSlot = slots.find((slot) => slot.key === active) ?? slots[0];

  function setColour(key: ColourRole, value: string, moveToNext = false) {
    setColours((current) => ({ ...current, [key]: value }));
    const rgb = rgbFromHex(value);
    if (rgb) setRgbColours((current) => ({ ...current, [key]: rgb }));
    if (moveToNext) setActive(key === "primary" ? "secondary" : key === "secondary" ? "background" : "accent");
  }

  function setRgbColour(key: ColourRole, value: string) {
    setRgbColours((current) => ({ ...current, [key]: value }));
    const hex = hexFromRgb(value);
    if (hex) setColours((current) => ({ ...current, [key]: hex }));
  }

  function restoreDefaults() {
    setColours({ primary: "", secondary: "", background: "", accent: "" });
    setRgbColours({ primary: "", secondary: "", background: "", accent: "" });
    setActive("primary");
    setAdvancedMode("hex");
  }

  return (
    <fieldset className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-gradient-to-br from-slate-50 via-white to-blue-50 px-5 py-6 sm:px-7">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Design studio</p>
        <legend className="mt-2 text-2xl font-black tracking-[-0.04em] text-slate-950">Build your colour palette <span className="text-base font-normal text-slate-500">(optional)</span></legend>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Choose the colours that feel most like your business. You can change your mind at any time—there is no wrong combination.</p>
      </div>
      <div className="p-5 sm:p-7">
      <div>
        <p className="text-sm font-black text-slate-900">1. Choose a role</p>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {slots.map((slot) => (
          <button key={slot.key} type="button" aria-pressed={active === slot.key} onClick={() => setActive(slot.key)} className={`group flex items-center gap-3 rounded-2xl border p-3.5 text-left transition ${active === slot.key ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-200" : "border-slate-200 bg-white text-slate-900 hover:border-blue-300 hover:shadow-sm"}`}>
            <span className="h-11 w-11 shrink-0 rounded-2xl border-2 border-white/90 shadow-sm ring-1 ring-slate-200" style={{ backgroundColor: colours[slot.key] || "#E2E8F0" }} />
            <span className="min-w-0"><span className="block text-sm font-black">{slot.label}</span><span className={`mt-0.5 block truncate font-mono text-xs ${active === slot.key ? "text-blue-100" : "text-slate-500"}`}>{colours[slot.key] || "Choose a colour"}</span></span>
          </button>
        ))}
      </div>
      <div className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="text-sm font-black text-slate-950">2. Explore the paint book</p>
            <p className="text-xs font-bold text-blue-700">Adding to: {slots.find((slot) => slot.key === active)?.label}</p>
          </div>
          <p className="mt-1 text-xs leading-5 text-slate-500">Pick a neutral for a clean base, or browse rich colours with a lighter version beneath each one.</p>
          <div className="mt-5">
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">Neutrals</p>
            <div className="mt-2 grid grid-cols-7 gap-2">
              {neutralPalette.map(([colour, name]) => (
                <button key={colour} type="button" aria-label={`Set ${active} colour to ${name}`} onClick={() => setColour(active, colour, true)} className={`aspect-square rounded-xl border-2 transition duration-200 hover:scale-110 hover:shadow-md ${colours[active] === colour ? "border-slate-950 ring-4 ring-blue-200" : "border-white shadow-sm"}`} style={{ backgroundColor: colour }} />
              ))}
            </div>
          </div>
          <div className="mt-5">
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">Colour collection</p>
            <div className="mt-2 grid grid-cols-8 gap-2 sm:grid-cols-10">
              {paintPairs.map((pair) => (
                <div key={pair[0][0]} className="grid gap-2">
                  {pair.map(([colour, name]) => (
                    <button key={colour} type="button" aria-label={`Set ${active} colour to ${name}`} onClick={() => setColour(active, colour, true)} className={`aspect-square rounded-xl border-2 transition duration-200 hover:scale-110 hover:shadow-md ${colours[active] === colour ? "border-slate-950 ring-4 ring-blue-200" : "border-white shadow-sm"}`} style={{ backgroundColor: colour }} />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-500">Once you choose a primary colour, we will move you on to secondary, then background, then accent. You can click any role above to adjust it.</p>
        </div>
        <div className="relative overflow-hidden rounded-2xl bg-slate-950 p-5 text-white shadow-xl">
          <div aria-hidden="true" className="absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-70 blur-2xl" style={{ backgroundColor: colours.primary || "#2563EB" }} />
          <p className="relative text-xs font-black uppercase tracking-[0.16em] text-blue-200">Live palette preview</p>
          <div className="relative mt-4 overflow-hidden rounded-xl p-3 shadow-2xl" style={{ backgroundColor: previewBackground }}>
            <div className="h-2 rounded-full" style={{ backgroundColor: colours.primary || "#2563EB" }} />
            <div className="mt-4 h-2.5 w-3/4 rounded-full" style={{ backgroundColor: previewInk }} />
            <div className="mt-2 h-2 w-full rounded-full" style={{ backgroundColor: previewMuted }} />
            <div className="mt-2 h-2 w-4/5 rounded-full" style={{ backgroundColor: previewMuted }} />
            <div className="mt-4 h-7 w-24 rounded-lg" style={{ backgroundColor: colours.secondary || colours.primary || "#2563EB" }} />
            <div className="mt-4 h-2 w-14 rounded-full" style={{ backgroundColor: colours.accent || "#1E3A8A" }} />
          </div>
          <p className="relative mt-4 text-xs leading-5 text-slate-300">Your selections appear here as you go, so you can see how they work together.</p>
          <button type="button" onClick={restoreDefaults} className="relative mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-black text-white transition hover:bg-white/20"><span aria-hidden="true" className="text-base leading-none">↺</span> Restore fresh palette</button>
        </div>
      </div>
      <details className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5">
        <summary className="cursor-pointer text-sm font-bold text-blue-700">Advanced: choose an exact custom colour</summary>
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <p className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">Editing</p>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Colour role to edit">
            {slots.map((slot) => (
              <button key={slot.key} type="button" aria-pressed={active === slot.key} onClick={() => setActive(slot.key)} className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-black transition ${active === slot.key ? "border-blue-600 bg-blue-600 text-white shadow-sm" : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700"}`}>
                <span className="h-3.5 w-3.5 rounded-full border border-white/80 shadow-sm" style={{ backgroundColor: colours[slot.key] || "#CBD5E1" }} />
                {slot.label}
              </button>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-black text-slate-950">Fine-tune your {activeSlot.label.toLowerCase()} colour</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">Open the picker, or use the clear HEX and RGB switches below.</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center gap-3 rounded-xl border border-blue-200 bg-blue-50 px-3.5 py-2.5 text-sm font-black text-blue-800 transition hover:border-blue-400 hover:bg-blue-100">
              <input type="color" value={isValidHex(colours[active]) ? colours[active] : "#2563EB"} onChange={(event) => setColour(active, event.target.value)} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
              <span className="h-7 w-7 rounded-lg border-2 border-white shadow-sm ring-1 ring-blue-200" style={{ backgroundColor: colours[active] || "#2563EB" }} />
              Open colour picker
            </label>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-end">
            <div className="inline-flex rounded-xl bg-slate-100 p-1" role="group" aria-label="Colour code format">
              <button type="button" aria-pressed={advancedMode === "hex"} onClick={() => setAdvancedMode("hex")} className={`rounded-lg px-4 py-2 text-xs font-black transition ${advancedMode === "hex" ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>HEX</button>
              <button type="button" aria-pressed={advancedMode === "rgb"} onClick={() => setAdvancedMode("rgb")} className={`rounded-lg px-4 py-2 text-xs font-black transition ${advancedMode === "rgb" ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>RGB</button>
            </div>
            {advancedMode === "hex" ? (
              <label className="block text-xs font-bold text-slate-600">HEX code<input value={colours[active]} onChange={(event) => setColour(active, event.target.value)} placeholder="#2563EB" className={`${inputClassName} mt-1 font-mono text-sm uppercase`} /></label>
            ) : (
              <label className="block text-xs font-bold text-slate-600">RGB code<input value={rgbColours[active]} onChange={(event) => setRgbColour(active, event.target.value)} placeholder="rgb(37, 99, 235)" className={`${inputClassName} mt-1 font-mono text-sm`} /></label>
            )}
          </div>
        </div>
        <div className="sr-only">
          {slots.map((slot) => <span key={slot.key}><input type="hidden" name={slot.hexName} value={colours[slot.key]} /><input type="hidden" name={slot.rgbName} value={rgbColours[slot.key] || rgbFromHex(colours[slot.key])} /></span>)}
        </div>
      </details>
      </div>
    </fieldset>
  );
}

function isLightHex(value: string) {
  if (!isValidHex(value)) return true;
  const hex = value.replace("#", "");

  const colour = Number.parseInt(hex, 16);
  const red = (colour >> 16) & 255;
  const green = (colour >> 8) & 255;
  const blue = colour & 255;

  return (red * 299 + green * 587 + blue * 114) / 1000 > 150;
}

function isValidHex(value: string) {
  return /^#[0-9a-f]{6}$/i.test(value);
}

function rgbFromHex(value: string) {
  const hex = value.replace("#", "");
  if (!/^[0-9a-f]{6}$/i.test(hex)) return "";

  const colour = Number.parseInt(hex, 16);
  return `rgb(${(colour >> 16) & 255}, ${(colour >> 8) & 255}, ${colour & 255})`;
}

function hexFromRgb(value: string) {
  const parts = value.match(/(?:rgb\\()?\\s*(\\d{1,3})\\s*,\\s*(\\d{1,3})\\s*,\\s*(\\d{1,3})\\s*\\)?/i);
  if (!parts) return "";

  const values = parts.slice(1).map(Number);
  if (values.some((number) => number > 255)) return "";
  return `#${values.map((number) => number.toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}
