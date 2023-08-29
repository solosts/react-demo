import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAppSelector } from '../store/hooks'

// 路由懒加载
const Login = React.lazy(() => import('../pages/login/login'))
const Index = React.lazy(() => import('../pages/index'))
const Layout = React.lazy(() => import('../layout/index'))
const NotFound = React.lazy(() => import('../pages/notFound'))

export default function Router() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/404',
      element: <NotFound />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
    {
      element: <Layout />,
      children: [{
        path: '/index',
        element: <Index />,
      }]
    },
  ])


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}