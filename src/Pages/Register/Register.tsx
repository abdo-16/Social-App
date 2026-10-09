
import React, { useState } from "react";
import * as Zod from'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router";

// type user ={
//   name:string ,
//   username:string,
//   email:string,
//   password:string,
//   rePassword:string,
//   dateOfBirth:Date|null,
//   gender:"male"|"female"
// }
export default function Register() {
  let nav = useNavigate()
    let ValidationSchema = Zod.object(
    {
      name:Zod.string().min(2 ,"Min Length Is 2"),
      email:Zod.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Enter Valid Email"),
      username:Zod.string().regex(/^[a-zA-Z0-9_-]{3,16}$/ ,"Enter Valid UserName"),
      password : Zod.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/ , "Enter Valid Passord"),
      rePassword:Zod.string(),
      gender :Zod.enum(["male","female"]),
      dateOfBirth: Zod.date().refine((data:Date)=>{
        const nowdate = new Date()
        const Nowyear = nowdate.getFullYear()
        const datOfbrith = data.getFullYear()
        return(Nowyear - datOfbrith) > 10
      },"Enter Valid Date")
  
  
    }).refine((data)=>{
      return data.password == data.rePassword
    },{
      error:" Confirme Password Not match Password",
      path:['repassword']
    }) 
  type user = Zod.infer<typeof ValidationSchema>
  const [gender, setGender ] = useState("");
  const {handleSubmit,register , formState:{errors}} = useForm<user>({
    defaultValues:{
      name:"",
      username:"",
      email:"",
      password :"",
       rePassword:"",
      gender:"male",
      dateOfBirth:undefined
    },
    resolver:zodResolver(ValidationSchema)
  })
  // console.log(errors);
  

 async function handelApi(values){
console.log(values);
 

     await  axios.post(`https://route-posts.routemisr.com/users/signup`, values).then((res)=>{
 Swal.fire({
      title: "Success!",
      text: res.data.message,
      icon: "success",
      confirmButtonText: "OK",
      confirmButtonColor: "#1e40af"
    });
    setTimeout(() => {
      
      nav("/login")
    }, 2000);
   }).catch ((err)=>{
 Swal.fire({
      title: "Error!",
      text: err.response.data.message,
      icon: "error",
      confirmButtonText: "error",
    });
})

}
  return (
    <div>
      <>
        <div className="mx-auto container ps-10 ">
          <h1 className="text-2xl font-black">
            Create new account
          </h1>
          <p>It is quick and easy.</p>

      <form onSubmit={handleSubmit(handelApi)} className="max-w-sm mt-7">
  {/* Full Name */}
  <div className="mb-5">
    <label htmlFor="name" className="block mb-2.5 text-sm font-medium text-heading">
      Full Name
    </label>
    <input
      id="name"
      type="text"
      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
      placeholder="Full Name"
      {...register("name",{required:"name is Required" ,
        maxLength:{value:20 ,message:"Max Lenght is 20"}
      })}
    />
    {errors.name &&<p className="text-red-500">{errors.name.message}</p>}
  </div>

  {/* Username */}
  <div className="mb-5">
    <label htmlFor="username" className="block mb-2.5 text-sm font-medium text-heading">
      User Name (Optional)
    </label>
    <input
      id="username"
      type="text"
      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
      placeholder="User Name"
      {...register("username")}
    />
      {errors.username &&<p className="text-red-500">{errors.username.message}</p>}
  </div>

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

  {/* Gender */}
  <div className="mb-5">
    <label htmlFor="gender-select" className="block mb-2.5 text-sm font-medium text-heading">
      Gender
    </label>
    <select
      id="gender-select"
      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow"
      {...register("gender")}
      
    >
      <option value="" disabled >
        Select Gender
      </option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  </div>

  {/* Date of Birth */}
  <div className="mb-5">
    <label htmlFor="dateOfBirth" className="block mb-2.5 text-sm font-medium text-heading">
      Date of Birth
    </label>
    <input
      id="dateOfBirth"
      type="date"
      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow text-body"
      {...register("dateOfBirth" ,{valueAsDate:true})}
      
    />
      {errors.dateOfBirth &&<p className="text-red-500">{errors.dateOfBirth.message}</p>}
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

  {/* Confirm Password */}
  <div className="mb-5">
    <label htmlFor="repassword" className="block mb-2.5 text-sm font-medium text-heading">
      Confirm Password
    </label>
    <input
      id="repassword"
      type="password"
      className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body"
      placeholder="••••••••"
      {...register("rePassword")}
    />
      {errors.rePassword &&<p className="text-red-500">{errors.rePassword.message}</p>}
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-3 transition-colors shadow-sm"
  >
    Create New Account
  </button>
</form>
        </div>
      </>
    </div>
  );
}
