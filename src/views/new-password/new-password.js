import { PrivateView } from '../../components/view'
import NewPasswordView from './new-password.html'

import render from '../../router'

export default (container) => {
  const NewPassword = new PrivateView('Nueva contraseña', NewPasswordView, container, 'password-change')

  NewPassword.render()

  NewPassword.passwordChangeAccess()
    .then((res) => {
      console.log(res)
      NewPassword.Loader.end()
      // Set form element and inputs
      const newPasswordForm = document.getElementById('newPassword-form')
      const inputs = newPasswordForm.querySelectorAll('input:not([tabindex="-1"])')

      // Declare data object to send to the backend
      let data = {
        password: ''
      }

      // Valid inputs
      let validInputs = {
        password: false
      }

      // Return true when every input is valid
      const formComplete = data => {
        const values = Object.values(data)
        const complete = values.every((input) => input === true)
        return complete
      }

      // Set patterns
      const pattern = {
        password: /^([\wÁáÉéÍíÓóÚúÑñ]{8,})$/
      }

      // Add patterns to the inputs
      inputs.forEach((input) => {
        if (input.type !== 'checkbox') {
          const name = input.name.split('-')[1]
          input.pattern = `${pattern[name]}`.slice(1, -1)
        }
      })


      // Password reveal
      const passwordInput = Array.from(inputs).find(input => input.name.includes('password'))
      const passwordRevealBtn = document.getElementById('password-reveal')
      const eyeIcon = document.getElementById('icon-eye')

      passwordRevealBtn.addEventListener('change', (event) => {
        const checked = event.target.checked
        if (checked) {
          passwordInput.type = 'text'
          eyeIcon.classList.add('reveal')
        } else {
          passwordInput.type = 'password'
          eyeIcon.classList.remove('reveal')
        }
      })

      // Get saved user
      let user = JSON.parse(localStorage.getItem(res.email))

      // Fill email input value for accessibility
      document.getElementById('newPassword-email').value = res.email

      // Send form data
      const send = data => {
        console.log('Sending...')
        console.log(`Password: ${data.password}`)

        // Reset input values
        inputs.forEach(input => {
          input.value = ''
        })

        user.password = data.password

        localStorage.setItem(res.email, JSON.stringify(user))

        localStorage.removeItem('password-request-for')

        // container.innerHTML = RegisterComplete

        setTimeout(() => {
          render('/welcome')
        }, 2000)
      }


      // Send form when Ctrl + Enter are pressed
      window.addEventListener('keyup', event => {
        if (event.ctrlKey === true && event.key === 'Enter' && formComplete(validInputs)) send(data)
      })

      /***** Listen keyboard *****/
      newPasswordForm.addEventListener('keyup', event => {
        const target = event.target

        // Input validations
        if (target.tagName === 'INPUT' && target.pattern !== '') {
          const name = target.name.split('-')[1] // formType-name
          const submitBtn = document.querySelector('button[type="submit"]')

          // Update data
          data[name] = target.value

          // Validate inputs
          const validation = pattern[name].test(target.value)
          const infoBelowInput = document.getElementById(`form-info-${name}`)

          // Help user
          if (!validation) {
            infoBelowInput.style.visibility = 'visible'
          } else if (validation) {
            infoBelowInput.style.visibility = 'hidden'
          }

          validInputs[name] = validation

          // Active submit button
          if (formComplete(validInputs)) {
            submitBtn.disabled = false
          } else {
            submitBtn.disabled = true
          }
        }
      })

      /***** Listen submit *****/
      newPasswordForm.addEventListener('submit', event => {
        event.preventDefault()
        send(data)
      })

      const discardBtn = document.querySelector('button[data-action="newPassword-discard"]')
      discardBtn.addEventListener('click', event => {
        const confirmDiscard = confirm('Cancelar cambio de contraseña')
        const discardChanges = () => {
          localStorage.removeItem('password-request-for')
        }

        if (confirmDiscard) {
          discardChanges()
          render('/login')
        }
      })
    })
    .catch((err) => {
      console.log(err)
      render('/request-newpassword')
    })
}