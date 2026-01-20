"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations"
import { useLanguage } from "@/context/LanguageContext"
import { getTranslation } from "@/lib/translations"

interface PrivacyPolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  const { language } = useLanguage()
  const t = (key: string) => getTranslation(language, key)

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
          <h2 className="text-2xl font-bold">{t("privacyPolicy.title")}</h2>
          <Button onClick={onClose} variant="ghost" size="sm" className="text-white hover:bg-white/20 rounded-full p-2">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] px-6 py-6">
          <div className="space-y-6 text-aukan-gray-green leading-relaxed">
            <FadeIn delay={100}>
              <div>
                <h3 className="text-xl font-semibold text-aukan-dark-blue mb-3">{t("privacyPolicy.section1Title")}</h3>
                <p className="text-justify">
                  {t("privacyPolicy.section1Content")}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div>
                <h3 className="text-xl font-semibold text-aukan-dark-blue mb-3">{t("privacyPolicy.section2Title")}</h3>
                <p className="text-justify">
                  {t("privacyPolicy.section2Content")}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={300}>
              <div>
                <h3 className="text-xl font-semibold text-aukan-dark-blue mb-3">{t("privacyPolicy.section3Title")}</h3>
                <p className="text-justify">
                  {t("privacyPolicy.section3Content")}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div>
                <h3 className="text-xl font-semibold text-aukan-dark-blue mb-3">{t("privacyPolicy.section4Title")}</h3>
                <p className="text-justify">
                  {t("privacyPolicy.section4Content")}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={500}>
              <div>
                <h3 className="text-xl font-semibold text-aukan-dark-blue mb-3">{t("privacyPolicy.section5Title")}</h3>
                <p className="text-justify">
                  {t("privacyPolicy.section5Content")}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={600}>
              <div>
                <h3 className="text-xl font-semibold text-aukan-dark-blue mb-3">{t("privacyPolicy.section6Title")}</h3>
                <p className="text-justify">
                  {t("privacyPolicy.section6Content")}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={700}>
              <div>
                <h3 className="text-xl font-semibold text-aukan-dark-blue mb-3">{t("privacyPolicy.section7Title")}</h3>
                <p className="text-justify">
                  {t("privacyPolicy.section7Content")}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={800}>
              <div>
                <h3 className="text-xl font-semibold text-aukan-dark-blue mb-3">{t("privacyPolicy.section8Title")}</h3>
                <p className="text-justify">
                  {t("privacyPolicy.section8Content")}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={900}>
              <div>
                <h3 className="text-xl font-semibold text-aukan-dark-blue mb-3">{t("privacyPolicy.section9Title")}</h3>
                <p className="text-justify">
                  {t("privacyPolicy.section9Content")}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={1000}>
              <div className="bg-aukan-sand/20 p-6 rounded-lg">
                <p className="text-sm text-aukan-gray-green text-justify">
                  <strong>{t("privacyPolicy.lastUpdated")}</strong>{" "}
                  {new Date().toLocaleDateString(language === "en" ? "en-US" : "es-ES", { year: "numeric", month: "long", day: "numeric" })}
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
              {t("privacyPolicy.closeButton")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
