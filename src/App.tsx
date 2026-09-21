import React from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import AuthLayout from './Layouts/AuthLayout/AuthLayout'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import MainLayout from './Layouts/MainLayout/MainLayout'
import NewsFeed from './Pages/NewsFeed/NewsFeed'
import Profile from './Pages/Profile/Profile'
import Notification from './Pages/Notifcation/Notification'
import NotFound from './Pages/NotFound/NotFound'

export default function App() {
  let routers = createBrowserRouter([
    {path:"/auth" , element:<AuthLayout/> ,children:[
      {index:true,  element:<Navigate to="login"/>},
      {path:"login",  element:<Login/>},
      {path:"register",  element:<Register/>},
    ]},
    {path:"" , element:<MainLayout/> , children:[
      {index:true , element:<Navigate to="feed"/>},
      {path:"feed" , element:<NewsFeed/>},
      {path:"profile" , element:<Profile/>},
      {path:"notification" , element:<Notification/>},
      {path:"*" , element:<NotFound/>},
    ]}
  ])
  return (
    <div >
      <>
      <RouterProvider router={routers}/>
      </>
    </div>
  )
}
