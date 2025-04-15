"use client";
import FavoritesCounter from "@/components/favorites/favorites-counter";
import ModeToggler from "@/components/navbar/mode-toggler";
import NavbarLinks from "@/components/navbar/navbar-links";
import { linksConfig } from "@/config/routes-config";

export default function NavbarItems() {
  return (
    <>
      {linksConfig.map(({ href, label }) => (
        <NavbarLinks key={href} href={href} label={label} />
      ))}
      <FavoritesCounter />
      <ModeToggler />
    </>
  );
}
