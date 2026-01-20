"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X, Phone, Mail, Target, Users, Award, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Logo } from "@/components/logo"
import { FadeIn, SlideIn, ScaleIn } from "@/components/animations"
import { SolutionsGrid } from "@/components/solutions-grid"
import { IndustryIcons } from "@/components/industry-icons"
import { PrivacyPolicyModal } from "@/components/privacy-policy-modal"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"

export function AukanLanding() {
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { language } = useLanguage()
  const t = translations[language]
  
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    organizacion: "",
    email: "",
    pais: "",
    codigoArea: "",
    numero: "",
    informacionAdicional: "",
    mensaje: "",
    fechaCitaSugerida: "",
    horaCitaSugerida: "",
    newsletter: false,
    politicaPrivacidad: false,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Smooth scroll function with easing
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.offsetTop - headerHeight

      // Smooth scroll with custom easing
      const startPosition = window.pageYOffset
      const distance = elementPosition - startPosition
      const duration = 1000
      let start: number | null = null

      function animation(currentTime: number) {
        if (start === null) start = currentTime
        const timeElapsed = currentTime - start
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration)
        window.scrollTo(0, run)
        if (timeElapsed < duration) requestAnimationFrame(animation)
      }

      function easeInOutCubic(t: number, b: number, c: number, d: number) {
        t /= d / 2
        if (t < 1) return (c / 2) * t * t * t + b
        t -= 2
        return (c / 2) * (t * t * t + 2) + b
      }

      requestAnimationFrame(animation)
    }
    setIsMenuOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        alert("Gracias por tu interés. Nos pondremos en contacto contigo pronto.")

        // Reset form
        setFormData({
          nombre: "",
          apellido: "",
          organizacion: "",
          email: "",
          pais: "",
          codigoArea: "",
          numero: "",
          informacionAdicional: "",
          mensaje: "",
          fechaCitaSugerida: "",
          horaCitaSugerida: "",
          newsletter: false,
          politicaPrivacidad: false,
        })
      } else {
        throw new Error(result.message || "Error al enviar el formulario")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const openPrivacyModal = () => {
    setIsPrivacyModalOpen(true)
  }

  const closePrivacyModal = () => {
    setIsPrivacyModalOpen(false)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50 font-inter">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-aukan-dark-blue z-50 shadow-lg transition-all duration-300">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center lg:ml-8 xl:ml-12">
            <Logo
              variant="header"
              width={160}
              height={48}
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("inicio")}
              className="text-slate-300 hover:text-white transition-all duration-300 hover:scale-105"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("quienes-somos")}
              className="text-slate-300 hover:text-white transition-all duration-300 hover:scale-105"
            >
              Quiénes somos
            </button>
            <button
              onClick={() => scrollToSection("soluciones")}
              className="text-slate-300 hover:text-white transition-all duration-300 hover:scale-105"
            >
              Soluciones
            </button>
            <Button
              onClick={() => scrollToSection("contacto")}
              className="bg-aukan-lime-green text-aukan-dark-blue hover:bg-aukan-lime-green/90 rounded-xl px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Contacto
            </Button>
            {/* Language Switcher */}
            <div className="ml-4 border-l border-slate-400 pl-4">
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white transition-transform duration-300 hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-aukan-dark-blue border-t border-aukan-gray-green transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            <button
              onClick={() => scrollToSection("inicio")}
              className="block text-slate-300 hover:text-white transition-colors duration-300"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("quienes-somos")}
              className="block text-slate-300 hover:text-white transition-colors duration-300"
            >
              Quiénes somos
            </button>
            <button
              onClick={() => scrollToSection("soluciones")}
              className="block text-slate-300 hover:text-white transition-colors duration-300"
            >
              Soluciones
            </button>
            <Button
              onClick={() => scrollToSection("contacto")}
              className="bg-aukan-lime-green text-aukan-dark-blue hover:bg-aukan-lime-green/90 rounded-xl px-6 w-full transition-all duration-300"
            >
              Contacto
            </Button>
            <div className="py-2 border-t border-slate-400 mt-4 pt-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Mountain Background */}
      <section id="inicio" className="relative min-h-screen overflow-hidden">
        {/* Mountain Background with Clip Animation */}
        <div className="absolute inset-0">
          <div className="mountain-clip-container">
            <Image
              src="/mountain-landscape.avif"
              alt="Paisaje montañoso sostenible"
              fill
              className="mountain-background-optimized"
              priority
              quality={95}
              sizes="100vw"
            />
          </div>
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-aukan-dark-blue/70 via-aukan-dark-blue/50 to-aukan-gray-green/60"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-4 lg:px-8 xl:px-12 py-32">
            <div className="max-w-4xl mx-auto text-white">
              <FadeIn delay={100}>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-center md:text-justify">
                  Transformando Desafíos en Oportunidades Sostenibles
                </h1>
              </FadeIn>
              <FadeIn delay={300}>
                <p className="text-xl md:text-2xl mb-8 text-slate-200 leading-relaxed text-justify">
                  Brindamos soluciones expertas enfocadas en el sector energético, para medir, analizar y reducir tu
                  huella de carbono, junto con auditorías legales ambientales. Te ayudamos a crear valor y asegurar la
                  viabilidad de tu negocio en un mundo en transición hacia la sostenibilidad y la responsabilidad
                  ambiental.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder for rest of content - Copy remaining content here */}
      <section id="quienes-somos" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <p>Rest of content will be preserved...</p>
        </div>
      </section>
    </div>
  )
}
