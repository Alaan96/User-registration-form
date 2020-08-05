# User registration form

A SPA register form without JS frameworks, fully responsive and accesible.

<style>
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600');

  :root {
    --light: #CECECE;
    --line: #505050;
    --bgColor: #202020;
    background: var(--bgColor);
  }

  h1, h2, h3 {
    font-weight: 400 !important;
  }

  h1, h2 {
    border-bottom: 1px solid var(--line) !important;
  }

  h1, h2, h3, h4, h5, p {
    font-family: 'Open Sans', sans-serif;
    color: var(--light) !important;
  }

  section.gallery {
    box-sizing: border-box;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 16px;
    border-radius: 4px;
  }

  img {
    border-radius: 4px;
    opacity: .85;
  }
</style>

## Gallery

<section class="gallery">
  <img src="https://raw.githubusercontent.com/Alaan96/User-registration-form/master/src/assets/demo/Welcome.jpg" alt="Welcome">
  <img src="https://raw.githubusercontent.com/Alaan96/User-registration-form/master/src/assets/demo/Register.jpg" alt="Register">
  <img src="https://raw.githubusercontent.com/Alaan96/User-registration-form/master/src/assets/demo/Login.jpg" alt="Login">
  <img src="https://raw.githubusercontent.com/Alaan96/User-registration-form/master/src/assets/demo/RegisterComplete.jpg" alt="Register complete">
  <img src="https://raw.githubusercontent.com/Alaan96/User-registration-form/master/src/assets/demo/Home.jpg" alt="Home">
  <img src="https://raw.githubusercontent.com/Alaan96/User-registration-form/master/src/assets/demo/404.jpg" alt="404">
</section>

## Local preview

- Clone or download the project
  `git clone https://github.com/Alaan96/User-registration-form.git`

- Install dependencies
  `npm install`

- Run app with webpack dev server in port 8080
  `npm run serve`

- Compiles for development
  `npm run dev`

- Compiles and minifies for production
  `npm run build`
  