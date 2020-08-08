import View from '../../components/view'
import NewPasswordView from './request-newpassword.html'
import Form from '../../components/form'

import render from '../../router'

export default (container) => {
  new View('Solicitud para nueva contraseña', NewPasswordView, container).render()

  // Initialize consts for new Form
  const formElement = document.getElementById('recovery-form')
  const values = {
    email: '',
  }
  const patterns = {
    email: /^([\wñÑ\S_\-]+)@([\w\S_\-]+).([a-z]{2,8})(\.[a-z]{2,8})?$/,
  }
  const requestMethod = values => {
    console.log('Requesting password change...')
    console.log(`Email: ${values.email}`)

    const redirectMessage = document.createElement('p')
    redirectMessage.classList.add('redirect-message')
    redirectMessage.innerHTML = `
      Por motivos del Demo simplemente serás redirigido a la siguiente etapa.

      Yendo a<a href="/new-password" class="redirect">cambio de contraseña</a>`

    container.append(redirectMessage)

    localStorage.setItem('password-request-for', values.email)

    setTimeout(() => {
      render('/new-password')
    }, 2000)
  }

  // Create login form
  new Form('Request new password', formElement, values, patterns, requestMethod)
}