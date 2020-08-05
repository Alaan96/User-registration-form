import render from '../../router'

import NewPassword from './request-newpassword.html'

export default (container) => {
  container.innerHTML = NewPassword
  document.title = 'Solicitud para nueva contraseña'

  // Email input
  const recoveryForm = document.getElementById('recovery-form')
  const inputs = recoveryForm.querySelectorAll('input:not([tabindex="-1"])')

  // Declare data object to send to the backend
  let data = {
    email: '',
  }

  // Valid inputs
  let validInputs = {
    email: false,
  }

  // Return true when every input is valid
  const formComplete = data => {
    const values = Object.values(data)
    const complete = values.every((input) => input === true)
    return complete
  }

  // Set patterns
  const pattern = {
    email: /^([\wñÑ\S_\-]+)@([\w\S_\-]+).([a-z]{2,8})(\.[a-z]{2,8})?$/,
  }

  // Add patterns to the inputs
  inputs.forEach((input) => {
    if (input.type !== 'checkbox') {
      const name = input.name.split('-')[1]
      input.pattern = `${pattern[name]}`.slice(1, -1)
    }
  })

  // Send form data
  const send = data => {
    console.log('Requesting password change...')
    console.log(`Email: ${data.email}`)

    // Reset input values
    inputs.forEach(input => {
      input.value = ''
    })

    const redirectMessage = document.createElement('p')
    redirectMessage.classList.add('redirect-message')
    redirectMessage.innerHTML = `
      Por motivos del Demo simplemente serás redirigido a la siguiente etapa.

      Yendo a<a href="/new-password" class="redirect">cambio de contraseña</a>`

    container.append(redirectMessage)

    localStorage.setItem('password-request-for', data.email)

    setTimeout(() => {
      render('/new-password')
    }, 2000)
  }


  // Send form when Ctrl + Enter are pressed
  window.addEventListener('keyup', event => {
    if (event.ctrlKey === true && event.key === 'Enter' && formComplete(validInputs)) send(data)
  })

  /***** Listen keyboard *****/
  recoveryForm.addEventListener('keyup', event => {
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
  recoveryForm.addEventListener('submit', event => {
    event.preventDefault()
    send(data)
  })
}