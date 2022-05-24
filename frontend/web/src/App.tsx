import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar';

import { Rotas } from './routes'


function App() {


  return (
    <>
      <Navbar />
      <Rotas />

    </>
  );
}

export default App
