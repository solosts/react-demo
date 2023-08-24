import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN';

// 公共样式
import './assets/styles/common.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Router></Router>
    </ConfigProvider>
  </React.StrictMode>,
)
