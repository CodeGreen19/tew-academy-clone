"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function DarkThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div
      className={cn("p-1  rounded-lg")}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Image
        alt="theme"
        src={"/dark-theme.svg"}
        className="dark:invert rounded-full"
        height={20}
        width={20}
      />
    </div>
  );
}
