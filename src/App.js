import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Company from './pages/Company';
import NewProject from './pages/NewProject';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Historicos from './pages/Historico';
import Container from './layout/Container';

import Footer from './layout/Footer';
import Navbar from './layout/Navbar';
import Projects from './pages/Projects';
import Project from './pages/Project';
function App() {
  return (
    <div className=''>
      <Navbar/>
    <BrowserRouter>
      <div className='container min-height'>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/company' element={<Company/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/newProject' element={<NewProject/>}></Route>
        <Route path='/projects' element={<Projects/>}></Route>
        <Route path='/project/:id' element={<Project/>}></Route>
        <Route path='/historico' element={<Historicos/>}></Route>
      </Routes>
      </div>
    </BrowserRouter>      

    <Footer/>
      
    </div>
  );
}

export default App;
