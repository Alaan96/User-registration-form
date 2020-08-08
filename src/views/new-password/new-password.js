import { PrivateView } from '../../components/view'
import NewPasswordView from './new-password.html'
import Form from '../../components/form'

import render from '../../router'

export default (container) => {
  const NewPassword = new PrivateView('Nueva contraseña', NewPasswordView, container, 'password-change')

  NewPassword.render()

  NewPassword.passwordChangeAccess()
    .then((res) => {
      console.log(res)
      NewPassword.Loader.end()

      // Initialize consts for new Form
      const formElement = document.getElementById('newPassword-form')
      const values = {
        password: ''
      }
      const patterns = {
        password: /^([\wÁáÉéÍíÓóÚúÑñ]{8,})$/
      }
      const changePasswordMethod = values => {
        console.log('Sending...')
        console.log(`Password: ${values.password}`)

        // Get saved user
        let user = JSON.parse(localStorage.getItem(res.email))

        user.password = values.password

        localStorage.setItem(res.email, JSON.stringify(user))

        localStorage.removeItem('password-request-for')

        // container.innerHTML = RegisterComplete

        setTimeout(() => {
          render('/welcome')
        }, 2000)
      }

      // Create login form
      new Form('New password', formElement, values, patterns, changePasswordMethod)

      // Fill email input value for accessibility
      document.getElementById('newPassword-email').value = res.email

      const discardBtn = document.querySelector('button[data-action="newPassword-discard"]')
      discardBtn.addEventListener('click', () => {
        const confirmDiscard = confirm('Cancelar cambio de contraseña')

        if (confirmDiscard) {
          localStorage.removeItem('password-request-for')
          render('/login')
        }
      })
    })
    .catch((err) => {
      console.log(err)
      render('/request-newpassword')
    })
}