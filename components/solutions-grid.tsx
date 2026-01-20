"use client"

import type React from "react"

import { useState } from "react"
import {
  BarChart3,
  Recycle,
  TrendingDown,
  GraduationCap,
  FileText,
  Search,
  Microscope,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { FadeIn } from "@/components/animations"
import { useLanguage } from "@/context/LanguageContext"
import { getTranslation } from "@/lib/translations"

interface Solution {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  category: "carbon" | "environmental"
  delay: number
}

const solutions: Solution[] = [
  {
    id: "medicion-huella",
    title: "solutionsGrid.medicionHuella.title",
    description: "solutionsGrid.medicionHuella.description",
    icon: BarChart3,
    category: "carbon",
    delay: 100,
  },
  {
    id: "analisis-ciclo-vida",
    title: "solutionsGrid.analisisCicloVida.title",
    description: "solutionsGrid.analisisCicloVida.description",
    icon: Recycle,
    category: "carbon",
    delay: 200,
  },
  {
    id: "estrategias-reduccion",
    title: "solutionsGrid.estrategiasReduccion.title",
    description: "solutionsGrid.estrategiasReduccion.description",
    icon: TrendingDown,
    category: "carbon",
    delay: 300,
  },
  {
    id: "capacitacion",
    title: "solutionsGrid.capacitacion.title",
    description: "solutionsGrid.capacitacion.description",
    icon: GraduationCap,
    category: "carbon",
    delay: 400,
  },
  {
    id: "estudios-impacto",
    title: "solutionsGrid.estudiosImpacto.title",
    description: "solutionsGrid.estudiosImpacto.description",
    icon: FileText,
    category: "environmental",
    delay: 500,
  },
  {
    id: "auditorias-monitoreos",
    title: "solutionsGrid.auditoriasMonitoreos.title",
    description: "solutionsGrid.auditoriasMonitoreos.description",
    icon: Search,
    category: "environmental",
    delay: 600,
  },
  {
    id: "estudios-especificos",
    title: "solutionsGrid.estudiosEspecificos.title",
    description: "solutionsGrid.estudiosEspecificos.description",
    icon: Microscope,
    category: "environmental",
    delay: 700,
  },
]

export function SolutionsGrid() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(language, key)

  const toggleCard = (id: string) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedCards(newExpanded)
  }

  const getAlternatingColor = (index: number) => {
    const colors = [
      "border-aukan-lime-green",
      "border-aukan-sage-green",
      "border-aukan-gray-green",
      "border-aukan-dark-blue",
    ]
    return colors[index % colors.length]
  }

  const getAlternatingIconColor = (index: number) => {
    const colors = ["text-aukan-lime-green", "text-aukan-sage-green", "text-aukan-gray-green", "text-aukan-dark-blue"]
    return colors[index % colors.length]
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
      {solutions.map((solution, index) => {
        const isExpanded = expandedCards.has(solution.id)
        const IconComponent = solution.icon

        return (
          <FadeIn key={solution.id} delay={solution.delay}>
            <div
              className={cn(
                "bg-white rounded-lg shadow-lg border-l-4 transition-all duration-500 ease-out cursor-pointer group hover:shadow-xl hover:-translate-y-2 w-full",
                getAlternatingColor(index),
                isExpanded && "ring-2 ring-aukan-lime-green/30 z-10 relative",
              )}
              onClick={() => toggleCard(solution.id)}
            >
              <div className="p-4 flex flex-col items-center text-center">
                {/* Header */}
                <div className="flex items-center justify-center w-full mb-3">
                  <div className="flex items-center space-x-3 flex-1 justify-center">
                    <div
                      className={cn(
                        "p-2 rounded-full bg-gray-50 transition-all duration-300 group-hover:scale-110 flex-shrink-0",
                        isExpanded && "bg-aukan-lime-green/10",
                      )}
                    >
                      <IconComponent
                        className={cn(
                          "w-5 h-5 transition-colors duration-300",
                          getAlternatingIconColor(index),
                          isExpanded && "text-aukan-lime-green",
                        )}
                      />
                    </div>
                    <h3 className="text-base font-bold text-aukan-dark-blue group-hover:text-aukan-gray-green transition-colors duration-300 leading-tight text-center flex-1">
                      {t(solution.title)}
                    </h3>
                  </div>
                  <div
                    className={cn(
                      "ml-2 p-1 rounded-full transition-all duration-300 flex-shrink-0",
                      isExpanded
                        ? "bg-aukan-lime-green/10 rotate-180"
                        : "bg-gray-50 group-hover:bg-aukan-lime-green/10",
                    )}
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-aukan-lime-green" />
                    ) : (
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-colors duration-300",
                          getAlternatingIconColor(index),
                          "group-hover:text-aukan-lime-green",
                        )}
                      />
                    )}
                  </div>
                </div>

                {/* Content Area */}
                {isExpanded && (
                  <div className="w-full">
                    <p className="text-gray-600 leading-relaxed text-justify text-sm px-2">{t(solution.description)}</p>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        )
      })}
    </div>
  )
}
