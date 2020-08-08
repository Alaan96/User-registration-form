import View from '../../components/view'
import RegisterView from './register.html'
import Form from '../../components/form'

import render from '../../router'

import RegisterComplete from '../../components/register-complete.html'

export default (container) => {
  new View('Formulario de registro', RegisterView, container).render()

  // Initialize consts for new Form
  const formElement = document.getElementById('register-form')
  const values = {
    name: '',
    email: '',
    password: ''
  }
  const patterns = {
    name: /^([A-Za-z ÁáÉéÍíÓóÚúÑñ])+$/,
    email: /^([\wñÑ\S_\-]+)@([\w\S_\-]+).([a-z]{2,8})(\.[a-z]{2,8})?$/,
    password: /^([\wÁáÉéÍíÓóÚúÑñ]{8,})$/
  }
  const registerMethod = values => {
    // Save user into localStorage
    const saveUser = user => {
      return new Promise((resolve, reject) => {

        if (!user) reject('No se han podido guardar los datos.')

        const isRegistered = email => {
          const registeredUser = localStorage.getItem(email)

          if (!registeredUser) return false
          return true
        }

        if (isRegistered(user.email)) reject('El usuario ya existe.')

        localStorage.setItem(values.email, JSON.stringify(user))
        resolve('Usuario registrado existosamente.')

      })
    }

    saveUser(values)
      .then(response => {
        console.log(response)
        // container.innerHTML = RegisterComplete

        setTimeout(() => {
          render('/login')
        }, 2000)
      })
      .catch(err => {
        console.warn(err)
      })
  }

  // Create register form
  new Form('Register', formElement, values, patterns, registerMethod, true)
}