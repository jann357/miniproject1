import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Prescription from './pages/Prescription';
import Register from './pages/Register';
// import Dashboard from './pages/Home'
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';

function App() {
  return (
  <BrowserRouter>
  <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    removeDelay: 1000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      iconTheme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
  <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/prescription' element={<Prescription/>}/>
    </Routes></BrowserRouter>
  );
}

export default App;
