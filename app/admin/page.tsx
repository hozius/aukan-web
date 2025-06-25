"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"
import { Logo } from "@/components/logo"

interface Solution {
  id: number
  title: string
  description: string
  category: string
  services: Array<{
    name: string
    description: string
  }>
  display_order: number
  is_active: boolean
}

interface ContactForm {
  id: number
  nombre: string
  apellido: string
  organizacion: string
  email: string
  pais: string
  codigo_area?: string
  numero?: string
  informacion_adicional?: string
  mensaje?: string
  fecha_cita_sugerida?: string
  hora_cita_sugerida?: string
  newsletter_subscription: boolean
  status: string
  created_at: string
}

export default function AdminPanel() {
  const [solutions, setSolutions] = useState<Solution[]>([])
  const [contactForms, setContactForms] = useState<ContactForm[]>([])
  const [activeTab, setActiveTab] = useState<"solutions" | "contacts">("solutions")
  const [editingSolution, setEditingSolution] = useState<Solution | null>(null)
  const [isAddingNew, setIsAddingNew] = useState(false)

  const [newSolution, setNewSolution] = useState({
    title: "",
    description: "",
    category: "",
    services: [{ name: "", description: "" }],
    display_order: 0,
    is_active: true,
  })

  useEffect(() => {
    fetchSolutions()
    fetchContactForms()
  }, [])

  const fetchSolutions = async () => {
    try {
      const response = await fetch("/api/admin/solutions")
      if (response.ok) {
        const data = await response.json()
        setSolutions(data)
      }
    } catch (error) {
      console.error("Error fetching solutions:", error)
    }
  }

  const fetchContactForms = async () => {
    try {
      const response = await fetch("/api/admin/contact-forms")
      if (response.ok) {
        const data = await response.json()
        setContactForms(data)
      }
    } catch (error) {
      console.error("Error fetching contact forms:", error)
    }
  }

  const saveSolution = async (solution: Partial<Solution>) => {
    try {
      const url = solution.id ? `/api/admin/solutions/${solution.id}` : "/api/admin/solutions"
      const method = solution.id ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(solution),
      })

      if (response.ok) {
        fetchSolutions()
        setEditingSolution(null)
        setIsAddingNew(false)
        setNewSolution({
          title: "",
          description: "",
          category: "",
          services: [{ name: "", description: "" }],
          display_order: 0,
          is_active: true,
        })
      }
    } catch (error) {
      console.error("Error saving solution:", error)
    }
  }

  const deleteSolution = async (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta solución?")) {
      try {
        const response = await fetch(`/api/admin/solutions/${id}`, {
          method: "DELETE",
        })
        if (response.ok) {
          fetchSolutions()
        }
      } catch (error) {
        console.error("Error deleting solution:", error)
      }
    }
  }

  const updateContactStatus = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/admin/contact-forms/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })
      if (response.ok) {
        fetchContactForms()
      }
    } catch (error) {
      console.error("Error updating contact status:", error)
    }
  }

  const addService = (services: Array<{ name: string; description: string }>) => {
    return [...services, { name: "", description: "" }]
  }

  const removeService = (services: Array<{ name: string; description: string }>, index: number) => {
    return services.filter((_, i) => i !== index)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <Logo
            variant="compact"
            width={120}
            height={36}
            className="transition-transform duration-300 hover:scale-105"
          />
          <h1 className="text-3xl font-bold text-aukan-dark-blue">Panel de Administración</h1>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <Button
            onClick={() => setActiveTab("solutions")}
            variant={activeTab === "solutions" ? "default" : "outline"}
            className={activeTab === "solutions" ? "bg-aukan-dark-blue" : ""}
          >
            Gestionar Soluciones
          </Button>
          <Button
            onClick={() => setActiveTab("contacts")}
            variant={activeTab === "contacts" ? "default" : "outline"}
            className={activeTab === "contacts" ? "bg-aukan-dark-blue" : ""}
          >
            Formularios de Contacto
          </Button>
        </div>

        {/* Solutions Tab */}
        {activeTab === "solutions" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-aukan-gray-green">Soluciones</h2>
              <Button
                onClick={() => setIsAddingNew(true)}
                className="bg-aukan-lime-green text-aukan-dark-blue hover:bg-aukan-lime-green/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Solución
              </Button>
            </div>

            {/* Add New Solution Form */}
            {isAddingNew && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    Nueva Solución
                    <Button onClick={() => setIsAddingNew(false)} variant="outline" size="sm">
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Título"
                    value={newSolution.title}
                    onChange={(e) => setNewSolution({ ...newSolution, title: e.target.value })}
                  />
                  <Textarea
                    placeholder="Descripción"
                    value={newSolution.description}
                    onChange={(e) => setNewSolution({ ...newSolution, description: e.target.value })}
                  />
                  <Input
                    placeholder="Categoría"
                    value={newSolution.category}
                    onChange={(e) => setNewSolution({ ...newSolution, category: e.target.value })}
                  />

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Servicios:</label>
                    {newSolution.services.map((service, index) => (
                      <div key={index} className="border p-4 rounded space-y-2">
                        <Input
                          placeholder="Nombre del servicio"
                          value={service.name}
                          onChange={(e) => {
                            const updatedServices = [...newSolution.services]
                            updatedServices[index].name = e.target.value
                            setNewSolution({ ...newSolution, services: updatedServices })
                          }}
                        />
                        <Textarea
                          placeholder="Descripción del servicio"
                          value={service.description}
                          onChange={(e) => {
                            const updatedServices = [...newSolution.services]
                            updatedServices[index].description = e.target.value
                            setNewSolution({ ...newSolution, services: updatedServices })
                          }}
                        />
                        {newSolution.services.length > 1 && (
                          <Button
                            onClick={() =>
                              setNewSolution({
                                ...newSolution,
                                services: removeService(newSolution.services, index),
                              })
                            }
                            variant="destructive"
                            size="sm"
                          >
                            Eliminar Servicio
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      onClick={() =>
                        setNewSolution({
                          ...newSolution,
                          services: addService(newSolution.services),
                        })
                      }
                      variant="outline"
                      size="sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar Servicio
                    </Button>
                  </div>

                  <Button
                    onClick={() => saveSolution(newSolution)}
                    className="bg-aukan-lime-green text-aukan-dark-blue hover:bg-aukan-lime-green/90"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Solución
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Solutions List */}
            <div className="grid gap-6">
              {solutions.map((solution) => (
                <Card key={solution.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      {solution.title}
                      <div className="flex space-x-2">
                        <Button onClick={() => setEditingSolution(solution)} variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button onClick={() => deleteSolution(solution.id)} variant="destructive" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{solution.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Servicios:</h4>
                      {solution.services.map((service, index) => (
                        <div key={index} className="pl-4 border-l-2 border-aukan-lime-green">
                          <h5 className="font-medium">{service.name}</h5>
                          <p className="text-sm text-gray-600">{service.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Contact Forms Tab */}
        {activeTab === "contacts" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-aukan-gray-green">Formularios de Contacto</h2>

            <div className="grid gap-6">
              {contactForms.map((form) => (
                <Card key={form.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      {form.nombre} {form.apellido} - {form.organizacion}
                      <select
                        value={form.status}
                        onChange={(e) => updateContactStatus(form.id, e.target.value)}
                        className="px-3 py-1 border rounded"
                      >
                        <option value="pending">Pendiente</option>
                        <option value="contacted">Contactado</option>
                        <option value="completed">Completado</option>
                      </select>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p>
                          <strong>Email:</strong> {form.email}
                        </p>
                        <p>
                          <strong>País:</strong> {form.pais}
                        </p>
                        {form.codigo_area && form.numero && (
                          <p>
                            <strong>Teléfono:</strong> +{form.codigo_area} {form.numero}
                          </p>
                        )}
                        {form.fecha_cita_sugerida && (
                          <p>
                            <strong>Fecha sugerida:</strong> {form.fecha_cita_sugerida}
                          </p>
                        )}
                        {form.hora_cita_sugerida && (
                          <p>
                            <strong>Hora sugerida:</strong> {form.hora_cita_sugerida}
                          </p>
                        )}
                      </div>
                      <div>
                        {form.informacion_adicional && (
                          <div className="mb-4">
                            <strong>Información adicional:</strong>
                            <p className="text-sm text-gray-600">{form.informacion_adicional}</p>
                          </div>
                        )}
                        {form.mensaje && (
                          <div>
                            <strong>Mensaje:</strong>
                            <p className="text-sm text-gray-600">{form.mensaje}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-500">
                      <p>Enviado: {new Date(form.created_at).toLocaleString()}</p>
                      {form.newsletter_subscription && (
                        <p className="text-aukan-lime-green">✓ Suscrito al newsletter</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
