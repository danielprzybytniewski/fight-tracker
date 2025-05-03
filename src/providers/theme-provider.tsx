"use client";
import dynamic from "next/dynamic";
import { ThemeProviderProps } from "next-themes";

const DynamicNextThemesProvider = dynamic(
  () => import("next-themes").then((mod) => mod.ThemeProvider),
  {
    ssr: false,
  },
);

export function ThemeProvider({
  children,
  ...props
}: React.PropsWithChildren<ThemeProviderProps>) {
  return (
    <DynamicNextThemesProvider {...props}>{children}</DynamicNextThemesProvider>
  );
}
