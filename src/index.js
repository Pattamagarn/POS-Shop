import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { store } from './redux/store'
import { Provider } from 'react-redux';
import Receipt from './pages/receipt/Receipt';
import PayCard from './pages/method-pay/PayCard';
import SelectMenu from './pages/select-menu/SelectMenu';
import Home from './pages/Home/Home';

document.body.className = 'font-Kanit'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route exact path='/select-menu' element={<SelectMenu />} />
        <Route exact path='/receipt' element={<Receipt />} />
        <Route exact path='/pay-card' element={<PayCard />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
