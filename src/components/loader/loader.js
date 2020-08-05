import Loader from './loader.html'

const load = (text = 'Verificando acceso') => {
  const loaderElement = document.createElement('div')
  loaderElement.setAttribute('id', 'loader')
  loaderElement.innerHTML = Loader

  // Set loader
  document.body.prepend(loaderElement)

  // Set text
  const textContainer = document.querySelector('#loader h2')
  textContainer.textContent = text
}

const loaded = () => {
  const loaderElement = document.getElementById('loader')
  if (loaderElement) {
    document.body.removeChild(loaderElement)
  }
}

export default {
  load,
  loaded
}