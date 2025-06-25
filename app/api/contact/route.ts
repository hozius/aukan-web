import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar datos requeridos
    const requiredFields = ["nombre", "apellido", "organizacion", "email", "pais"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `El campo ${field} es requerido` }, { status: 400 })
      }
    }

    // Aquí harías la llamada a tu API de Laravel
    const laravelResponse = await fetch(`${process.env.LARAVEL_API_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.LARAVEL_API_TOKEN}`,
      },
      body: JSON.stringify({
        nombre: body.nombre,
        apellido: body.apellido,
        organizacion: body.organizacion,
        email: body.email,
        pais: body.pais,
        codigo_area: body.codigoArea,
        numero: body.numero,
        informacion_adicional: body.informacionAdicional,
        mensaje: body.mensaje,
        fecha_cita_sugerida: body.fechaCitaSugerida,
        hora_cita_sugerida: body.horaCitaSugerida,
        newsletter_subscription: body.newsletter,
        politica_privacidad: body.politicaPrivacidad,
      }),
    })

    if (!laravelResponse.ok) {
      throw new Error("Error al comunicarse con el servidor")
    }

    const result = await laravelResponse.json()

    return NextResponse.json({
      success: true,
      message: "Formulario enviado exitosamente",
      data: result,
    })
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
