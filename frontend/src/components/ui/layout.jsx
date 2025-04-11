// src/components/Layout.jsx
import React from "react";
import "@/global.css"; // works with alias
// Adjust path if needed 
import { ThemeProvider } from "@/components/ui/theme-provider"; // If you're using shadcn/ui or custom theme logic

const Layout = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <div className="min-h-screen font-sans bg-background text-foreground">
        {children}
      </div>
    </ThemeProvider>
  );
};

export default Layout;
