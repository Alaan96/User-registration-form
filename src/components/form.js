class Form {
  constructor(name, formElement, values, patterns, mainMethod, uniqueEmail = false) {
    this.name = name
    this.formElement = formElement
    this.inputs = formElement.querySelectorAll('input:not([tabindex="-1"])')
    this.values = values
    this.patterns = patterns
    this.validInputs = {}
    this.mainMethod = mainMethod

    this.addPatternsToInputs(patterns, this.inputs)
    this.setValidInputs(values)
    this.setPasswordReveal(this.inputs)


    /***** Listen keyboard *****/
    this.formElement.addEventListener('keyup', event => {
      const target = event.target

      // Input validations
      if (target.tagName === 'INPUT' && target.pattern !== '') {
        const name = target.name.split('-')[1] // formType-name
        const submitBtn = document.querySelector('button[type="submit"]')

        // Update data
        this.values[name] = target.value

        // Validate inputs
        const validation = this.patterns[name].test(target.value)
        const infoBelowInput = document.getElementById(`form-info-${name}`)

        // Help user
        if (!validation) {
          infoBelowInput.style.visibility = 'visible'
        } else if (validation) {
          infoBelowInput.style.visibility = 'hidden'
        }

        this.validInputs[name] = validation

        if (uniqueEmail) {
          // Check if email is already registered
          const emailRegistered = email => {
            if (!localStorage.getItem(email)) return false
            return true
          }
  
          const emailInfoBelowInput = document.getElementById('form-info-email')
          if (emailRegistered(this.values.email)) {
            this.validInputs.email = false
            emailInfoBelowInput.style.visibility = 'visible'
            emailInfoBelowInput.textContent = 'Email ya registrado.'
          } else if (!emailRegistered(this.values.email)){
            emailInfoBelowInput.textContent = 'Debe ingresar un formato de email válido'
          }
        }


        // Active submit button
        if (this.isFormComplete(this.validInputs)) {
          submitBtn.disabled = false
        } else {
          submitBtn.disabled = true
        }
      }
    })

    /***** Listen submit *****/
    this.formElement.addEventListener('submit', event => {
      event.preventDefault()
      this.send(this.values)
    })

    // Send form when Ctrl + Enter are pressed
    window.addEventListener('keyup', event => {
      if (event.ctrlKey === true && event.key === 'Enter' && this.isFormComplete(this.validInputs)) {
        this.send(this.values)
      }
    })
  }

  send() {
    console.log('Sending...')

    // Reset input values
    this.inputs.forEach( input => {
      input.value = ''
    })
    this.mainMethod(this.values)
  }

  setValidInputs(values) {
    Object.keys(values).forEach( property => {
      Object.defineProperty(this.validInputs, property, {
        enumerable: true,
        writable: true,
        value: false
      })
    })
  }

  // Return true when every input is valid
  isFormComplete(values) {
    const inputValues = Object.values(values)
    const complete = inputValues.every((input) => input === true)
    return complete
  }

  // Add patterns to the inputs
  addPatternsToInputs(patterns, inputs) {
    inputs.forEach( (input) => {
      if (input.type !== 'checkbox') {
        const name = input.name.split('-')[1]
        input.pattern = `${patterns[name]}`.slice(1, -1)
      }
    })
  }

  setPasswordReveal(inputs) {
    const passwordInput = Array.from(inputs).find(input => input.name.includes('password'))

    if (passwordInput) {
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
    }
  }

}

export default Form