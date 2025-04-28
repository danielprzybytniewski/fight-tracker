import type { LucideIcon } from "lucide-react";

export type FeautureIconName =
  | "User"
  | "ScrollText"
  | "BarChart2"
  | "Globe"
  | "Newspaper"
  | "Heart"
  | "Star"
  | "Medal";

export type Feature = {
  icon: FeautureIconName;
  title: string;
  description: string;
};

export type OverviewItem = {
  icon: LucideIcon;
  text: string;
};

export type Overview = {
  title: string;
  description: string;
  items: OverviewItem[];
  linkHref: string;
  linkText: string;
  imageKey: string;
  imageAlt: string;
  isReversed?: boolean;
  customBgClass?: string;
};

export type Stats = {
  value: string;
  label: string;
};
