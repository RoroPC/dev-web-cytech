
import './App.scss'
import Footer from './footer/Footer'
import Header from './header/Header'
import LandingPage from "./landingPage/LandingPage.tsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BublesPage from "./bulbesPage/BublesPage.tsx";
import PlantesAMassif from "./plantesAMassif/PlantesAMassif.tsx";
import Rosiers from "./rosiers/Rosiers.tsx";

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
              </Routes>

              <Footer/>
          </div>
      </BrowserRouter>
  )
}

export default App
