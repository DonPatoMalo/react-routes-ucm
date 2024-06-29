// import logo from './logo.svg';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { Page1 } from './pages/Page1';
import { Page2 } from './pages/Page2';
import { Menu } from './components/Menu';
import { Cursos } from './pages/Cursos';
import { MiCurso } from './components/MiCurso';
import  Login from './pages/Login';

import Footer from "./components/Footer";

function App() {
  return (
    <HashRouter>
      <Menu />

      <Routes>


          <Route path="/" element={<Home/>}/>
          <Route path="/Home" element={<Page1 />}/>
          <Route path="/About" element={<Page2 />}/>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/cursos" element={<Cursos />}>
              <Route path=":url" element={<MiCurso />}/>
        </Route>
        <Route path="*" element={<p>Ups, no existe la ruta</p>}/>
      </Routes>

        <Footer />
    </HashRouter>

  );
}

export default App;
