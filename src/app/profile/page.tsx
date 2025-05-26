"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { toast } from "react-hot-toast"

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success('Logout successful');
      router.push("/login");
    } catch (error: any) {
      console.log("logout failed", error.message);
      toast.error(error.message);
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me');
    console.log(res.data);
    setData(res.data.data._id);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-green-200 dark:from-gray-900 dark:to-black px-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-4">Profile Page</h1>

        <h2 className="p-2 mb-6 text-lg font-mono rounded bg-green-500 text-white dark:bg-green-600 dark:text-white break-all">
          {data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
        </h2>

        <button
          onClick={onLogout}
          className="w-full p-3 mb-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300 dark:bg-red-600 dark:hover:bg-red-700"
        >
          Logout
        </button>

        <button
          onClick={getUserDetails}
          className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Get Details
        </button>
      </div>
    </div>
  )
}
