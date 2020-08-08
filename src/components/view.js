import Loader from '../components/loader/loader'

class View {
  constructor(title, content, container) {
    this.title = title
    this.content = content
    this.container = container
  }

  render() {
    if (this.title && this.content && this.container) {
      console.log(`Rendering view: ${this.title}`)
      document.title = this.title
      this.container.innerHTML = this.content
    }
  }
}


class PrivateView extends View {
  constructor(title, content, container, authentication) {
    super(title, content, container)

    this.authentication = authentication

    this.Loader = new Loader()
    this.Loader.init('Verificando acceso')
  }

  render() {
    if (this.authentication === 'session') {
      this.haveAccess()
        .then((res) => {
          console.log(res.message)
          console.log(`Rendering private view: ${this.title}`)

          document.title = this.title
          this.container.innerHTML = this.content
        })
        .catch((err) => {
          console.log(err.message)
        })
    } else if (this.authentication === 'password-change') {
      this.passwordChangeAccess()
        .then((res) => {
          console.log(res.message)
          console.log(`Rendering private view: ${this.title}`)

          document.title = this.title
          this.container.innerHTML = this.content
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  }

  haveAccess() {
    return new Promise((resolve, reject) => {
      const sessionOpen = localStorage.getItem('session-open')

      if (!sessionOpen) {
        return reject({
          success: false,
          message: 'Access denied.',
          session: sessionOpen,
        })
      }

      return resolve({
        success: true,
        message: 'Access allowed.',
        session: sessionOpen,
      })
    })
  }
  passwordChangeAccess() {
    return new Promise((resolve, reject) => {
      const emailForChange = localStorage.getItem('password-request-for')

      if (!emailForChange) {
        return reject({
          success: false,
          message: 'Access denied.',
          email: emailForChange,
        })
      }

      return resolve({
        success: true,
        message: 'Access allowed.',
        email: emailForChange,
      })
    })
  }
}

export {
  View as default,
  PrivateView
}