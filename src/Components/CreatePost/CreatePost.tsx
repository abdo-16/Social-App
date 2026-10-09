import React, { useState, useRef, useEffect, useContext } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { Image, Smile, Globe, Send, ChevronDown } from 'lucide-react';
import axios from 'axios';
import { data } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from './../Context/AuthContext';
import type { user } from '../../intrefaces/User';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';


export default function CreatePost({fetch}) {
  const [postText, setPostText] = useState('');
  const [imgeFile, setImgeFile] = useState<File |null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  let {userData}:{userData:user} = useContext(AuthContext)
  const pickerRef = useRef(null);
  //  async function handelPost(){
  //  try {
  //    let formdata = new FormData()
  //   formdata.append("body" ,postText)
  //   formdata.append("image" ,imgeFile[0])
  //  let {data} =  await axios.post("https://route-posts.routemisr.com/posts" , formdata,{
  //       headers:{
  //           Authorization:`Bearer ${localStorage.getItem("userToken")}`
  //       }
  //   })
  //   console.log(data);
  //    Swal.fire({
  //         title: "Success!",
  //         text: data.message,
  //         icon: "success",
  //         confirmButtonText: "OK",
  //         confirmButtonColor: "#1e40af"
  //       });
  //       setTimeout(() => {
  //         fetch()
  //       }, 1000);
        
    
  //  } catch (error) {
  //   console.log(error.response);
    
  //  }
  // }
  

  // إضافة الإيموجي في المكان المحدد بالنص
  function handelPost(){
     let formdata = new FormData()
    formdata.append("body" ,postText)
    formdata.append("image" ,imgeFile[0])
    console.log(postText);
    console.log(imgeFile);
    
    
  return  axios.post("https://route-posts.routemisr.com/posts" , formdata,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("userToken")}`
        }
    })
 }
 let queryClient = useQueryClient();
  let {mutate} = useMutation({
  mutationFn:handelPost,
  onSuccess:((data)=>{
    console.log(data);
    queryClient.invalidateQueries({ queryKey: ['Posts'] })
  }),
  onError:((error)=>{
    console.log(error);
    
  })
 })

  const handleEmojiClick = (emojiData) => {
    setPostText((prev) => prev + emojiData.emoji);
  };

  // إغلاق قائمة الإيموجي عند الضغط في أي مكان خارجها
  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    
    <div className="max-w-xl mx-auto my-8 bg-white rounded-xl shadow-md border border-gray-200 p-4 font-sans text-gray-800">
      
      {/* 1. Profile Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-11 h-11 rounded-full overflow-hidden bg-sky-100 flex items-center justify-center border border-gray-200">
          {/* Avatar Icon / Image */}
          <img
            src={userData?.photo}
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 text-base leading-tight">
            {userData?.name}
          </h3>
          <button className="flex items-center gap-1 text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 px-2 py-0.5 rounded-md mt-1 font-medium transition">
            <Globe className="w-3.5 h-3.5 text-gray-500" />
            <span>Public</span>
            <ChevronDown className="w-3 h-3 text-gray-500" />
          </button>
        </div>
      </div>

      {/* 2. Text Input Area */}
      <div className="relative mb-3">
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder={`What's on your mind,${userData?.name}?`}
          rows={4}
          className="w-full p-3 text-gray-400 bg-gray-50/95 rounded-xl border border-gray-200 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-base transition"
        />
      </div>

      <hr className="border-gray-200 my-3" />

      {/* 3. Action Buttons & Post Bar */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-1">
          {/* Photo/Video Button */}
          <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition">
            <Image className="w-5 h-5 text-emerald-500" />
            <label htmlFor='imge'>Photo/video</label>
            <input  onChange={(e) => setImgeFile(e.target.files)}  id='imge' type="file" hidden />
          </button>

          {/* Emoji / Feeling Activity Button */}
          <button
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
              showEmojiPicker ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Smile className="w-5 h-5 text-amber-500" />
            <span>Feeling/activity</span>
          </button>
        </div>

        {/* Post Button */}
        <button
        onClick={()=>mutate()}
          disabled={!postText.trim()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium px-5 py-2 rounded-lg text-sm transition shadow-sm"
        >
          <span>Post</span>
          <Send className="w-4 h-4" />
        </button>

        {/* 4. Emoji Picker Popup */}
        {showEmojiPicker && (
          <div
            ref={pickerRef}
            className="absolute top-full left-0 mt-2 z-50 shadow-2xl rounded-2xl overflow-hidden border border-gray-200 bg-white"
          >
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              autoFocusSearch={false}
              width={340}
              height={420}
              previewConfig={{ showPreview: false }}
              searchPlaceHolder="Search emojis..."
            />
          </div>
        )}
      </div>
    </div>
  );
}