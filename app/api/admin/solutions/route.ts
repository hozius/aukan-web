import { type NextRequest, NextResponse } from "next/server"

// GET - Obtener todas las soluciones
export async function GET() {
  try {
    // Aquí harías la llamada a tu API de Laravel
    const response = await fetch(`${process.env.LARAVEL_API_URL}/api/admin/solutions`, {
      headers: {
        Authorization: `Bearer ${process.env.LARAVEL_API_TOKEN}`,
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Error al obtener las soluciones")
    }

    const solutions = await response.json()
    return NextResponse.json(solutions)
  } catch (error) {
    console.error("Error fetching solutions:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

// POST - Crear nueva solución
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const response = await fetch(`${process.env.LARAVEL_API_URL}/api/admin/solutions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LARAVEL_API_TOKEN}`,
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error("Error al crear la solución")
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error creating solution:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
