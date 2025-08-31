"use client"

import type React from "react"

import { useState } from "react"
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

export default function AukanLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
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
          className={`md:hidden bg-aukan-dark-blue border-t border-aukan-gray-green transition-all duration-300 overflow-hidden ${isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
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

      {/* Quiénes Somos Section */}
      <section id="quienes-somos" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
            <SlideIn direction="left">
              <h2 className="text-3xl md:text-4xl font-bold text-aukan-dark-blue mb-6 uppercase text-center md:text-justify">
                Tu socio estratégico en sostenibilidad
              </h2>
              <div className="space-y-6 text-aukan-gray-green text-lg leading-relaxed">
                <FadeIn delay={200}>
                  <p className="text-justify">
                    En AUKAN, somos tu socio estratégico en sostenibilidad y medio ambiente. Nos impulsa la meta de
                    generar, junto a nuestros clientes, un impacto positivo y medible, acelerando la transición hacia
                    operaciones más sostenibles y bajas en carbono.
                  </p>
                </FadeIn>
                <FadeIn delay={400}>
                  <p className="text-justify">
                    Aplicamos nuestra vasta experiencia y conocimiento en el sector energético para crear valor
                    duradero, fortalecer la resiliencia climática y asegurar la viabilidad de negocios comprometidos con
                    el medio ambiente y la sociedad.
                  </p>
                </FadeIn>
              </div>
            </SlideIn>
            <SlideIn direction="right" delay={300}>
              <div className="relative w-full h-96 md:h-[400px]">
                <Image
                  src="/sustainability-blocks.jpg"
                  alt="Bloques de sostenibilidad - Net Zero, reciclaje y responsabilidad ambiental"
                  fill
                  className="sustainability-blocks-muted-image-optimized rounded-2xl shadow-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay gradient for better integration */}
                <div className="absolute inset-0 bg-gradient-to-br from-aukan-dark-blue/10 via-transparent to-aukan-lime-green/10 rounded-2xl pointer-events-none"></div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Soluciones Section */}
      <section id="soluciones" className="py-12 lg:py-20 bg-aukan-sand/20">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <FadeIn>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-aukan-dark-blue mb-6 uppercase">
                Nuestras Soluciones
              </h2>

              {/* Restructured Content */}
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-aukan-gray-green leading-relaxed text-justify mb-8">
                  Nos especializamos en las necesidades de la industria energética, incluyendo:
                </p>

                {/* Industry Icons */}
                <IndustryIcons />

                {/* Portfolio Description */}
                <FadeIn delay={400}>
                  <p className="text-lg text-aukan-gray-green leading-relaxed text-justify">
                    Un portafolio de servicios diseñado para guiarte en cada paso de tu transformación hacia la
                    sostenibilidad y el cumplimiento ambiental.
                  </p>
                </FadeIn>
              </div>
            </div>
          </FadeIn>

          <SolutionsGrid />
        </div>
      </section>

      {/* Propuesta de Valor Section */}
      <section id="propuesta-valor" className="py-12 lg:py-20 bg-aukan-gray-green">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <FadeIn>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 uppercase">Nuestra Propuesta de Valor</h2>
              <p className="text-xl text-slate-200 text-justify max-w-4xl mx-auto">
                Cuatro pilares fundamentales que garantizan el éxito de tu estrategia de sostenibilidad y aseguran
                resultados medibles en tu transformación hacia operaciones más responsables y eficientes.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              {
                title: "Servicio integral y estratégico",
                description:
                  "Ofrecemos un acompañamiento completo desde el diagnóstico inicial hasta la verificación externa, asegurando que cada etapa del proceso esté alineada con tus objetivos de sostenibilidad.",
                icon: Target,
                delay: 100,
              },
              {
                title: "Adaptabilidad y soluciones a medida",
                description:
                  "Desarrollamos estrategias personalizadas que se adaptan a las particularidades de tu sector, necesidades específicas y contexto operacional único.",
                icon: Users,
                delay: 200,
              },
              {
                title: "Profesionalismo y experiencia",
                description:
                  "Nuestro servicio se basa en el rigor técnico, las mejores prácticas internacionales y años de experiencia en el sector energético y ambiental.",
                icon: Award,
                delay: 300,
              },
              {
                title: "Resultados y creación de Valor",
                description:
                  "Te ayudamos a optimizar procesos, reducir costos operativos, mejorar tu competitividad y generar valor sostenible a largo plazo para tu organización.",
                icon: Zap,
                delay: 400,
              },
            ].map((pillar, index) => (
              <FadeIn key={index} delay={pillar.delay}>
                <div className="text-center group">
                  <div className="bg-white/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-white/20">
                    <pillar.icon className="w-10 h-10 text-aukan-lime-green transition-all duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 transition-colors duration-300 group-hover:text-aukan-lime-green">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-200 text-justify leading-relaxed">{pillar.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="py-12 lg:py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <FadeIn>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-aukan-dark-blue mb-4 uppercase">
                Iniciemos el Camino Hacia un Futuro Sostenible
              </h2>
              <p className="text-lg text-aukan-gray-green max-w-3xl mx-auto text-justify">
                Contáctanos hoy mismo para una conversación inicial sin compromiso. Descubre cómo en AUKAN podemos
                ayudarte a transformar tus desafíos de sostenibilidad en tu mayor ventaja competitiva.
              </p>
            </div>
          </FadeIn>

          <ScaleIn delay={300}>
            <div className="max-w-4xl mx-auto">
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-lg p-8 transition-all duration-300 hover:shadow-xl"
              >
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <FadeIn delay={100}>
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium text-aukan-gray-green mb-2">
                        Nombre *
                      </label>
                      <Input
                        type="text"
                        id="nombre"
                        name="nombre"
                        required
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className="w-full transition-all duration-300 focus:scale-105"
                      />
                    </div>
                  </FadeIn>
                  <FadeIn delay={200}>
                    <div>
                      <label htmlFor="apellido" className="block text-sm font-medium text-aukan-gray-green mb-2">
                        Apellido *
                      </label>
                      <Input
                        type="text"
                        id="apellido"
                        name="apellido"
                        required
                        value={formData.apellido}
                        onChange={handleInputChange}
                        className="w-full transition-all duration-300 focus:scale-105"
                      />
                    </div>
                  </FadeIn>
                </div>

                <FadeIn delay={300}>
                  <div className="mb-4">
                    <label htmlFor="organizacion" className="block text-sm font-medium text-aukan-gray-green mb-2">
                      Organización *
                    </label>
                    <Input
                      type="text"
                      id="organizacion"
                      name="organizacion"
                      required
                      value={formData.organizacion}
                      onChange={handleInputChange}
                      className="w-full transition-all duration-300 focus:scale-105"
                    />
                  </div>
                </FadeIn>

                <FadeIn delay={400}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-aukan-gray-green mb-2">
                      Correo electrónico de la organización *
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full transition-all duration-300 focus:scale-105"
                    />
                  </div>
                </FadeIn>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <FadeIn delay={500}>
                    <div>
                      <label htmlFor="pais" className="block text-sm font-medium text-aukan-gray-green mb-2">
                        País *
                      </label>
                      <Input
                        type="text"
                        id="pais"
                        name="pais"
                        required
                        value={formData.pais}
                        onChange={handleInputChange}
                        className="w-full transition-all duration-300 focus:scale-105"
                      />
                    </div>
                  </FadeIn>
                  <FadeIn delay={600}>
                    <div>
                      <label htmlFor="codigoArea" className="block text-sm font-medium text-aukan-gray-green mb-2">
                        Código de Área
                      </label>
                      <Input
                        type="text"
                        id="codigoArea"
                        name="codigoArea"
                        value={formData.codigoArea}
                        onChange={handleInputChange}
                        className="w-full transition-all duration-300 focus:scale-105"
                      />
                    </div>
                  </FadeIn>
                  <FadeIn delay={700}>
                    <div>
                      <label htmlFor="numero" className="block text-sm font-medium text-aukan-gray-green mb-2">
                        Número
                      </label>
                      <Input
                        type="text"
                        id="numero"
                        name="numero"
                        value={formData.numero}
                        onChange={handleInputChange}
                        className="w-full transition-all duration-300 focus:scale-105"
                      />
                    </div>
                  </FadeIn>
                </div>

                <FadeIn delay={900}>
                  <div className="mb-6">
                    <label htmlFor="mensaje" className="block text-sm font-medium text-aukan-gray-green mb-2">
                      Mensaje
                    </label>
                    <Textarea
                      id="mensaje"
                      name="mensaje"
                      rows={4}
                      value={formData.mensaje}
                      onChange={handleInputChange}
                      className="w-full transition-all duration-300 focus:scale-105"
                    />
                  </div>
                </FadeIn>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <FadeIn delay={1000}>
                    <div>
                      <label
                        htmlFor="fechaCitaSugerida"
                        className="block text-sm font-medium text-aukan-gray-green mb-2"
                      >
                        Fecha de cita sugerida (opcional)
                      </label>
                      <Input
                        type="date"
                        id="fechaCitaSugerida"
                        name="fechaCitaSugerida"
                        value={formData.fechaCitaSugerida}
                        onChange={handleInputChange}
                        className="w-full transition-all duration-300 focus:scale-105"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                  </FadeIn>
                  <FadeIn delay={1100}>
                    <div>
                      <label
                        htmlFor="horaCitaSugerida"
                        className="block text-sm font-medium text-aukan-gray-green mb-2"
                      >
                        Hora de cita sugerida (opcional)
                      </label>
                      <Input
                        type="time"
                        id="horaCitaSugerida"
                        name="horaCitaSugerida"
                        value={formData.horaCitaSugerida}
                        onChange={handleInputChange}
                        className="w-full transition-all duration-300 focus:scale-105"
                        min="08:00"
                        max="18:00"
                      />
                    </div>
                  </FadeIn>
                </div>

                <FadeIn delay={1200}>
                  <div className="mb-6 space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="newsletter"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleInputChange}
                        className="mr-2 transition-transform duration-300 hover:scale-110"
                      />
                      <label htmlFor="newsletter" className="text-sm text-aukan-gray-green">
                        Me quiero suscribir al newsletter
                      </label>
                    </div>

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="politicaPrivacidad"
                        name="politicaPrivacidad"
                        required
                        checked={formData.politicaPrivacidad}
                        onChange={handleInputChange}
                        className="mr-2 mt-1 transition-transform duration-300 hover:scale-110"
                      />
                      <label htmlFor="politicaPrivacidad" className="text-sm text-aukan-gray-green">
                        Al enviar este formulario, aceptas que AUKAN Sustentable pueda almacenar y procesar tus datos
                        personales como se describe en nuestra{" "}
                        <button
                          type="button"
                          onClick={openPrivacyModal}
                          className="text-aukan-dark-blue underline hover:text-aukan-lime-green transition-colors duration-300"
                        >
                          Política de Privacidad
                        </button>
                        . *
                      </label>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={1300}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-aukan-lime-green text-aukan-dark-blue hover:bg-aukan-lime-green/90 rounded-xl py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                  </Button>
                </FadeIn>
              </form>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-aukan-dark-blue text-white py-8 lg:py-12">
        <div className="container mx-auto px-4 lg:px-8 xl:px-12">
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <FadeIn delay={100}>
              <div>
                <Logo
                  variant="footer"
                  width={180}
                  height={54}
                  className="mb-4 transition-transform duration-300 hover:scale-105"
                />
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div>
                <h3 className="text-xl font-bold mb-4">Contacto</h3>
                <div className="space-y-2">
                  <div className="flex items-center transition-transform duration-300 hover:translate-x-2">
                    <Mail className="w-5 h-5 mr-2" />
                    <a
                      href="mailto:contacto@aukan.com.ar"
                      className="text-slate-300 hover:text-white transition-colors duration-300"
                    >
                      contacto@aukan.com.ar
                    </a>
                  </div>
                  <div className="flex items-center transition-transform duration-300 hover:translate-x-2">
                    <Phone className="w-5 h-5 mr-2" />
                    <a
                      href="https://api.whatsapp.com/send?phone=5492215250155"
                      className="text-slate-300 hover:text-white transition-colors duration-300"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={300}>
            <div className="border-t border-aukan-gray-green pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-slate-300 text-center md:text-left">
                  &copy; {new Date().getFullYear()} AUKAN Sustentable. Todos los derechos reservados.
                </p>
                <div className="flex space-x-6">
                  <button
                    onClick={openPrivacyModal}
                    className="text-slate-300 hover:text-white transition-colors duration-300 text-sm underline"
                  >
                    Política de Privacidad
                  </button>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal isOpen={isPrivacyModalOpen} onClose={closePrivacyModal} />

      {/* Floating Message Button */}
      <a
        href="mailto:contacto@aukan.com.ar"
        className="fixed bottom-6 right-6 bg-aukan-lime-green text-aukan-dark-blue p-4 rounded-full shadow-lg hover:bg-aukan-lime-green/90 transition-all duration-300 z-40 hover:scale-110"
        target="_blank"
        rel="noopener noreferrer"
      >
        
        <Mail className="w-6 h-6" />
      </a>
    </div>
  )
}
