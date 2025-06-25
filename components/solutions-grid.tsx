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
    title: "Medición de Huella de Carbono Organizacional",
    description:
      "Realizamos el inventario de GEI (gases de efecto invernadero) de acuerdo a la norma ISO 14064, asegurando el cumplimiento normativo (ej. Res. 258/2025 Neuquén, Res. 001/2025 Mendoza) y facilitando un reporte transparente.",
    icon: BarChart3,
    category: "carbon",
    delay: 100,
  },
  {
    id: "analisis-ciclo-vida",
    title: "Análisis de Ciclo de Vida (ACV)",
    description:
      "Identificamos los impactos ambientales a lo largo de la vida de un producto o servicio, siguiendo la norma ISO 14067 y las mejores prácticas de ACV para una visión completa.",
    icon: Recycle,
    category: "carbon",
    delay: 200,
  },
  {
    id: "estrategias-reduccion",
    title: "Estrategias de reducción de emisiones",
    description:
      "Identificamos oportunidades de eficiencia energética, optimización de procesos y uso de energías limpias. Definimos metas de reducción y compensación estratégicas para la compañía.",
    icon: TrendingDown,
    category: "carbon",
    delay: 300,
  },
  {
    id: "capacitacion",
    title: "Capacitación y acompañamiento",
    description:
      "Ofrecemos talleres y cursos sobre gestión de GEI y eficiencia energética para tus equipos, y te acompañamos en los procesos de verificación y certificación.",
    icon: GraduationCap,
    category: "carbon",
    delay: 400,
  },
  {
    id: "estudios-impacto",
    title: "Estudios de Impacto Ambiental (EIA)",
    description:
      "Desarrollamos evaluaciones completas para proyectos como la instalación y reemplazo de ductos y nuevas instalaciones, garantizando el cumplimiento legal ambiental.",
    icon: FileText,
    category: "environmental",
    delay: 500,
  },
  {
    id: "auditorias-monitoreos",
    title: "Auditorías y Monitoreos Ambientales",
    description:
      "Realizamos auditorías y monitoreos ambientales de acuerdo con la Disp. 123/06 y Res. 785/05 SEN, asegurando la adhesión a los estándares ambientales y legales.",
    icon: Search,
    category: "environmental",
    delay: 600,
  },
  {
    id: "estudios-especificos",
    title: "Estudios específicos",
    description:
      "Llevamos a cabo estudios de agua y suelo, caracterizaciones ambientales y toma de muestras para Líneas de Base Ambiental y pedidos específicos.",
    icon: Microscope,
    category: "environmental",
    delay: 700,
  },
]

export function SolutionsGrid() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

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
                      {solution.title}
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
                    <p className="text-gray-600 leading-relaxed text-justify text-sm px-2">{solution.description}</p>
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
