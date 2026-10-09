import React from 'react'
import { Outlet } from 'react-router'
import { NavbarComponnent } from '../../Components/Navbar/NavbarComponnent'

export default function MainLayout() {
  return (
    <div>
      <NavbarComponnent/>
      <div>

      <Outlet/>
      </div>
    </div>
  )
}
