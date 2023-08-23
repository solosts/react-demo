import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// 路由懒加载
const Login = React.lazy(() => import('../pages/login/login'))
const Home = React.lazy(() => import('../pages/home'))
const NotFound = React.lazy(() => import('../pages/notFound'))

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Suspense><Login /></Suspense>}></Route>
          <Route path="/Login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          {/* 定义404路由*/}
          <Route path='/404' element={<Suspense><NotFound /></Suspense>}></Route>
          {/* 未匹配的路由使用Navigate重定向到此页面 这里即notFound.jsx */}
          <Route path='/*' element={<Navigate to='/404' />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}