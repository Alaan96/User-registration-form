import View from '../../components/view';

import Welcome from './welcome.html'

export default (container) => {
  new View('Bienvenido', Welcome, container).render()
}