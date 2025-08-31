"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations"

interface PrivacyPolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-aukan-dark-blue text-white px-6 py-4 flex items-center justify-between border-b">
          <h2 className="text-2xl font-bold">Política de Privacidad</h2>
          <Button onClick={onClose} variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full p-2">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] px-6 py-6">
          <div className="space-y-6 text-aukan-gray-green leading-relaxed">
            <FadeIn delay={100}>
              <div>
                <h3 className="text-xl font-semibold text-aukan-dark-blue mb-3">1. Información que Recopilamos</h3>
                <p className="text-justify">
                  En AUKAN Sustentable recopilamos información personal que usted nos proporciona voluntariamente a
                  través de nuestros formularios de contacto, incluyendo nombre, apellido, organización, correo
                  electrónico, país, número de teléfono y cualquier información adicional que decida compartir con
                  nosotros.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div>
                <h3 className="text-xl font-semibold text-aukan-dark-blue mb-3">2. Uso de la Información</h3>
                <p className="text-justify">
                  Utilizamos su información personal para: responder a sus consultas y solicitudes, programar citas y
                  reuniones, enviar información sobre nuestros servicios (solo si se suscribe a nuestro newsletter),
                  mejorar nuestros servicios y cumplir con obligaciones legales aplicables.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div>
                <h3 className="text-xl font-semibold text-aukan-dark-blue mb-3">3. Protección de Datos</h3>
                <p className="text-justify">
                  Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información
                  personal contra acceso no autorizado, alteración, divulgación o destrucción. Sus datos se almacenan de
                  forma segura y solo son accesibles por personal autorizado.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div>
                <h3 className="text-xl font-semibold text-aukan-dark-blue mb-3">4. Compartir Información</h3>
                <p className="text-justify">
                  No vendemos, intercambiamos o transferimos su información personal a terceros sin su consentimiento,
                  excepto cuando sea necesario para proporcionar nuestros servicios o cuando lo requiera la ley.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={500}>
              <div>
                <h3 className="text-xl font-semibold text-aukan-dark-blue mb-3">5. Sus Derechos</h3>
                <p className="text-justify">
                  Usted tiene derecho a acceder, rectificar, eliminar o limitar el procesamiento de sus datos
                  personales. También puede retirar su consentimiento en cualquier momento. Para ejercer estos derechos,
                  contáctenos a través de contacto@aukan.com.ar.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={600}>
              <div>
                <h3 className="text-xl font-semibold text-aukan-dark-blue mb-3">6. Retención de Datos</h3>
                <p className="text-justify">
                  Conservamos su información personal solo durante el tiempo necesario para cumplir con los propósitos
                  para los cuales fue recopilada, o según lo requieran las obligaciones legales aplicables.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={700}>
              <div>
                <h3 className="text-xl font-semibold text-aukan-dark-blue mb-3">7. Cookies y Tecnologías Similares</h3>
                <p className="text-justify">
                  Nuestro sitio web puede utilizar cookies y tecnologías similares para mejorar su experiencia de
                  navegación. Estas tecnologías nos ayudan a recordar sus preferencias y analizar el uso de nuestro
                  sitio web.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={800}>
              <div>
                <h3 className="text-xl font-semibold text-aukan-dark-blue mb-3">8. Cambios en la Política</h3>
                <p className="text-justify">
                  Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Los cambios
                  serán efectivos inmediatamente después de su publicación en nuestro sitio web. Le recomendamos revisar
                  periódicamente esta política.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={900}>
              <div>
                <h3 className="text-xl font-semibold text-aukan-dark-blue mb-3">9. Contacto</h3>
                <p className="text-justify">
                  Si tiene preguntas sobre esta Política de Privacidad o sobre el tratamiento de sus datos personales,
                  puede contactarnos en contacto@aukan.com.ar.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={1000}>
              <div className="bg-aukan-sand/20 p-6 rounded-lg">
                <p className="text-sm text-aukan-gray-green text-justify">
                  <strong>Última actualización:</strong>{" "}
                  {new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t">
          <div className="flex justify-end">
            <Button
              onClick={onClose}
              className="bg-aukan-lime-green text-aukan-dark-blue hover:bg-aukan-lime-green/90 px-6"
            >
              Entendido
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
