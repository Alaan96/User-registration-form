import render from '../router'

import Register from '../views/register.html'
import RegisterComplete from './register-complete.html'

export default (container) => {
  container.innerHTML = Register
  document.title = 'Register form'

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
    const name = input.name.split('-')[1]
    input.pattern = `${pattern[name]}`.slice(1, -1)
  })


  // Password reveal
  const passwordInput = Array.from(inputs).find(input => input.name.includes('password'))
  const passwordRevealBtn = document.getElementById('register-password-reveal')
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
    console.log(
      `
      Name: ${data.name}
      Email: ${data.email}
      Password: ${data.password}
      `
    )

    container.innerHTML = RegisterComplete

    setTimeout(()=> {
      render('/login')
    }, 3000)
  }
  

  // Send form when Ctrl + Enter are pressed
  window.addEventListener('keyup', event => {
    if (event.ctrlKey === true && event.key === 'Enter' && formComplete(validInputs)) send(data) 
  })

  /***** Listen keyboard *****/
  registerForm.addEventListener('keyup', (event) => {
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
  registerForm.addEventListener('submit', (event) => {
    event.preventDefault()
    send(data)
  })
}