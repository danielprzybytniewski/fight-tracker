export const routesConfig = {
  root: "/",
  fighters: "/fighters",
  rankings: "/rankings",
  events: "/events",
  news: "/news",
  favorites: "/favorites",

  event: (slug: string) => `/events/${slug}`,
  athlete: (athleteId: string | undefined) => `/athlete/${athleteId}`,
  champion: (championId: string) => `/athlete/${championId}`,
  rankingDetails: (divisionId: string) => `/rankings/${divisionId}`,
  newsDetails: (slug: string) => `/news/${slug}`,
};

export const linksConfig = [
  { href: routesConfig.fighters, label: "UFC Fighters" },
  { href: routesConfig.rankings, label: "UFC Rankings" },
  { href: routesConfig.events, label: "MMA Events" },
  { href: routesConfig.news, label: "News" },
];
