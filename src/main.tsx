import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router'

// 公共样式
import './assets/styles/common.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router></Router>
  </React.StrictMode>,
)
