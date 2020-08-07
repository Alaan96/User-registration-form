import LoaderView from './loader.html'

export default class Loader {
  constructor() {
    this.loader = document.createElement('div')
    this.loader.setAttribute('id', 'loader')
    this.loader.innerHTML = LoaderView

    this.textElement

    this.onScreen = false
  }

  init(message) {
    // Set as first child in body
    document.body.prepend(this.loader)
    this.onScreen = true

    this.textElement = document.querySelector('#loader h2')
    this.textElement.textContent = message
  }

  end(message) {
    this.textElement.textContent = message
    setTimeout(() => {
      if (this.onScreen) document.body.removeChild(this.loader)
      this.onScreen = false
    }, 800)
  }
}