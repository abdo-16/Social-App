
import React, { useContext, useState } from "react";
import * as Zod from'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router";
import { AuthContext } from "../../Components/Context/AuthContext";
import { NavbarComponnent } from "../../Components/Navbar/NavbarComponnent";


export default function Login() {
  let {setUser} = useContext(AuthContext)
  let nav = useNavigate()
    let ValidationSchema = Zod.object(
    {
      email:Zod.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Enter Valid Email"),
      password : Zod.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/ , "Enter Valid Passord"),
    })
  type user = Zod.infer<typeof ValidationSchema>
  const [gender, setGender ] = useState("");
  const {handleSubmit,register , formState:{errors}} = useForm<user>({
    defaultValues:{
      email:"",
      password :"",
    },
    resolver:zodResolver(ValidationSchema)
  })
  // console.log(errors);
  

 async function handelApi(values){
console.log(values);
 

     await  axios.post(`https://route-posts.routemisr.com/users/signin`, values).then(({data})=>{
 Swal.fire({
      title: "Success!",
      text: data.data.message,
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#1e40af"
    });
    
    setUser(data?.data?.user)
    localStorage.setItem("userToken" ,data.data.token)
    setTimeout(() => {
      
      nav("/feed")
    }, 2000);
   }).catch (({response :{data}})=>{
 Swal.fire({
      title: "Error!",
      text: data.message,
      icon: "error",
      confirmButtonText: "error",
    });
})

}
  return (
    <div>
        <div className="mx-auto container ps-10 ">
          <h1 className="text-2xl font-black">
            Create new account
          </h1>
          <p>It is quick and easy.</p>

      <form onSubmit={handleSubmit(handelApi)} className="max-w-sm mt-7">
  {/* Email */}
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading">
      Your Email
    </label>
    <input
      id="email"
      type="email"
      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
      placeholder="name@example.com"
      {...register("email")}
      
    />
      {errors.email &&<p className="text-red-500">{errors.email.message}</p>}
  </div>


  {/* Password */}
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading">
      Your Password
    </label>
    <input
      id="password"
      type="password"
      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
      placeholder="••••••••"
      {...register("password")}
      
    />
      {errors.password &&<p className="text-red-500">{errors.password.message}</p>}
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-3 transition-colors shadow-sm"
  >
    Login
  </button>
</form>
        </div>
    </div>
  );
}
