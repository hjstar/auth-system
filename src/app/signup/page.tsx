"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import {toast} from "react-hot-toast"

export default function SignupPage(){
  const router=useRouter();
    const [user,setUser]=React.useState({
        username:"",
        email:"",
        password:""
    })
    const [buttonDisabled,setButtonDisabled]=React.useState(false);
    const [loading,setloading]=React.useState(false);

    const onSignup=async ()=>{
      try {
        setloading(true);
        const response=await axios.post("/api/users/signup",user);
        console.log("signup sucess",response.data);
        router.push("/login")
      } catch (error: unknown) {
  if (error instanceof Error) {
    console.log("signup failed", error.message);
    toast.error(error.message);
  } else {
    console.log("signup failed", error);
    toast.error("Signup failed. Please try again.");
  }
}

      finally{
        setloading(false);
      }
    }

    useEffect(()=>{
      if(user.email.length>0&&user.password.length>0&&user.username.length>0){
        setButtonDisabled(false);
      }else{
        setButtonDisabled(true);
      }
    },[user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 px-4 bg-gradient-to-br from-green-100 to-blue-200 dark:from-gray-900 dark:to-black">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-green-600 dark:text-green-400">
                    {loading ? "Signing up..." : "Signup"}
                </h1>

                <label htmlFor="username" className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
                    Username
                </label>
                <input
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 text-black dark:text-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
                  id="username"
                  type="text"
                  value={user.username}
                  onChange={(e)=>{setUser({...user,username:e.target.value})}}
                  placeholder="Enter your username"
                />

                <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
                    Email
                </label>
                <input
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 text-black dark:text-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={(e)=>{setUser({...user,email:e.target.value})}}
                  placeholder="Enter your email"
                />

                <label htmlFor="password" className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
                    Password
                </label>
                <input
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg mb-6 text-black dark:text-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
                  id="password"
                  type="password"
                  value={user.password}
                  onChange={(e)=>{setUser({...user,password:e.target.value})}}
                  placeholder="Enter your password"
                />

                <button 
                  onClick={onSignup}
                  className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-colors duration-300 mb-4 disabled:bg-gray-400"
                  disabled={buttonDisabled}
                >
                   {buttonDisabled ? "No Signup" : "Signup"}
                </button>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link href="/login" className="text-green-600 dark:text-green-400 hover:underline">
                        Visit Login
                    </Link>
                </p>
            </div>
        </div>
    )
}
