"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Thermometer, ArrowRight, Snowflake, Flame, Zap } from "lucide-react"
import { ThemeToggle } from "./components/theme-toggle"

type TemperatureUnit = "celsius" | "fahrenheit" | "kelvin"

interface ConversionResult {
  celsius: number
  fahrenheit: number
  kelvin: number
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
}

export default function Component() {
  const [temperature, setTemperature] = useState("")
  const [inputUnit, setInputUnit] = useState<TemperatureUnit>("celsius")
  const [result, setResult] = useState<ConversionResult | null>(null)
  const [error, setError] = useState("")
  const [isConverting, setIsConverting] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [showResults, setShowResults] = useState(false)

  // Particle animation effect
  useEffect(() => {
    if (result) {
      const newParticles: Particle[] = []
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
          y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 800),
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 1,
        })
      }
      setParticles(newParticles)

      const interval = setInterval(() => {
        setParticles((prev) =>
          prev
            .map((p) => ({
              ...p,
              x: p.x + p.vx,
              y: p.y + p.vy,
              life: p.life - 0.02,
            }))
            .filter((p) => p.life > 0),
        )
      }, 50)

      setTimeout(() => clearInterval(interval), 2000)
    }
  }, [result])

  const convertTemperature = (temp: number, from: TemperatureUnit): ConversionResult => {
    let celsius: number

    switch (from) {
      case "celsius":
        celsius = temp
        break
      case "fahrenheit":
        celsius = ((temp - 32) * 5) / 9
        break
      case "kelvin":
        celsius = temp - 273.15
        break
    }

    const fahrenheit = (celsius * 9) / 5 + 32
    const kelvin = celsius + 273.15

    return {
      celsius: Math.round(celsius * 100) / 100,
      fahrenheit: Math.round(fahrenheit * 100) / 100,
      kelvin: Math.round(kelvin * 100) / 100,
    }
  }

  const handleConvert = async () => {
    setError("")
    setIsConverting(true)
    setShowResults(false)

    // Validate input
    if (!temperature.trim()) {
      setError("Please enter a temperature value")
      setIsConverting(false)
      return
    }

    const tempValue = Number.parseFloat(temperature)
    if (isNaN(tempValue)) {
      setError("Please enter a valid number")
      setIsConverting(false)
      return
    }

    // Check for absolute zero violations
    if (inputUnit === "kelvin" && tempValue < 0) {
      setError("Kelvin cannot be negative")
      setIsConverting(false)
      return
    }
    if (inputUnit === "celsius" && tempValue < -273.15) {
      setError("Temperature cannot be below absolute zero (-273.15°C)")
      setIsConverting(false)
      return
    }
    if (inputUnit === "fahrenheit" && tempValue < -459.67) {
      setError("Temperature cannot be below absolute zero (-459.67°F)")
      setIsConverting(false)
      return
    }

    // Simulate processing time for dramatic effect
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const conversions = convertTemperature(tempValue, inputUnit)
    setResult(conversions)
    setIsConverting(false)

    // Delayed show results for animation
    setTimeout(() => setShowResults(true), 100)
  }

  const getUnitSymbol = (unit: TemperatureUnit): string => {
    switch (unit) {
      case "celsius":
        return "°C"
      case "fahrenheit":
        return "°F"
      case "kelvin":
        return "K"
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 light:from-blue-50 light:via-purple-50 light:to-pink-50 transition-all duration-1000">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30 dark:opacity-30 light:opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 dark:bg-purple-500 light:bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500 dark:bg-cyan-500 light:bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500 dark:bg-pink-500 light:bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-white dark:bg-white light:bg-purple-600 rounded-full pointer-events-none animate-pulse"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.life,
            transform: `scale(${particle.life})`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto p-6 space-y-8">
        {/* Header with Theme Toggle */}
        <div className="text-center space-y-4 pt-8">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Thermometer className="h-12 w-12 text-cyan-400 dark:text-cyan-400 light:text-cyan-600 animate-bounce" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full animate-ping"></div>
            </div>
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 light:from-cyan-600 light:via-purple-600 light:to-pink-600 bg-clip-text text-transparent animate-pulse">
            Temperature Converter
          </h1>
          <p className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-700 font-light tracking-wide">
            Experience the future of temperature conversion
          </p>
        </div>

        {/* Main Converter Card */}
        <Card className="backdrop-blur-xl bg-white/10 dark:bg-white/10 light:bg-white/80 border-white/20 dark:border-white/20 light:border-white/40 shadow-2xl shadow-purple-500/20 dark:shadow-purple-500/20 light:shadow-purple-500/10 hover:shadow-purple-500/40 dark:hover:shadow-purple-500/40 light:hover:shadow-purple-500/20 transition-all duration-500 hover:scale-[1.02]">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-bold text-white dark:text-white light:text-gray-900 mb-2">
              Enter Temperature
            </CardTitle>
            <CardDescription className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-lg">
              Input a value and watch the magic happen ✨
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label
                  htmlFor="temperature"
                  className="text-white dark:text-white light:text-gray-900 text-lg font-semibold"
                >
                  Temperature Value
                </Label>
                <div className="relative group">
                  <Input
                    id="temperature"
                    type="text"
                    placeholder="Enter temperature..."
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    className={`h-14 text-lg backdrop-blur-sm bg-white/10 dark:bg-white/10 light:bg-white/60 border-white/30 dark:border-white/30 light:border-gray-300 text-white dark:text-white light:text-gray-900 placeholder:text-gray-400 dark:placeholder:text-gray-400 light:placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400/50 transition-all duration-300 ${
                      error ? "border-red-400 focus:border-red-400 focus:ring-red-400/50" : ""
                    }`}
                  />
                  <div className="absolute inset-0 rounded-md bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
              <div className="space-y-3">
                <Label htmlFor="unit" className="text-white dark:text-white light:text-gray-900 text-lg font-semibold">
                  Input Unit
                </Label>
                <Select value={inputUnit} onValueChange={(value: TemperatureUnit) => setInputUnit(value)}>
                  <SelectTrigger className="h-14 text-lg backdrop-blur-sm bg-white/10 dark:bg-white/10 light:bg-white/60 border-white/30 dark:border-white/30 light:border-gray-300 text-white dark:text-white light:text-gray-900 hover:bg-white/20 dark:hover:bg-white/20 light:hover:bg-white/80 transition-all duration-300">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent className="backdrop-blur-xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-white/95 border-white/20 dark:border-white/20 light:border-gray-200">
                    <SelectItem
                      value="celsius"
                      className="text-white dark:text-white light:text-gray-900 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-2">
                        <Snowflake className="w-4 h-4 text-cyan-400" />
                        Celsius (°C)
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="fahrenheit"
                      className="text-white dark:text-white light:text-gray-900 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-2">
                        <Thermometer className="w-4 h-4 text-green-400" />
                        Fahrenheit (°F)
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="kelvin"
                      className="text-white dark:text-white light:text-gray-900 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-purple-400" />
                        Kelvin (K)
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && (
              <div className="text-red-400 dark:text-red-400 light:text-red-600 text-center font-medium bg-red-500/10 dark:bg-red-500/10 light:bg-red-100/80 border border-red-500/20 dark:border-red-500/20 light:border-red-300 rounded-lg p-3 animate-shake">
                {error}
              </div>
            )}

            <Button
              onClick={handleConvert}
              disabled={isConverting}
              className="w-full h-16 text-xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 border-0 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-white"
            >
              {isConverting ? (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Converting...
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <ArrowRight className="w-6 h-6" />
                  Convert Temperature
                </div>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div
            className={`transition-all duration-1000 transform ${showResults ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <Card className="backdrop-blur-xl bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-purple-500/10 dark:from-emerald-500/10 dark:via-cyan-500/10 dark:to-purple-500/10 light:from-emerald-100/80 light:via-cyan-100/80 light:to-purple-100/80 border-emerald-400/30 dark:border-emerald-400/30 light:border-emerald-400/50 shadow-2xl shadow-emerald-500/20 dark:shadow-emerald-500/20 light:shadow-emerald-500/10">
              <CardHeader className="text-center">
                <CardTitle className="text-4xl font-bold text-white dark:text-white light:text-gray-900 mb-2 flex items-center justify-center gap-3">
                  <span className="animate-bounce">🎉</span>
                  Conversion Results
                  <span className="animate-bounce animation-delay-200">✨</span>
                </CardTitle>
                <CardDescription className="text-gray-300 dark:text-gray-300 light:text-gray-600 text-lg">
                  {temperature} {getUnitSymbol(inputUnit)} converted to all temperature scales
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Celsius */}
                  <div
                    className={`group relative overflow-hidden rounded-2xl p-6 backdrop-blur-sm transition-all duration-500 hover:scale-105 ${
                      inputUnit === "celsius"
                        ? "bg-gradient-to-br from-cyan-500/30 to-blue-500/30 dark:from-cyan-500/30 dark:to-blue-500/30 light:from-cyan-200/80 light:to-blue-200/80 border-2 border-cyan-400 shadow-lg shadow-cyan-500/50 dark:shadow-cyan-500/50 light:shadow-cyan-500/30"
                        : "bg-white/10 dark:bg-white/10 light:bg-white/60 border border-white/20 dark:border-white/20 light:border-gray-300 hover:bg-white/20 dark:hover:bg-white/20 light:hover:bg-white/80"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative text-center space-y-3">
                      <div className="flex items-center justify-center">
                        <Snowflake className="w-8 h-8 text-cyan-400 animate-pulse" />
                      </div>
                      <div className="text-4xl font-black text-white dark:text-white light:text-gray-900 animate-pulse">
                        {result.celsius}°C
                      </div>
                      <div className="text-cyan-300 dark:text-cyan-300 light:text-cyan-700 font-semibold text-lg">
                        Celsius
                      </div>
                      {inputUnit === "celsius" && (
                        <div className="text-xs text-cyan-400 dark:text-cyan-400 light:text-cyan-700 font-bold bg-cyan-500/20 dark:bg-cyan-500/20 light:bg-cyan-200/80 px-3 py-1 rounded-full animate-pulse">
                          ORIGINAL
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Fahrenheit */}
                  <div
                    className={`group relative overflow-hidden rounded-2xl p-6 backdrop-blur-sm transition-all duration-500 hover:scale-105 ${
                      inputUnit === "fahrenheit"
                        ? "bg-gradient-to-br from-emerald-500/30 to-green-500/30 dark:from-emerald-500/30 dark:to-green-500/30 light:from-emerald-200/80 light:to-green-200/80 border-2 border-emerald-400 shadow-lg shadow-emerald-500/50 dark:shadow-emerald-500/50 light:shadow-emerald-500/30"
                        : "bg-white/10 dark:bg-white/10 light:bg-white/60 border border-white/20 dark:border-white/20 light:border-gray-300 hover:bg-white/20 dark:hover:bg-white/20 light:hover:bg-white/80"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative text-center space-y-3">
                      <div className="flex items-center justify-center">
                        <Thermometer className="w-8 h-8 text-emerald-400 animate-pulse" />
                      </div>
                      <div className="text-4xl font-black text-white dark:text-white light:text-gray-900 animate-pulse">
                        {result.fahrenheit}°F
                      </div>
                      <div className="text-emerald-300 dark:text-emerald-300 light:text-emerald-700 font-semibold text-lg">
                        Fahrenheit
                      </div>
                      {inputUnit === "fahrenheit" && (
                        <div className="text-xs text-emerald-400 dark:text-emerald-400 light:text-emerald-700 font-bold bg-emerald-500/20 dark:bg-emerald-500/20 light:bg-emerald-200/80 px-3 py-1 rounded-full animate-pulse">
                          ORIGINAL
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Kelvin */}
                  <div
                    className={`group relative overflow-hidden rounded-2xl p-6 backdrop-blur-sm transition-all duration-500 hover:scale-105 ${
                      inputUnit === "kelvin"
                        ? "bg-gradient-to-br from-purple-500/30 to-pink-500/30 dark:from-purple-500/30 dark:to-pink-500/30 light:from-purple-200/80 light:to-pink-200/80 border-2 border-purple-400 shadow-lg shadow-purple-500/50 dark:shadow-purple-500/50 light:shadow-purple-500/30"
                        : "bg-white/10 dark:bg-white/10 light:bg-white/60 border border-white/20 dark:border-white/20 light:border-gray-300 hover:bg-white/20 dark:hover:bg-white/20 light:hover:bg-white/80"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative text-center space-y-3">
                      <div className="flex items-center justify-center">
                        <Zap className="w-8 h-8 text-purple-400 animate-pulse" />
                      </div>
                      <div className="text-4xl font-black text-white dark:text-white light:text-gray-900 animate-pulse">
                        {result.kelvin}K
                      </div>
                      <div className="text-purple-300 dark:text-purple-300 light:text-purple-700 font-semibold text-lg">
                        Kelvin
                      </div>
                      {inputUnit === "kelvin" && (
                        <div className="text-xs text-purple-400 dark:text-purple-400 light:text-purple-700 font-bold bg-purple-500/20 dark:bg-purple-500/20 light:bg-purple-200/80 px-3 py-1 rounded-full animate-pulse">
                          ORIGINAL
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Reference Card */}
                <div className="mt-8 p-6 backdrop-blur-sm bg-gradient-to-r from-slate-800/50 to-slate-700/50 dark:from-slate-800/50 dark:to-slate-700/50 light:from-gray-100/80 light:to-gray-200/80 rounded-2xl border border-white/10 dark:border-white/10 light:border-gray-300">
                  <h4 className="font-bold text-white dark:text-white light:text-gray-900 text-xl mb-4 flex items-center gap-2">
                    <span className="text-2xl">📚</span>
                    Quick Reference Guide
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300 dark:text-gray-300 light:text-gray-700">
                    <div className="flex items-center gap-2">
                      <Snowflake className="w-4 h-4 text-cyan-400" />
                      <span>Water freezes: 0°C = 32°F = 273.15K</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-red-400" />
                      <span>Water boils: 100°C = 212°F = 373.15K</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-400" />
                      <span>Absolute zero: -273.15°C = -459.67°F = 0K</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <style jsx>{`
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-2000 {
          animation-delay: 2000ms;
        }
        .animation-delay-4000 {
          animation-delay: 4000ms;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}
