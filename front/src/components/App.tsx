
import './App.scss'
import Footer from './footer/Footer'
import Header from './header/Header'
import LandingPage from "./landingPage/LandingPage.tsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BublesPage from "./bulbesPage/BublesPage.tsx";

function App() {

  return (
      <BrowserRouter>
          <div id="app">
              <Header/>
              <Routes>
                  <Route path="/" element={<LandingPage/>}/>
                  <Route path="/bulbes" element={<BublesPage/>}/>
              </Routes>

              <Footer/>
          </div>
      </BrowserRouter>
  )
}

export default App
