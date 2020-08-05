import render from '../../router'

import Home from './home.html'

import Loader from '../../components/loader/loader'

export default (container) => {
  document.title = 'Inicio'

  // // Validate session
  const sessionOpen = localStorage.getItem('session-open')
  if (!sessionOpen) {
    Loader.load()
    const fetchTime = Math.trunc((Math.random() + .8) * 1000)

    // Remove loader
    setTimeout(() => {
      Loader.loaded()
      render('/welcome')
    }, 3000)
    return
  }

  container.innerHTML = Home

  const title = document.querySelector('h1')
  const user = JSON.parse(localStorage.getItem(sessionOpen))

  title.textContent += ` ${user.name}`

  const logoutBtn = document.querySelector('a[data-action="logout"]')

  if (logoutBtn) {
    logoutBtn.addEventListener('click', event => {
      event.preventDefault()

      localStorage.removeItem('session-open')

      render('/')
    })
  }
}