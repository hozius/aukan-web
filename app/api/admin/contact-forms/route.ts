import { NextResponse } from "next/server"

// GET - Obtener todos los formularios de contacto
export async function GET() {
  try {
    const response = await fetch(`${process.env.LARAVEL_API_URL}/api/admin/contact-forms`, {
      headers: {
        Authorization: `Bearer ${process.env.LARAVEL_API_TOKEN}`,
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Error al obtener los formularios")
    }

    const contactForms = await response.json()
    return NextResponse.json(contactForms)
  } catch (error) {
    console.error("Error fetching contact forms:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
