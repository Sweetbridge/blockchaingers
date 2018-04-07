import React from 'react'
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import AppContainer from "./Routes";

const App = () =>
  <BrowserRouter>
    <AppContainer />
  </BrowserRouter>

export default App;
