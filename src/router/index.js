import Error404 from '../views/404.html'

import renderHome from '../views/home/home'
import renderWelcome from '../views/welcome/welcome'
import renderRegister from '../views/register/register'
import renderLogin from '../views/login/login'
import renderNewPasswordRequest from '../views/request-newpassword/request-newpassword'
import renderNewPassword from '../views/new-password/new-password'

const content = document.getElementById('content')

// Render the views without reload
const render = (pathname = location.pathname) => {
  history.pushState({}, pathname, location.origin + pathname)

  switch (pathname) {
    case '/':
      renderHome(content)
      break;
    case '/welcome':
      renderWelcome(content)
      break;
    case '/login':
      renderLogin(content)
      break;
    case '/register':
      renderRegister(content)
      break;
    case '/request-newpassword':
      renderNewPasswordRequest(content)
      break;
    case '/new-password':
      renderNewPassword(content)
      break;
    default:
      content.innerHTML = Error404
      break;
  }

  const hyperlinks = Array.from(document.querySelectorAll('a'))

  if (hyperlinks) {
    hyperlinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault()
        render(event.target.pathname)
      })
    })
  }
}

window.onpopstate = () => {
  render()
}

export default render