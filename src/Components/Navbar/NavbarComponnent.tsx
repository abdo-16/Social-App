
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import logoImge from"../../assets/route.png"
import { Link, NavLink, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from './../Context/AuthContext';
import type { user } from "../../intrefaces/User";


export function NavbarComponnent() {
  let {userData , setUser}:{userData:user|null} = useContext(AuthContext)
  let navgat = useNavigate()
  function LogOut(){
    localStorage.removeItem("userToken")
    setUser(null)
    navgat("/login")

  }
  return (
    <Navbar  rounded>
      <NavbarBrand >
        <img src={logoImge} className="mr-3 h-6 sm:h-9 rounded-xl" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-2xl font-bold dark:text-white">Route Posts</span>
      </NavbarBrand>
      <div className="flex md:order-2">
        {userData?   <Dropdown
          arrowIcon={false}
          inline
          label={
            <div className="flex flex-wrap gap-2.5 justify-center items-center">
            <Avatar alt="User settings" img={userData?.photo} rounded />
            <span className="font-serif text-olive-400">
              {userData.name}
            </span>
            </div>
          }
        >
          <DropdownHeader>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </DropdownHeader>
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownDivider />
          <DropdownItem onClick={LogOut} className="text-red-500  font-bold ">Log out</DropdownItem>
        </Dropdown>:<ul className="flex list-none  p-0">
  <NavbarLink className="mx-3.5 focus:text-blue-700 hover:text-blue-700" as="div"><Link to="/register">Register</Link></NavbarLink>
  <NavbarLink className=" focus:text-blue-700 hover:text-blue-700" as="div"><Link to="/login">Login</Link></NavbarLink>
</ul> }
            
     
        <NavbarToggle />
      </div>
  {userData&& <NavbarCollapse>
      
        <NavbarLink as="div" >  <Link to="/feed">Feed</Link></NavbarLink>
        <NavbarLink as="div" >  <Link to="/profile">Profile</Link></NavbarLink>
        <NavbarLink as="div" >  <Link to="/notification">Notifiction</Link></NavbarLink>
        
       
      </NavbarCollapse>}
    </Navbar>
  );
}
