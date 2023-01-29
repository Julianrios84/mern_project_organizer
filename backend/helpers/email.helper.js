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
   await transport.sendMail({
    from: `"${process.env.APP_NAME}" - <account@projectmanager.com>`,
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


export const forgetPasswordEmail = (data) => {
  const { email, name, token } = data
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })
  await transport.sendMail({
    from: `"${process.env.APP_NAME}" - <account@projectmanager.com>`,
    to: email,
    subject: `${process.env.APP_NAME} - Reestablece tu contraseña`,
    text: `Reestablece tu contraseña en ${process.env.APP_NAME}`,
    html: `
      <p>Hola: ${name} has solicitado reestablecer tu contraseña en ${process.env.APP_NAME}</p>
      <p>
        Sigue el siguiente enlace para generar una nueva contraseña:
        <a href="${process.env.FRONTEND_URL}/reset/${token}">Reestablecer contraseña</a>
      </p>
      <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    `
  })
}