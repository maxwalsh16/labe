import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#2563eb",
          borderRadius: 18,
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <svg
          width="46"
          height="46"
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
    ),
    size,
  );
}
