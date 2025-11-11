import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let startApp = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render( <App />);
}

if (!window.cordova) {
    startApp();
} else {
    document.addEventListener('deviceready', startApp, false);
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
