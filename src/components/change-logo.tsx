"use client";
import lightLogo from "../../public/lightLogo.png";
import darkLogo from "../../public/darkLogo.png";
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
    <li>
      <Image src={logo} alt="Fight Tracker Logo" width={40} height={40} />
    </li>
  );
}
