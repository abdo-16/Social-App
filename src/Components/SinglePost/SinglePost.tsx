import React, { useContext } from 'react'
import type { Post } from '../../intrefaces/posts'
import Commnt from '../Commnt/Commnt'
import { Dropdown, DropdownItem } from 'flowbite-react'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Helmet } from 'react-helmet-async'

export default function SinglePost({postData , fetch} :{postData:Post}) {
      const {id, image , body , createdAt,user:{name , username ,photo,_id } } = postData
      let {userData} =useContext(AuthContext)
       async function deletPost(id:string){
       try {
         let {data} = await axios.delete(`https://route-posts.routemisr.com/posts/${id}`,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("userToken")}`
          }
        })
         Swal.fire({
                      title: "Success!",
                      text: data.message,
                      icon: "success",
                      confirmButtonText: "OK",
                      confirmButtonColor: "#1e40af"
                    });
                      setTimeout(() => {
                  fetch()
                }, 1000);
        
       } catch (error) {
        console.log(error.response);
        
       }
        
      }
      console.log('image =', image)
  return (
    <div>
      
        <div key={id} className="bg-white rounded-2xl  shadow-sm border border-slate-200 space-y-20 container mx-auto p-xl-5">
            
            {/* Sub-Card / Quoted Post */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
              <div className="p-3 flex items-center justify-between border-b border-slate-100 ">
                <div className="flex items-center gap-2 w-full">
                  <img 
                    src={photo} 
                    alt={name} 
                    className="w-7 h-7 rounded-full object-cover" 
                  />
                  <div>
                    <h5 className="font-medium text-xs text-slate-800">{name}</h5>
                    <span className="text-[10px] text-slate-400">{username}</span>
                    <p className="text-[10px] text-slate-400">{new Date(createdAt).toLocaleDateString("en",{day: `2-digit`,month:"long", year:"numeric" })}</p>
                  </div>
                </div>
                <div  >
     <Dropdown className='text-black' dismissOnClick={false}>
      <DropdownItem>Save Post</DropdownItem>
        {_id == userData._id&&<>
          <DropdownItem>Editi Post</DropdownItem>
      <DropdownItem onClick={()=>deletPost(id)} className='text-red-500'>Delete post</DropdownItem>
        </>}
    
      
    </Dropdown>
                </div>
              
              </div>

              <div className="p-3">
                <p className="text-sm font-semibold  text-slate-800 mb-3" >{body}</p>
                <img 
                  src={image} 
                  alt={body} 
                  className="w-full max-h-[600px] object-contain rounded-lg bg-slate-100"
                />
              </div>
            </div>

         <Commnt posts={postData}/>
          </div>
    </div>
  )
}
