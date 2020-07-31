import Error404 from '../views/404.html'

import renderHome from '../components/home'
import renderRegister from '../components/register'
import renderLogin from '../components/login'
import renderNewPassword from '../components/new-password'

const content = document.getElementById('content')

// Render the views without reload
const render = (pathname = location.pathname) => {
  history.pushState({}, pathname, location.origin + pathname)

  switch (pathname) {
    case '/':
      renderHome(content)
      break;
    case '/login':
      renderLogin(content)
      break;
    case '/register':
      renderRegister(content)
      break;
    case '/new-password':
      renderNewPassword(content)
      break;
    default:
      content.innerHTML = Error404
      break;
  }

  const hyperlinks = Array.from(document.querySelectorAll('a'))

  hyperlinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault()
      render(event.target.pathname)
    })
  })
}

window.onpopstate = () => {
  render()
}

// Execute first render
render()

export default render