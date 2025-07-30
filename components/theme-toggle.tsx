"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative overflow-hidden backdrop-blur-sm bg-white/10 dark:bg-white/10 border-white/20 hover:bg-white/20 dark:hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 text-yellow-500 group-hover:text-yellow-400" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 text-blue-400 group-hover:text-blue-300" />
      <span className="sr-only">Toggle theme</span>
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </Button>
  )
}
