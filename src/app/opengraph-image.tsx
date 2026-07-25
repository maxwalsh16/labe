import { ImageResponse } from "next/og";

export const alt =
  "Labe — Modern websites, automated follow-up, and practical AI solutions";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background:
            "radial-gradient(circle at 82% 18%, rgba(37,99,235,0.34), transparent 34%), #071023",
          color: "#fff",
          display: "flex",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px 82px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: 720,
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              gap: 20,
            }}
          >
            <div
              style={{
                alignItems: "center",
                background: "#2563eb",
                borderRadius: 24,
                display: "flex",
                height: 88,
                justifyContent: "center",
                width: 88,
              }}
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 10h12M20 10v10.3l-7.1 12.5A3.5 3.5 0 0 0 16 38h16a3.5 3.5 0 0 0 3.1-5.2L28 20.3V10"
                  stroke="#fff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.6 29.4c3.6-1.7 6.2 1.6 9.9-.1 2.6-1.2 5-.2 6.8.9l2.1 3.8a2.6 2.6 0 0 1-2.3 3.9H15.9a2.6 2.6 0 0 1-2.3-3.9l2-3.6v-1Z"
                  fill="#f7faff"
                />
                <circle cx="22" cy="26" r="1.7" fill="#fff" />
                <circle cx="28.5" cy="22" r="1.25" fill="#fff" opacity=".9" />
              </svg>
            </div>
            <div
              style={{
                fontSize: 54,
                fontWeight: 800,
                letterSpacing: 8,
              }}
            >
              LABE
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 66,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1.04,
              marginTop: 58,
            }}
          >
            <span>The website and AI</span>
            <span>your business needs.</span>
          </div>

          <div
            style={{
              color: "#bfdbfe",
              display: "flex",
              fontSize: 27,
              lineHeight: 1.4,
              marginTop: 30,
            }}
          >
            Modern websites, automated follow-up, and practical AI solutions.
            Win more work with less admin.
          </div>
        </div>

        <div
          style={{
            alignItems: "center",
            background: "rgba(37,99,235,0.14)",
            border: "1px solid rgba(147,197,253,0.24)",
            borderRadius: 52,
            display: "flex",
            height: 338,
            justifyContent: "center",
            width: 260,
          }}
        >
          <svg
            width="190"
            height="190"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 10h12M20 10v10.3l-7.1 12.5A3.5 3.5 0 0 0 16 38h16a3.5 3.5 0 0 0 3.1-5.2L28 20.3V10"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.6 29.4c3.6-1.7 6.2 1.6 9.9-.1 2.6-1.2 5-.2 6.8.9l2.1 3.8a2.6 2.6 0 0 1-2.3 3.9H15.9a2.6 2.6 0 0 1-2.3-3.9l2-3.6v-1Z"
              fill="#f7faff"
            />
            <circle cx="22" cy="26" r="1.7" fill="#fff" />
            <circle cx="28.5" cy="22" r="1.25" fill="#fff" opacity=".9" />
          </svg>
        </div>
      </div>
    ),
    size,
  );
}
