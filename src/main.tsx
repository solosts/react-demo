import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './router'
// 国际化
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN';

// redux状态管理
import store from './store/index'
import { Provider } from 'react-redux'

// 公共样式
import './assets/styles/common.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <Router></Router>
    </ConfigProvider>
  </Provider>
  // </React.StrictMode>,
)
