import { PrivateView } from '../../components/view'
import HomeView from './home.html'

import render from '../../router'

export default (container) => {

  const Home = new PrivateView('Inicio', HomeView, container)

  Home.haveAccess()
    .then((res) => {
      Home.Loader.end('Acceso permitido')
      const title = document.querySelector('h1')
      const user = JSON.parse(localStorage.getItem(res.session))

      title.textContent += ` ${user.name}`

      const logoutBtn = document.querySelector('a[data-action="logout"]')

      if (logoutBtn) {
        logoutBtn.addEventListener('click', event => {
          event.preventDefault()

          localStorage.removeItem('session-open')

          render('/')
        })
      }
    })
    .catch(() => {
      setTimeout(() => {
        Home.Loader.end('Acceso denegado')
        render('/welcome')
      }, 1500)
    })
}