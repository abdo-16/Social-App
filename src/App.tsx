import React from 'react'
import { createBrowserRouter, createHashRouter, Navigate, RouterProvider } from 'react-router'
import AuthLayout from './Layouts/AuthLayout/AuthLayout'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import MainLayout from './Layouts/MainLayout/MainLayout'
import NewsFeed from './Pages/NewsFeed/NewsFeed'
import Profile from './Pages/Profile/Profile'
import Notification from './Pages/Notifcation/Notification'
import NotFound from './Pages/NotFound/NotFound'
import AuthContextProvider from './Components/Context/AuthContext'
import ProtectingRouting from './Components/protectedRouting/ProtectingRouting'
import PostDetailes from './Pages/PostDetailes/PostDetailes'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {Online,Offline}from "react-detect-offline"


export default function App() {
  let routers = createHashRouter([
    {path:"/" , element:<AuthLayout/> ,children:[
      {index:true,  element:<Navigate to="login"/>},
      {path:"login",  element:<Login/>},
      {path:"register",  element:<Register/>},
    ]},
    {path:"/" , element:<MainLayout/> , children:[
      {path:"feed" , element:<ProtectingRouting><NewsFeed/></ProtectingRouting>},
      {path:"profile" , element:<ProtectingRouting><Profile/></ProtectingRouting>},
      {path:"post/:id" , element:<ProtectingRouting><PostDetailes/></ProtectingRouting>},
      {path:"notification" , element:<ProtectingRouting><Notification/></ProtectingRouting>},
      {path:"*" , element:<NotFound/>},
    ]}
  ])
  let client = new QueryClient( )
  return (
    <div >
      <>
      <QueryClientProvider client={client}>

      <AuthContextProvider>
<ReactQueryDevtools/>
      <RouterProvider router={routers}/>
      </AuthContextProvider>
      </QueryClientProvider>
      </>
      <Offline>
        <p className='fixed right-0 bottom-0 bg-red-500 text-black'>You are OffLine Now!</p>
      </Offline>
    </div>
  )
}
