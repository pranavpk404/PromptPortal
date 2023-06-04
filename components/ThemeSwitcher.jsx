import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return (
      <Image alt="moon" height="32" width="32" src="/assets/icons/moon.svg" />
    );
  }

  return (
    <button
      className="theme-switch"
      onClick={handleToggleTheme}
      aria-label={
        theme === "light" ? "Switch to Dark Theme" : "Switch to Light Theme"
      }
    >
      {theme === "light" ? (
        <Image
          alt="dark mode"
          height="32"
          width="32"
          src="/assets/icons/moon.svg"
        />
      ) : (
        <Image
          alt="light mode"
          height="32"
          width="32"
          src="/assets/icons/sun.svg"
        />
      )}
    </button>
  );
};

export default ThemeSwitch;
