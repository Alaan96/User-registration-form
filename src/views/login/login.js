import View from '../../components/view'
import LoginView from './login.html'
import Form from '../../components/form'

import render from '../../router'

export default (container) => {
  new View('Formulario de inicio de sesión', LoginView, container).render()

  // Initialize consts for new Form
  const formElement = document.getElementById('login-form')
  const values = {
    email: '',
    password: ''
  }
  const patterns = {
    email: /^([\wñÑ\S_\-]+)@([\w\S_\-]+).([a-z]{2,8})(\.[a-z]{2,8})?$/,
    password: /^([\wÁáÉéÍíÓóÚúÑñ]{8,})$/
  }
  const loginMethod = values => {
    console.log('Login...')

    // Verify user
    const userExists = user => {
      return new Promise((resolve, reject) => {
        if (!user) return reject('Hubo un problema con la petición.')

        const isRegistered = user => {
          const registeredUser = localStorage.getItem(user.email)

          if (!registeredUser) return false

          // Validate passwords
          const userDB = JSON.parse(registeredUser)
          if (user.password !== userDB.password) return false

          return true
        }

        if (!isRegistered(user)) return reject('Los datos ingresados son inválidos.')

        localStorage.setItem('session-open', user.email)

        resolve('Acceso permitido.')
      })
    }

    const errorSection = document.querySelector('section.errors')

    userExists(values)
      .then(res => {
        console.log(res)
        setTimeout(() => {
          render('/')
        }, 1500)
      })
      .catch(err => {
        // Show error below the button
        const errorElement = document.createElement('p')
        errorElement.innerHTML = err
        errorSection.append(errorElement)
      })


  }

  // Create login form
  new Form('Login', formElement, values, patterns, loginMethod)
}