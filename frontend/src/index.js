import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import FormSpotify from './components/FormSpotify';

import { BrowserRouter, Route } from "react-router-dom";
const AppRouter = () => (
  <BrowserRouter>
    <Route path='/:code?' render={(props) => <FormSpotify {...props} />} />
  </BrowserRouter>
);
// Imaginemos aca que arreglo un tremendo incendio.
ReactDOM.render(
  <React.StrictMode>
    <AppRouter/>
  </React.StrictMode>,
  document.getElementById('root')
);
