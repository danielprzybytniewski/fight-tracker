const baseUrl = "https://fight-tracker.vercel.app";

type MetadataParams = {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
};

const sharedMetadata = {
  keywords: [
    "MMA",
    "UFC",
    "Mixed Martial Arts",
    "fight events",
    "upcoming fights",
    "upcoming fight events",
    "sports events",
    "fight tracker",
    "UFC rankings",
    "rankings",
    "athletes",
    "fighters",
    "best fighters",
    "top fighters",
    "favorites",
    "favorite fighters",
    "your favorite fighters",
    "UFC fighters",
    "divisions",
    "champions",
    "weight classes",
    "weight divisions",
    "UFC fight history",
    "fighter records",
    "past UFC events",
    "fight results",
    "UFC career",
    "fighter performance",
    "UFC matchups",
    "fight statistics",
    "UFC fight cards",
    "historical fights",
    "fighter journey",
    "UFC timeline",
    "fight analysis",
    "UFC archives",
    "fighter evolution",
    "fighter progression",
  ],
  openGraph: {
    type: "website",
    images: [`${baseUrl}/images/og-image.png`],
  },
};

export function createMetadata({
  title,
  description,
  keywords = [],
  path = "",
}: MetadataParams) {
  const allKeywords = [...sharedMetadata.keywords, ...keywords].join(", ");

  return {
    title: `${title} | Fight Tracker`,
    description,
    keywords: allKeywords,
    openGraph: {
      ...sharedMetadata.openGraph,
      title: `${title} | Fight Tracker`,
      description,
      url: `${baseUrl}${path}`,
    },
  };
}
