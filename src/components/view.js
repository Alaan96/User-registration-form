import Loader from '../components/loader/loader'

class View {
  constructor(title, content, container) {
    this.title = title
    this.content = content
    this.container = container

    this.renderView()
  }

  renderView() {
    if (this.title && this.content && this.container) {
      console.log(`Rendering view: ${this.title}`)
      document.title = this.title
      this.container.innerHTML = this.content
    }
  }
}



class PrivateView extends View {
  constructor(title, content, container) {
    super(title, content, container)
    this.Loader = new Loader()

    this.Loader.init('Verificando acceso')
  }

  renderView() {
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
  }

  haveAccess() {
    const access = new Promise((resolve, reject) => {
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

    return access
  }
}

export {
  View as default,
  PrivateView
}