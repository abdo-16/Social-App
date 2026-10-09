import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { data, useParams } from 'react-router';
import SinglePost from './../../Components/SinglePost/SinglePost';
import type { Post } from '../../intrefaces/posts';
import { useQuery } from '@tanstack/react-query';
import { BallTriangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet-async';



export default function PostDetailes( ) {
    let {id} = useParams()
    
    
    // let [post , setPost] = useState<Post|null >(null)
  // async  function getPostDetailes(){
  //       let {data} =  await axios.get(`https://route-posts.routemisr.com/posts/${id}`,{
  //            headers:{
  //       Authorization:`Bearer ${localStorage.getItem("userToken")}`
  //     }
  //       })
  //       setPost(data.data.post)
  //   }
  //   useEffect(()=>{
  //       if(id){

  //           getPostDetailes()
  //       }
  //   },[])
  let {isError,isFetching ,isLoading ,error,data} = useQuery({
    queryKey:["postDeailes" ,id],
    queryFn:getPostDetailes

  })
  function getPostDetailes(){
     return axios.get(`https://route-posts.routemisr.com/posts/${id}`,{
              headers:{
         Authorization:`Bearer ${localStorage.getItem("userToken")}`
       }
         })
  }
   if(isLoading){
    return(<BallTriangle
height={100}
width={100}
radius={5}
color="#4fa94d"
ariaLabel="ball-triangle-loading"
wrapperStyle={{}}
wrapperClass=""
visible={true}
/>)
  }
  if(isError){
    <div className='text-red-500'>{error?.message}</div>
  }
    let post:Post[] = data?.data .data.post
       
  return (
    <>
   
    {post&&<SinglePost postData={post}>

    </SinglePost>
    }
    
    </>
  )
}
