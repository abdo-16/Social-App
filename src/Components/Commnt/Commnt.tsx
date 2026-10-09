import axios from 'axios'
import { Image, MessageSquare, Send, Share2, Smile, ThumbsUp } from 'lucide-react'
import React, { useContext, useState } from 'react'
import type { Post } from '../../intrefaces/posts'
import { Link } from 'react-router'
import Swal from 'sweetalert2'
import { AuthContext } from './../Context/AuthContext';
import {  useMutation, useQuery , useQueryClient} from '@tanstack/react-query'
import type { Comment } from '../../intrefaces/Coment'
import EmojiPicker from 'emoji-picker-react'
import CreateComment from '../createComment/CreateComment'



export default function Commnt({ posts}:{posts:Post} ) {
    let {_id,topComment ,commentsCount ,likesCount ,sharesCount ,likes  } =posts
   
    const [showPicker, setShowPicker] = useState(false);
    //  let [comnetList , setComentlist]=useState<Comment[]|null>(null)
    let [showCreateComment,setShowCreateComment] =useState(false)
     let {userData} =useContext(AuthContext)
      const queryClient = useQueryClient() 
      
      //  async function putLike(id:string){
      //   let {data} = await axios.put(`https://route-posts.routemisr.com/posts/${_id}/like`,'',{
      //     headers:{
      //       Authorization:`Bearer ${localStorage.getItem("userToken")}`
      //     }
      //   })
      //    Swal.fire({
      //         title: "Success!",
      //         text: data.message,
      //         icon: "success",
      //         confirmButtonText: "OK",
      //         confirmButtonColor: "#1e40af"
      //       });
      //         setTimeout(() => {
      //     location.reload()
      //   }, 1000);
            
      // }
      // ------------------------Like-----------------------------------------------
      let {mutate}=useMutation({
        mutationFn:(_id:string)=>putLike(_id),
        onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['Posts'] })
  },
      })

      function putLike(_id:string){
        return  axios.put(`https://route-posts.routemisr.com/posts/${_id}/like`,"",{
         headers:{
            Authorization:`Bearer ${localStorage.getItem("userToken")}`
          }
        })
      }
// --------------------------getAllComment---------------------------------------
      let {data ,refetch  } = useQuery({
        queryKey:["Comments",_id],
        queryFn:()=>getAllComntes(_id),
          enabled: false,
        
     
      })
      function getAllComntes(_id:string){
        return  axios.get(`https://route-posts.routemisr.com/posts/${_id}/comments?page=1&limit=10`,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("userToken")}`
          }
        })
      }
      let comnetList :Comment[]|undefined = data?.data?.data?.comments

  return (
    <div>
      
           {/* Post Stats */}
            <div className="flex items-center justify-between text-xs text-slate-500 py-1 border-b border-slate-100">
              <div className="flex items-center gap-1">
                <span className="bg-blue-600 text-white p-1 rounded-full text-[10px]">
                  <ThumbsUp size={10} />
                </span>
                <span>{likesCount} likes</span>
              </div>
              <div className="flex items-center gap-3">
                <span>{sharesCount} shares & {commentsCount} comments</span>
                <Link to={"/post/"+_id} className="text-blue-600 font-medium hover:underline">View details</Link>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-around pt-1  text-xs font-medium">
              <button onClick={()=>(mutate(_id))} className={`flex items-center ${likes.find((ele)=>ele==userData._id)?'text-blue-500':'text-slate-600'} gap-2 hover:bg-slate-50 py-2 px-4 rounded-lg w-full justify-center transition`}>
                <ThumbsUp size={16} />
                <span>Like</span>
              </button>
              <button onClick={()=>{
                setShowCreateComment((prev)=>!prev)
              }} className={`flex items-center gap-2 hover:bg-slate-50 py-2 px-4 rounded-lg w-full justify-center transition`}>
                <MessageSquare size={16} />
                <span>Comment</span>
              </button>
              <button className="flex items-center gap-2 hover:bg-slate-50 py-2 px-4 rounded-lg w-full justify-center transition">
                <Share2 size={16} />
                <span>Share</span>
              </button>
            </div>

             {topComment&& !comnetList&&
             <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 font-sans max-w-xl mx-auto space-y-3">
      {/* Title */}
      <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase block">
        TOP COMMENT
      </span>

      {/* Comment Body Box */}
      <div className="bg-white rounded-2xl p-3 flex items-start gap-3 shadow-xs">
        <img 
          src={topComment?.commentCreator.photo} 
          alt={topComment?.commentCreator.name} 
          className="w-9 h-9 rounded-full object-cover mt-0.5" 
        />
        <div className="flex flex-col">
          <h5 className="font-bold text-xs text-slate-900 leading-tight">
            {topComment?.commentCreator.name} 
          </h5>
          <p className="text-xs text-slate-700 mt-1">
            {topComment.content}
          </p>
        </div>
      </div>

      {/* View All Comments Link */}
      <button onClick={()=>refetch()}  className="text-xs font-semibold text-blue-600 hover:underline block pt-1 cursor-pointer">
        View all comments
      </button>
                </div>
                }
                 {comnetList&&
               comnetList?.map((ele)=>{
          return(
                 <div key={ele?._id}  className="bg-white rounded-2xl p-3 flex items-start gap-3 shadow-xs">
        <img 
          src={ele?.commentCreator.photo} 
          alt={ele?.commentCreator.name} 
          className="w-9 h-9 rounded-full object-cover mt-0.5" 
        />
        <div className="flex flex-col">
          <h5 className="font-bold text-xs text-slate-900 leading-tight">
            {ele?.commentCreator.name} 
          </h5>
          <p className="text-xs text-slate-700 mt-1">
            {ele.content}
          </p>
        </div>
      </div>
      
          )
          

        })
      }
      {showCreateComment&&<CreateComment postId ={_id} 
      onSuccess = {()=>{
         queryClient.invalidateQueries({ queryKey: ['Posts'] })
      refetch()
      }
    }
      />}
    
    </div>
  )
}
