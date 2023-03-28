import React from 'react';
import ReactDOM from 'react-dom/client';
import "choerodon-ui/lib/configure";
import './index.css';
import App from './App';

import { overwriteDefaultConfig } from 'choerodon-ui/dataset';
import defaults from 'choerodon-ui/lib/configure/default';

overwriteDefaultConfig(defaults);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
