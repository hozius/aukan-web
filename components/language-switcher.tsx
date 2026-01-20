"use client"

import { useLanguage } from "@/context/LanguageContext"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-slate-100 to-slate-50 rounded-full p-1 border border-slate-200">
      <div className="pl-2">
        <Globe className="w-6 h-6 text-aukan-dark-blue" />
      </div>
      <Button
        variant={language === "es" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("es")}
        className={`rounded-full px-4 font-medium transition-all ${language === "es"
          ? "bg-aukan-dark-blue hover:bg-aukan-lime-green text-white"
          : "text-aukan-dark-blue hover:text-aukan-dark-blue hover:bg-slate-200"
          }`}
      >
        ES
      </Button>
      <Button
        variant={language === "en" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLanguage("en")}
        className={`rounded-full px-4 font-medium transition-all ${language === "en"
          ? "bg-aukan-dark-blue hover:bg-aukan-lime-green text-white"
          : "text-aukan-dark-blue hover:text-aukan-dark-blue hover:bg-slate-200"
          }`}
      >
        EN
      </Button>
    </div>
  )
}
