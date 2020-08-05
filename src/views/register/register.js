import render from '../../router'

import Register from './register.html'
import RegisterComplete from '../../components/register-complete.html'

export default (container) => {
  container.innerHTML = Register
  document.title = 'Formulario de registro'

  // Set form element and inputs
  const registerForm = document.getElementById('register-form')
  const inputs = registerForm.querySelectorAll('input:not([tabindex="-1"])')

  // Declare data object to send to the backend
  let data = {
    name: '',
    email: '',
    password: ''
  }

  // Valid inputs
  let validInputs = {
    name: false,
    email: false,
    password: false
  }

  // Return true when every input is valid
  const formComplete = data => {
    const values = Object.values(data)
    const complete = values.every( (input) => input === true )
    return complete
  }

  // Set patterns
  const pattern = {
    name: /^([A-Za-z ÁáÉéÍíÓóÚúÑñ])+$/,
    email: /^([\wñÑ\S_\-]+)@([\w\S_\-]+).([a-z]{2,8})(\.[a-z]{2,8})?$/,
    password: /^([\wÁáÉéÍíÓóÚúÑñ]{8,})$/
  }

  // Add patterns to the inputs
  inputs.forEach( (input) => {
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

  // Send form data
  const send = data => {
    console.log('Sending...')

    // Reset input values
    inputs.forEach( input => {
      input.value = ''
    })

    // Save user into localStorage
    const saveUser = user => {
      const promise = new Promise( (resolve, reject) => {

        if (!user) reject('No se han podido guardar los datos.')

        const isRegistered = email => {
          const registeredUser = localStorage.getItem(email)

          if (!registeredUser) return false
          return true
        }

        if (isRegistered(user.email)) reject('El usuario ya existe.')

        localStorage.setItem(data.email, JSON.stringify(user))
        resolve('Usuario registrado existosamente.')

      })

      return promise
    }

    saveUser(data)
      .then( response => {
        console.log(response)
        container.innerHTML = RegisterComplete

        setTimeout(() => {
          render('/login')
        }, 3000)
      })
      .catch( err => {
        console.warn(err)
      })
  }
  

  // Send form when Ctrl + Enter are pressed
  window.addEventListener('keyup', event => {
    if (event.ctrlKey === true && event.key === 'Enter' && formComplete(validInputs)) send(data) 
  })

  /***** Listen keyboard *****/
  registerForm.addEventListener('keyup', event => {
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

      // Check if email is already registered
      const emailRegistered = email => {
        if (!localStorage.getItem(email)) return false
        return true
      }
      
      const emailInfoBelowInput = document.getElementById('form-info-email')
      if (emailRegistered(data.email)) {
        validInputs.email = false
        emailInfoBelowInput.style.visibility = 'visible'
        emailInfoBelowInput.textContent = 'Email ya registrado.'
      } else if (!emailRegistered(data.email)){
        emailInfoBelowInput.textContent = 'Debe ingresar un formato de email válido'
      }

      // Active submit button
      if (formComplete(validInputs)) {
        submitBtn.disabled = false
      } else {
        submitBtn.disabled = true
      }
    }
  })

  /***** Listen submit *****/
  registerForm.addEventListener('submit', event => {
    event.preventDefault()
    send(data)
  })
}