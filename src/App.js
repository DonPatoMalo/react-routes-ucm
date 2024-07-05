// import logo from './logo.svg';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { Menu } from './components/Menu';

import  Login from './pages/Login';

import Footer from "./components/Footer";
import GestionCoffee from "./pages/GestionCoffee";
import Coffees from "./pages/Coffees";
import {PrivateRoute} from "./auth/PrivateRoute";
import Register from "./components/Register";
import UserList from "./components/Register/UserList";

function App() {
  return (
    <HashRouter>
      <Menu />

      <Routes>


          <Route path="/" element={<Home/>}/>
          <Route path="/inicio" element={< Home />}/>
          <Route path="/menu" element={<Coffees />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/gestion-coffees" element={<PrivateRoute><GestionCoffee /></PrivateRoute>}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/userlist" element={<UserList />}/>
        <Route path="*" element={<p>Ups, no existe la ruta</p>}/>
      </Routes>

        <Footer />
    </HashRouter>

  );
}

export default App;
