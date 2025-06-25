import { type NextRequest, NextResponse } from "next/server"

// PUT - Actualizar estado del formulario de contacto
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { id } = params

    const response = await fetch(`${process.env.LARAVEL_API_URL}/api/admin/contact-forms/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LARAVEL_API_TOKEN}`,
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error("Error al actualizar el formulario")
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error updating contact form:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
