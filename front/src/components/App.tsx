
import './App.scss'
import Footer from './footer/Footer'
import Header from './header/Header'
import LandingPage from "./pages/landingPage/LandingPage.tsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BublesPage from "./pages/bulbesPage/BublesPage.tsx";
import PlantesAMassif from "./pages/plantesAMassif/PlantesAMassif.tsx";
import Rosiers from "./pages/rosiers/Rosiers.tsx";
import Contact from "./pages/contact/Contact.tsx";

function App() {

  return (
      <BrowserRouter>
          <div id="app">
              <Header/>
              <Routes>
                  <Route path="/" element={<LandingPage/>}/>
                  <Route path="/bulbes" element={<BublesPage/>}/>
                  <Route path="/plantes-a-massif" element={<PlantesAMassif/>}/>
                  <Route path="/rosiers" element={<Rosiers/>}/>
                  <Route path="/contact" element={<Contact/>}/>
              </Routes>

              <Footer/>
          </div>
      </BrowserRouter>
  )
}

export default App
