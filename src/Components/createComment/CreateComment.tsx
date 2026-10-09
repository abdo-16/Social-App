import React, { useContext, useState } from 'react';
import { Image, Smile, Send } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { AuthContext } from '../Context/AuthContext';

export default function CreateComment({postId , onSuccess}) {
    let {userData} =useContext(AuthContext)
  const [showPicker, setShowPicker] = useState(false);
  const [text, setText] = useState('');
  const [imgeFile, setImgefile] = useState<File | null>(null);
  const onEmojiClick = (emojiData) => {
    setText((prevInput) => prevInput + emojiData.emoji);
    setShowPicker(false);
  };
  function HandleCreateComment(){
   let formdata = new FormData()
    formdata.append("content" ,text)
   if(imgeFile) formdata.append("image" ,imgeFile[0])
  return  axios.post(`https://route-posts.routemisr.com/posts/${postId}/comments`, formdata,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("userToken")}`
        }
    }) 
  }
  let {mutate , isPending} =useMutation({
    mutationFn:HandleCreateComment,
    onSuccess :()=>{
      onSuccess?.()
    },
    onError :(error)=>{
      console.log(error);
      
    }
  })
  return (
    <div className="flex items-start gap-3 p-4 bg-slate-50  justify-center">
      {/* صورة البروفايل */}
      <img
        src={userData?.photo}
        alt={userData?.name}
        className="w-10 h-10 rounded-full object-cover"
      />

      {/* صندوق التعليق */}
      <div className="relative flex-1 max-w-2xl bg-white border border-blue-200 rounded-3xl p-3 shadow-sm focus-within:border-blue-400 transition-colors">
        
        {/* مكان إدخال النص */}
        <textarea
            value={text}
            onChange={(e)=>{setText(e.target.value)}}
          placeholder={`Comment as ${userData?.name}...`}
          rows={2}
          className="w-full text-sm text-gray-700 border-none placeholder-gray-400 focus:outline-none resize-none bg-transparent pr-12"
        />

        {/* الشريط السفلي (الأيقونات + زر الإرسال) */}
        <div className="flex items-center justify-between pt-1">
          {/* أيقونات رفع الصور والإيموجي */}
          <div className="flex items-center gap-3 text-gray-400">
           <label 
  htmlFor="imge" 
  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium transition cursor-pointer"
>
  <Image className="w-5 h-5 text-emerald-500" />

  </label>
  <input 
    id="imge" 
    type="file" 
    hidden 
    onChange={(e) => {
      const file = e.target.files?.[0];
  if (file) {
    setImgefile(file);
  }

    }} 
  />
         <button 
        type="button" 
        onClick={() => setShowPicker((prev) => !prev)}
        className="hover:text-gray-600 transition-colors p-1"
      >
        <Smile size={18} />
      </button>

      {/* نافذة الإيموجي - تظهر فقط عند النقر على الزر */}
      {showPicker && (
        <div className="absolute bottom-10 right-0 z-50">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
          </div>

          {/* زر الإرسال الدائري */}
          <button
          disabled={isPending}
          onClick={()=>mutate()}
            type="button"
            className="w-9 h-9 rounded-full bg-blue-300 text-white flex items-center justify-center hover:bg-blue-400 transition-colors shadow-sm"
          >
            <Send size={16} className="translate-x-[-1px] translate-y-[1px]" />
          </button>
        </div>

      </div>
    </div>
  );
}