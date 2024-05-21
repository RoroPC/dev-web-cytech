
import './App.scss'
import Footer from './footer/Footer'
import Header from './header/Header'
import LandingPage from "./pages/landingPage/LandingPage.tsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BublesPage from "./pages/bulbesPage/BublesPage.tsx";
import PlantesAMassif from "./pages/plantesAMassif/PlantesAMassif.tsx";
import Rosiers from "./pages/rosiers/Rosiers.tsx";
import Contact from "./pages/contact/Contact.tsx";
import Provider from "../contexts/user/Provider.tsx";
import LoginPage from "./pages/login/LoginPage.tsx";
import RegisterPage from "./pages/register/RegisterPage.tsx";
import {CartProvider} from "../contexts/cart/Provider.tsx";
import CartPage from "./pages/cartPage/CartPage.tsx";

function App() {

  return (
      <Provider>
          <CartProvider>
              <BrowserRouter>
                  <div id="app">
                      <Header/>
                      <Routes>
                          <Route path="/" element={<LandingPage/>}/>
                          <Route path="/bulbes" element={<BublesPage/>}/>
                          <Route path="/plantes-a-massif" element={<PlantesAMassif/>}/>
                          <Route path="/rosiers" element={<Rosiers/>}/>
                          <Route path="/contact" element={<Contact/>}/>
                          <Route path="/login" element={<LoginPage/>}/>
                          <Route path="/register" element={<RegisterPage/>}/>
                          <Route path="/cart" element={<CartPage/>}/>
                      </Routes>

                      <Footer/>
                  </div>
              </BrowserRouter>
          </CartProvider>
      </Provider>
  )
}

export default App
