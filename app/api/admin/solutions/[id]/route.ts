import { type NextRequest, NextResponse } from "next/server"

// PUT - Actualizar solución
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { id } = params

    const response = await fetch(`${process.env.LARAVEL_API_URL}/api/admin/solutions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LARAVEL_API_TOKEN}`,
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error("Error al actualizar la solución")
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error updating solution:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

// DELETE - Eliminar solución
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    const response = await fetch(`${process.env.LARAVEL_API_URL}/api/admin/solutions/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.LARAVEL_API_TOKEN}`,
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Error al eliminar la solución")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting solution:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
