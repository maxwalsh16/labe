const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: unknown;
  business?: unknown;
  email?: unknown;
  phone?: unknown;
  website?: unknown;
  interest?: unknown;
  message?: unknown;
  company?: unknown;
  consent?: unknown;
};

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json(
      { message: "Please check the form and try again." },
      { status: 400 },
    );
  }

  if (asText(payload.company)) {
    return Response.json({
      message: "Thanks—your enquiry has been received.",
    });
  }

  const name = asText(payload.name);
  const business = asText(payload.business);
  const email = asText(payload.email);
  const phone = asText(payload.phone);
  const website = asText(payload.website);
  const interest = asText(payload.interest);
  const message = asText(payload.message);

  if (
    !name ||
    !business ||
    !emailPattern.test(email) ||
    !interest ||
    !message ||
    payload.consent !== true
  ) {
    return Response.json(
      { message: "Please complete every required field and try again." },
      { status: 400 },
    );
  }

  if (
    name.length > 80 ||
    business.length > 100 ||
    email.length > 160 ||
    phone.length > 40 ||
    website.length > 240 ||
    interest.length > 80 ||
    message.length > 2000
  ) {
    return Response.json(
      { message: "One or more fields are too long. Please shorten them." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return Response.json(
      {
        message:
          "Online delivery is still being connected. Please email hello@labe.com.au directly for now.",
      },
      { status: 503 },
    );
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `New Labe enquiry — ${business}`,
      text: [
        `Name: ${name}`,
        `Business: ${business}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Website: ${website || "Not provided"}`,
        `Interest: ${interest}`,
        "",
        message,
      ].join("\n"),
      html: contactEmailHtml({
        name,
        business,
        email,
        phone,
        website,
        interest,
        message,
      }),
    }),
  });

  if (!resendResponse.ok) {
    return Response.json(
      {
        message:
          "The form could not be delivered. Please email hello@labe.com.au directly.",
      },
      { status: 502 },
    );
  }

  return Response.json({
    message: "Thanks—your enquiry has been sent. Labe will be in touch.",
  });
}

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function contactEmailHtml(fields: {
  name: string;
  business: string;
  email: string;
  phone: string;
  website: string;
  interest: string;
  message: string;
}) {
  const rows = [
    ["Name", fields.name],
    ["Business", fields.business],
    ["Email", fields.email],
    ["Phone", fields.phone || "Not provided"],
    ["Website", fields.website || "Not provided"],
    ["Interest", fields.interest],
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.6">
      <h1 style="font-size:24px">New Labe enquiry</h1>
      ${rows
        .map(
          ([label, value]) =>
            `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`,
        )
        .join("")}
      <h2 style="font-size:18px;margin-top:24px">What they want to improve</h2>
      <p style="white-space:pre-wrap">${escapeHtml(fields.message)}</p>
    </div>
  `;
}
