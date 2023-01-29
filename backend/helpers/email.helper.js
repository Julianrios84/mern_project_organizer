import nodemailer from 'nodemailer'

export const registerEmail = (data) => {
  const { email, name, token } = data
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })
  const info = await transport.sendMail({
    from: `"${process.env.APP_NAME}" - <account@projecmanager.com>`,
    to: email,
    subject: `${process.env.APP_NAME} - Comprueba tu cuenta`,
    text: `Comprueba tu cuenta en ${process.env.APP_NAME}`,
    html: `
      <p>Hola: ${name} confirma tu cuenta en ${process.env.APP_NAME}</p>
      <p>
        Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirmar cuenta</a>
      </p>
      <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    `
  })
}