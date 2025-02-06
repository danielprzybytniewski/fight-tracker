"use client";
import lightLogo from "../../public/images/light-logo.png";
import darkLogo from "../../public/images/dark-logo.png";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
      data-testid="imgTestId"
      src={logo}
      alt="Fight Tracker Logo"
      width={40}
      height={40}
    />
  );
}
