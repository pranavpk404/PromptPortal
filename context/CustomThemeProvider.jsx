"use client";

import { ThemeProvider } from "next-themes";

function CustomThemeProvider({ children }) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
export default CustomThemeProvider;
