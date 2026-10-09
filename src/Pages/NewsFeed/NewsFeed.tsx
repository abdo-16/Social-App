import axios from 'axios'
import React, { useEffect, useState } from 'react'
import type { Post } from '../../intrefaces/posts'
import { 
  Rss, 
  FileText, 
  Users, 
  Bookmark, 
  Globe, 
  Image, 
  Smile, 
  Send, 
  MoreHorizontal, 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  UserPlus, 
  Search, 
  ExternalLink 
} from 'lucide-react';
import type { Comment } from '../../intrefaces/Coment';
import CreatePost from '../../Components/CreatePost/CreatePost';
import Commnt from '../../Components/Commnt/Commnt';
import SinglePost from '../../Components/SinglePost/SinglePost';
import { useQuery } from '@tanstack/react-query';
import { BallTriangle} from 'react-loader-spinner'
import { Helmet } from 'react-helmet-async';


export default function NewsFeed() {
  // let [postsList , setpostsList]=useState<Post|null>(null)
 
  //  async function getDataPostes(){
  //   let {data} = await axios.get("https://route-posts.routemisr.com/posts",{
  //     headers:{
  //       Authorization:`Bearer ${localStorage.getItem("userToken")}`
  //     }
  //   })
  //   setpostsList(data.data.posts)
    
  // }
  
  // useEffect(()=>{
  //   getDataPostes()
  // },[])
  let {data , isFetching ,isLoading ,error,isSuccess,isError ,refetch} = useQuery({
    queryKey:["Posts"],
    queryFn:getData
  })
  function getData(){
    return axios.get("https://route-posts.routemisr.com/posts",{
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
  let postsList:Post[]= data?.data .data.posts
  return (
    
    <div>
      <Helmet>
      <title>
        feed
      </title>
    </Helmet>
     <div className="bg-slate-100 min-h-screen p-4 md:p-6 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="md:col-span-3 space-y-2">
          <div className="bg-white rounded-xl p-3 shadow-sm border border-slate-200 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-blue-50 text-blue-600 font-medium text-sm transition">
              <Rss size={18} />
              <span>Feed</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm transition">
              <FileText size={18} />
              <span>My Posts</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm transition">
              <Users size={18} />
              <span>Community</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm transition">
              <Bookmark size={18} />
              <span>Saved</span>
            </button>
          </div>
        </aside>

        {/* ================= MAIN FEED ================= */}
        <main className="md:col-span-6 space-y-6">
          
          {/* CREATE POST CARD */}
          <CreatePost fetch={refetch}/>

          {/* POST ITEM */}
      <>
       {postsList?.map((element:Post) => {
      
        return(
         <SinglePost fetch={refetch} postData={element}/>
        )
      })
      }
     
      </>

        </main>

        {/* ================= RIGHT SIDEBAR ================= */}
        <aside className="md:col-span-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-slate-600" />
                <h3 className="font-semibold text-sm text-slate-800">Suggested Friends</h3>
              </div>
              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">5</span>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search friends..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-slate-400"
              />
            </div>

            {/* List */}
            {/* <div className="space-y-3">
              {suggestedFriends.map((friend) => (
                <div key={friend.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-xl transition border border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={friend.img} 
                      alt={friend.name} 
                      className="w-9 h-9 rounded-full object-cover" 
                    />
                    <div>
                      <h5 className="font-semibold text-xs text-slate-800 leading-tight">{friend.name}</h5>
                      <span className="text-[10px] text-slate-400 block">{friend.handle}</span>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                        <span>{friend.followers} followers</span>
                        {friend.mutual > 0 && (
                          <>
                            <span>•</span>
                            <span className="bg-blue-50 text-blue-600 px-1.5 py-0.2 rounded">{friend.mutual} mutual</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <button className="bg-blue-50 hover:bg-blue-100 text-blue-600 p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition">
                    <UserPlus size={14} />
                    <span className="text-[11px]">Follow</span>
                  </button>
                </div>
              ))}
            </div> */}

            {/* View More */}
            <button className="w-full text-center text-xs font-medium text-slate-600 hover:text-slate-800 py-1 transition">
              View more
            </button>
          </div>
        </aside>

      </div>
    </div>



    </div>
  )
}
