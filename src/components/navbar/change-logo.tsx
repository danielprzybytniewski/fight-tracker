"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import darkLogo from "@/public/images/dark-logo.png";
import lightLogo from "@/public/images/light-logo.png";

export default function ChangeLogo() {
  const { theme } = useTheme();
  const [logo, setLogo] = useState(darkLogo);

  useEffect(() => {
    if (theme === "dark") {
      setLogo(lightLogo);
    } else {
      setLogo(darkLogo);
    }
  }, [theme]);

  return (
    <Image
      data-testid="logoImage"
      src={logo}
      alt="Fight Tracker Logo"
      width={40}
      height={40}
    />
  );
}
