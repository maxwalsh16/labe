import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Labe",
    short_name: "Labe",
    description:
      "Modern websites, automated follow-up, and practical AI solutions. We help small businesses win more work with less admin.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    icons: [
      {
        src: "/labe-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/labe-icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
