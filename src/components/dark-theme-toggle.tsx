"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function DarkThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div
      className={cn(
        "p-1  rounded-lg",
        theme === "light" ? "hover:bg-accent" : "invert"
      )}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Image alt="theme" src={"/dark-theme.svg"} height={20} width={20} />
    </div>
  );
}
