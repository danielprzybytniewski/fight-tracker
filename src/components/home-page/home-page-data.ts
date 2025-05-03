import {
  BarChart2,
  Crown,
  Dumbbell,
  Globe,
  Grab,
  Heart,
  Info,
  Medal,
  Newspaper,
  Search,
  User,
  UserRoundSearch,
} from "lucide-react";
import { routesConfig } from "@/config/routes-config";
import type { Feature, Overview, Stats } from "@/types/home-page.types";

export const features: Feature[] = [
  {
    icon: "User",
    title: "Fighters",
    description:
      "Explore profiles of over 170 UFC fighters. Search and filter by weight class, discover their records, achievements and profiles.",
  },
  {
    icon: "ScrollText",
    title: "Fights History",
    description:
      "Dive into the history of more than 1930 UFC fights: see winners, dates, locations, victory methods and the round in which each fight ended.",
  },
  {
    icon: "BarChart2",
    title: "Rankings",
    description:
      "Stay updated with current UFC rankings. Discover champions and the top 15 fighters in every weight class.",
  },
  {
    icon: "Globe",
    title: "Events",
    description:
      "Track events from UFC, PFL, ONE and Rizin. View full fight cards and event details for all scheduled shows.",
  },
  {
    icon: "Newspaper",
    title: "News",
    description:
      "Get MMA news from top organizations like UFC and more. Check exclusive photos, updates, fighter interviews, betting odds, predictions and expert fight picks.",
  },
  {
    icon: "Heart",
    title: "Favorites",
    description:
      "Add or remove your favorite fighters with a single click. Instantly access their profiles and follow their careers.",
  },
];

export const overviewSections: Overview[] = [
  {
    title: "Explore UFC Fighters",
    description:
      "Discover detailed profiles of over 170 UFC fighters. Search by name, filter by weight class and view comprehensive stats for every athlete.",
    items: [
      { icon: UserRoundSearch, text: "Browse over 170 best UFC fighters" },
      { icon: Search, text: "Quickly search for any fighter by name" },
      { icon: Dumbbell, text: "Sort fighters by weight classes" },
      {
        icon: BarChart2,
        text: "View detailed stats and profiles for each fighter",
      },
    ],
    linkHref: routesConfig.fighters,
    linkText: "View Fighters",
    imageKey: "fighters",
    imageAlt: "UFC fighters",
  },
  {
    title: "Current UFC Rankings",
    description:
      "Find current UFC rankings for all weight categories. Discover champions and top 15 fighters in each division.",
    items: [
      { icon: Medal, text: "Explore rankings across 13 weight divisions" },
      { icon: Crown, text: "See the current champion of each division" },
      { icon: BarChart2, text: "View the top 15 fighters in every division" },
      {
        icon: UserRoundSearch,
        text: "Access detailed profiles for each ranked fighter",
      },
    ],
    linkHref: routesConfig.rankings,
    linkText: "View Rankings",
    imageKey: "rankings",
    imageAlt: "UFC rankings",
    isReversed: true,
  },
  {
    title: "Best MMA events",
    description:
      "Discover 9 major MMA events from the world’s top federations, including UFC, PFL, RIZIN and ONE. Explore fight cards for each event, featuring over 115 fights.",
    items: [
      { icon: Globe, text: "9 major MMA events from top federations" },
      { icon: Medal, text: "Includes UFC, PFL, RIZIN and ONE events" },
      { icon: BarChart2, text: "View fight cards for each event" },
      { icon: Grab, text: "Over 115 fights available to explore" },
    ],
    linkHref: routesConfig.events,
    linkText: "View Events",
    imageKey: "events",
    imageAlt: "MMA events",
  },
  {
    title: "Discover MMA News",
    description:
      "Stay up-to-date with over 105 news from the MMA world. Get the updates, interviews, photos, predictions and betting odds from major events like UFC, PFL and BKFC.",
    items: [
      { icon: Newspaper, text: "Over 105 news from the MMA world" },
      { icon: Medal, text: "Updates from UFC, PFL, BKFC and more" },
      {
        icon: BarChart2,
        text: "Predictions and betting odds for major events",
      },
      { icon: Info, text: "Exclusive photos, interviews and insights" },
    ],
    linkHref: routesConfig.news,
    linkText: "View News",
    imageKey: "news",
    imageAlt: "MMA news",
    isReversed: true,
  },
  {
    title: "Track Your Favorite Fighters",
    description:
      "Add fighters to your favorites for quick access to their profiles. You can easily manage your favorites list. Instantly see key information about each fighter and access their detailed profiles with just one click.",
    items: [
      {
        icon: Heart,
        text: "Create and manage your personal list of favorite fighters",
      },
      {
        icon: User,
        text: "See key info: name, nickname, weight class and record",
      },
      {
        icon: UserRoundSearch,
        text: "Quickly access detailed profiles of your favorite fighters",
      },
      {
        icon: BarChart2,
        text: "Track your favorites rankings and recent performances",
      },
    ],
    linkHref: routesConfig.favorites,
    linkText: "View Favorite Fighters",
    imageKey: "favorites",
    imageAlt: "Favorite fighters",
  },
];

export const stats: Stats[] = [
  { value: "170+", label: "UFC Fighters" },
  { value: "1930+", label: "UFC Fights History" },
  { value: "13", label: "UFC Divisions" },
  { value: "9", label: "MMA Events" },
  { value: "115+", label: "MMA Fights" },
  { value: "105+", label: "MMA News" },
];

export const logoImageKeys: string[] = ["ufc", "pfl", "rizin", "one", "bkfc"];
