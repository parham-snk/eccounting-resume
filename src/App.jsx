import logo from './logo.svg';
import './App.css';
import "react-router-dom"
import { BrowserRouter, Route, Router, Routes } from 'react-router';
import Sidebar from './components/sidebar';
import Dashboard from './pages/dashboard';
import P404 from './pages/404';


function App() {
  return (
    <div className="bg-gray-100
    w-full h-dvh
    flex flex-col md:flex-row justify-center align-middle items-center
    ">

      <BrowserRouter basename='/'>


        <Sidebar />
        <div className="order-1 md:order-2
        w-10/11 md:w-4/6 h-9/10 mx-5 overflow-y-scroll md:overflow-hidden">
          <Routes>
            <Route path='/' Component={Dashboard} />
            <Route path='*' Component={P404}/>
          </Routes>
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
