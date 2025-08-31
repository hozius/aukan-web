import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  width?: number
  height?: number
  variant?: "default" | "header" | "footer" | "hero" | "compact"
  animated?: boolean
}

export function Logo({ className, width = 200, height = 80, variant = "default", animated = false }: LogoProps) {
  const getImageClasses = () => {
    const baseClasses = "object-contain transition-all duration-500 ease-out logo-optimized"

    switch (variant) {
      case "header":
        return cn(baseClasses, "hover:scale-105 hover:brightness-110")
      case "footer":
        return cn(baseClasses, "hover:scale-105")
      case "hero":
        return cn(baseClasses, "hover:scale-110 hover:brightness-115")
      case "compact":
        return cn(baseClasses, "hover:scale-105")
      default:
        return cn(baseClasses)
    }
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center transition-all duration-500 ease-out",
        animated && "animate-logo-float",
        className,
      )}
    >
      <Image
        src="/logo-aukan-white.png"
        alt="AUKAN Sustentable - Sostenibilidad y Huella de Carbono"
        width={width}
        height={height}
        className={getImageClasses()}
        priority
        quality={95}
      />
    </div>
  )
}
