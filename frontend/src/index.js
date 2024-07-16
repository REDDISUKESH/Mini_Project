import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { ContextProvider } from './Components/Context/Context';
import Productdata from "./ProductData";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextProvider>
          <Productdata>
              <App />
          </Productdata>
      </ContextProvider>
    </BrowserRouter>    
  </React.StrictMode>
);


