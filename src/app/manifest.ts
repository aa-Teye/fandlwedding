import type { MetadataRoute } from "next";
import { couple, site, wedding } from "@/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${couple.groom} & ${couple.bride}`,
    short_name: `${couple.groom[0]} & ${couple.bride[0]}`,
    description: `The wedding of ${couple.groom} & ${couple.bride}, ${wedding.displayDate}.`,
    start_url: "/",
    display: "standalone",
    background_color: "#2a0a40",
    theme_color: site.themeColor,
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
