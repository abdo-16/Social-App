import React, { useContext } from 'react'
import { Mail, Users } from 'lucide-react'

import { AuthContext } from './../../Components/Context/AuthContext';

export default function Profile() {
  const { userData } = useContext(AuthContext)

  const stats = [
    { label: 'FOLLOWERS', value: userData?.followersCount ?? 0 },
    { label: 'FOLLOWING', value: userData?.followingCount ?? 0 },
    { label: 'BOOKMARKS', value: userData?.bookmarksCount ?? 0 },
  ]

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-[2rem] shadow-sm overflow-hidden pb-8">
        {/* ===== Cover ===== */}
        <div className="h-52 sm:h-60 bg-gradient-to-r from-slate-800 via-blue-900 to-sky-500" />

        {/* ===== Header Card (يطلع فوق الـ cover) ===== */}
        <div className="relative -mt-16 mx-4 sm:mx-8 bg-gradient-to-b from-slate-100 to-white rounded-3xl shadow-sm px-6 pt-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            {/* Avatar + Name */}
            <div className="flex items-end gap-5">
              <img
                src={userData?.photo}
                alt={userData?.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-white ring-2 ring-blue-100 shadow-md bg-white"
              />
              <div className="pb-1">
                <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
                  {userData?.name}
                </h1>
                <p className="text-lg text-slate-500">@{userData?.username}</p>
                <span className="inline-flex items-center gap-1.5 mt-2 bg-blue-50 text-blue-700 border border-blue-100 text-xs font-semibold px-3 py-1 rounded-full">
                  <Users size={13} />
                  Route Posts member
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-white border border-slate-200 rounded-2xl px-6 py-4 text-center min-w-[110px]"
                >
                  <p className="text-[11px] font-semibold tracking-wide text-slate-500">
                    {s.label}
                  </p>
                  <p className="text-3xl font-extrabold text-slate-900 mt-1">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== Bottom Section ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mx-4 sm:mx-8 mt-6">
          {/* About */}
          <div className="lg:col-span-2 bg-slate-50 border border-slate-200 rounded-2xl p-5 min-h-[160px]">
            <h2 className="text-sm font-bold text-slate-900 mb-4">About</h2>
            <div className="space-y-3 text-sm text-slate-600">
              <p className="flex items-center gap-3">
                <Mail size={16} className="text-slate-500" />
                {userData?.email}
              </p>
              <p className="flex items-center gap-3">
                <Users size={16} className="text-slate-500" />
                Active on Route Posts
              </p>
            </div>
          </div>

          {/* My posts + Saved posts */}
          <div className="space-y-4">
            <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4">
              <p className="text-[11px] font-bold tracking-wide text-blue-800">
                MY POSTS
              </p>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">
                {userData?.postsCount ?? 0}
              </p>
            </div>
            <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4">
              <p className="text-[11px] font-bold tracking-wide text-blue-800">
                SAVED POSTS
              </p>
              <p className="text-2xl font-extrabold text-slate-900 mt-1">
                {userData?.savedPostsCount ?? 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}