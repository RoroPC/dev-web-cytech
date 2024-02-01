
import './App.scss'
import Footer from './footer/Footer'
import Header from './header/Header'
import Navbar from './navbar/Navbar'
import LandingPage from "./landingPage/LandingPage.tsx";
function App() {

  return (
    <div id="app">
      <Header />
      <Navbar />
      <LandingPage />

      <Footer />
    </div>
  )
}

export default App
