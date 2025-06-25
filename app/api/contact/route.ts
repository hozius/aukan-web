import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Crear el transportador SMTP
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Formatear el contenido del mensaje
    const emailContent = `
Nuevo contacto desde la página web de AUKAN

INFORMACIÓN DE CONTACTO:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Nombre: ${formData.nombre} ${formData.apellido}
Organización: ${formData.organizacion}
Email: ${formData.email}
País: ${formData.pais}
${formData.codigoArea ? `Código de Área: ${formData.codigoArea}` : ''}
${formData.numero ? `Número: ${formData.numero}` : ''}

INFORMACIÓN ADICIONAL:
━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.informacionAdicional || 'No se proporcionó información adicional'}

MENSAJE:
━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.mensaje || 'No se proporcionó mensaje adicional'}

CITA SUGERIDA:
━━━━━━━━━━━━━━━━━━━━━━━━━━
${formData.fechaCitaSugerida ? `Fecha: ${formData.fechaCitaSugerida}` : 'Fecha: No especificada'}
${formData.horaCitaSugerida ? `Hora: ${formData.horaCitaSugerida}` : 'Hora: No especificada'}

PREFERENCIAS:
━━━━━━━━━━━━━━━━━━━━━━━━━━
Newsletter: ${formData.newsletter ? 'Sí' : 'No'}
Política de Privacidad: ${formData.politicaPrivacidad ? 'Aceptada' : 'No aceptada'}

━━━━━━━━━━━━━━━━━━━━━━━━━━
Enviado desde: ${request.headers.get('host')}
Fecha: ${new Date().toLocaleString('es-ES', { 
  timeZone: 'America/Santiago',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}
    `.trim()

    // Configurar el mensaje
    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: `Nuevo contacto de ${formData.nombre} ${formData.apellido} - ${formData.organizacion}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>').replace(/━/g, '─'),
    }

    // Enviar el correo
    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Correo enviado exitosamente' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error enviando correo:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error al enviar el correo',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}
