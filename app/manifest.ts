import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "909 Lumina Garden Lounge", short_name: "909 Lumina", description: "Garden lounge, cuisine and nightlife", start_url: "/vi", display: "standalone", background_color: "#060510", theme_color: "#060510", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }] };
}
