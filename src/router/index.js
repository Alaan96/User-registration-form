import Home from '../views/home.html'
import Login from '../views/Login.html'
import NewPassword from '../views/new-password.html'
import Error404 from '../views/404.html'

import renderRegister from '../components/register'

const content = document.getElementById('content')

// Render the views without reload
const render = (pathname = location.pathname) => {
  history.pushState({}, pathname, location.origin + pathname)

  switch (pathname) {
    case '/':
      content.innerHTML = Home
      break;
    case '/login':
      content.innerHTML = Login
      break;
    case '/register':
      renderRegister(content)
      break;
    case '/new-password':
      content.innerHTML = NewPassword
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