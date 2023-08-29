import React from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { useAppSelector } from '../store/hooks'

// 路由懒加载
const Login = React.lazy(() => import('../pages/login/login'))
const Index = React.lazy(() => import('../pages/index'))
const Layout = React.lazy(() => import('../layout/index'))
const NotFound = React.lazy(() => import('../pages/notFound'))

export default function Router() {
  // 判断是否登录
  const IsLogin = () => {
    const token = useAppSelector(state => state.user.token)
    if (token) {
      return <Navigate to='/index' replace />;
    }
    return <Navigate to='/login' replace />;
  }

  // 鉴权
  const AuthRouter = ({ self, to }: any) => {
    const { token } = useAppSelector(state => state.user)
    if (token) {
      return self
    }
    return to
  }

  const router = (createBrowserRouter([
    {
      path: '/login',
      element: <AuthRouter self={<Navigate to='/index' replace />} to={<Login />} />,
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
      path: '/',
      element: <IsLogin />,
    },
    {
      path: '/',
      element: <Layout />,
      children: [{
        index: true,
        path: '/index',
        element: <Index />,
      }]
    }
  ]));



  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}