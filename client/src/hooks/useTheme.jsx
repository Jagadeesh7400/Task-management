"use client"

import { useState, useEffect, createContext, useContext } from "react"

const ThemeContext = createContext(null)

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
      
      // Update the theme-color meta tag for mobile browsers
      const metaThemeColor = document.querySelector("meta[name=theme-color]");
      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", savedTheme === "dark" ? "#1f2937" : "#4e54c8");
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      // If no preference in localStorage, check system preference
      setTheme("dark");
      document.documentElement.classList.add("dark");
      
      // Update the theme-color meta tag for mobile browsers
      const metaThemeColor = document.querySelector("meta[name=theme-color]");
      if (metaThemeColor) {
        metaThemeColor.setAttribute("content", "#1f2937");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    
    // Add or remove the 'dark' class from the document element
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    
    // Update the theme-color meta tag for mobile browsers
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", newTheme === "dark" ? "#1f2937" : "#4e54c8");
    }
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}