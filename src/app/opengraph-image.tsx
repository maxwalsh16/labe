import { ImageResponse } from "next/og";

export const alt = "Labe beaker logo";

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
          background: "#2563eb",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            background: "rgba(255,255,255,0.08)",
            border: "2px solid rgba(255,255,255,0.18)",
            borderRadius: 88,
            boxShadow: "0 40px 100px rgba(15,23,42,0.22)",
            display: "flex",
            height: 430,
            justifyContent: "center",
            width: 430,
          }}
        >
          <svg
            width="320"
            height="320"
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
