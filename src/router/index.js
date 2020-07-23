import Home from '../views/home.html'
import Login from '../views/Login.html'
import Register from '../views/register.html'
import NewPassword from '../views/new-password.html'
import Error404 from '../views/404.html';

const content = document.getElementById('content')

window.addEventListener('hashchange', () => {
  switch (location.hash) {
    case '#/':
      content.innerHTML = Home
      break;
    case '#/login':
      content.innerHTML = Login
      break;
    case '#/register':
      content.innerHTML = Register
      break;
    case '#/new-password':
      content.innerHTML = NewPassword
      break;
    default:
      content.innerHTML = Error404
      break;
  }
})

location.hash = '#/'