import React from 'react'
import { Outlet } from 'react-router'
import { NavbarComponnent } from '../../Components/Navbar/NavbarComponnent'

export default function AuthLayout() {
  return (
    <div>
      <NavbarComponnent/>
      <main>
        <div className='container mx-auto mt-60'>
          <div className='grid md:grid-cols-2'>
            <div>
              <div className='my-7'>
                <h1 className='text-6xl font-extrabold text-blue-700'>Route Posts</h1>
                <p className='text-3xl'>Connect with friends and the world around you on Route Posts.</p>
              </div>
              <div className='border border-blue-300 p-10 rounded-2xl'>
                <div className='mb-3 '>
                <h3 className='text-4xl text-blue-600' >About Route Academy</h3>
                <p className='text-2xl font-bold'>Egypt's Leading IT Training Center Since 2012</p>
                </div>
                <div>
                  <p>Route Academy is the premier IT training center in Egypt, established in 2012. We specialize in delivering high-quality training courses in programming, web development, and application development. We've identified the unique challenges people may face when learning new technology and made efforts to provide strategies to overcome them.</p>
                </div>
              </div>
            </div>
            <div>
              <Outlet/>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
