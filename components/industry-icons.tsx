"use client"

import { Wind, Droplets, Zap } from "lucide-react"
import { FadeIn } from "@/components/animations"

const industries = [
  {
    id: "oil-gas",
    title: "Oil & Gas Upstream y Downstream",
    icon: Droplets,
    delay: 100,
    description: "Exploración, extracción, refinación y distribución de hidrocarburos",
  },
  {
    id: "renewable",
    title: "Parques Eólicos y Solares",
    icon: Wind,
    delay: 200,
    description: "Energías renovables y proyectos de generación limpia",
  },
  {
    id: "hydrogen",
    title: "Producción de Hidrógeno Verde y Derivados",
    icon: Zap,
    delay: 300,
    description: "Tecnologías de hidrógeno y combustibles del futuro",
  },
]

export function IndustryIcons() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 my-8 md:my-12 px-4 sm:px-0">
      {industries.map((industry) => {
        const IconComponent = industry.icon
        return (
          <FadeIn key={industry.id} delay={industry.delay}>
            <div className="text-center group cursor-pointer">
              {/* Icon Container */}
              <div className="relative mx-auto mb-4 md:mb-6 w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 lg:w-28 lg:h-28">
                {/* Background Circle with Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-aukan-lime-green/20 to-aukan-sage-green/20 rounded-full transition-all duration-500 group-hover:scale-110 group-hover:from-aukan-lime-green/30 group-hover:to-aukan-sage-green/30"></div>

                {/* Animated Ring */}
                <div className="absolute inset-2 border-2 border-aukan-lime-green/30 rounded-full transition-all duration-700 group-hover:border-aukan-lime-green/60 group-hover:rotate-180"></div>

                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <IconComponent className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 text-aukan-dark-blue transition-all duration-500 group-hover:scale-110 group-hover:text-aukan-lime-green animate-pulse-subtle" />
                </div>

                {/* Floating Particles */}
                <div className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-aukan-lime-green/40 rounded-full animate-float-particle-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-aukan-sage-green/40 rounded-full animate-float-particle-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-aukan-dark-blue mb-2 md:mb-3 transition-colors duration-300 group-hover:text-aukan-lime-green px-2">
                {industry.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-aukan-gray-green leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 px-2">
                {industry.description}
              </p>
            </div>
          </FadeIn>
        )
      })}
    </div>
  )
}
