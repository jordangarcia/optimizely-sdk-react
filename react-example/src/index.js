import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


;(async function () {
  const resp = await fetch('https://cdn.optimizely.com/datafiles/GaXr9RoDhRcqXJm3ruskRa.json?OPTIMIZELY_NOCACHE=1', { mode: 'cors' });
  let datafile = await resp.json();

  ReactDOM.render(<App datafile={datafile} />, document.getElementById('root'));

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.unregister();
})()
