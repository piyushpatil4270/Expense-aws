import React, { useState } from 'react'
import axios from "axios"
const Signin = () => {
    const [email,setEmail]=useState("")
    const [pass,setPass]=useState("")
    const [username,setUsername]=useState("")
    const hadnleSignIn=async()=>{
        try {
            const res=await axios.post("http://localhost:5500/auth/signup",{email:email,username:username,password:pass})
            alert(res.data)
        } catch (error) {
            console.log(error)
        }
       
    }
  return (
    <div className='w-full h-dvh bg-cyan-300 flex flex-col justify-center items-center'>
    <div className='xs:w-[60%]  sm:w-[40%] bg-white flex flex-col  '>
        <div className='xs:p-1 xs:m-1  sm:p-2 sm:m-2'>
            <span className='border-0 border-b-2 xs:text-[14px] sm:text-[16px] border-cyan-300 p-2'>SignIn</span>
        </div>
        <div className='w-auto xs:p-1 xs:m-1  sm:p-2 sm:m-2 flex items-center justify-start p-2'>
            <span className='flex-1  xs:text-[12px] sm:text-[15px]'>Username</span>
            <input className='w-[70%] border-0 border-cyan-400 border-b-[1px] outline-none' onChange={(e)=>setUsername(e.target.value)} />
        </div>
        <div className='w-auto xs:p-1 xs:m-1  sm:p-2 sm:m-2  gap-2 flex items-center justify-start'>
            <span className='flex-1 xs:text-[12px] sm:text-[15px]'>Email</span>
            <input className='w-[70%] border-0 border-cyan-400 border-b-[1px] outline-none' onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className='w-auto xs:p-1 xs:m-1  sm:p-2 sm:m-2 gap-2 flex items-center justify-start'>
            <span className='flex-1 xs:text-[12px] sm:text-[15px]'>Password</span>
            <input className='w-[70%] border-0 border-cyan-400 border-b-[1px] outline-none'  onChange={(e)=>setPass(e.target.value)}/>
        </div>
        <div className='w-auto xs:p-1 xs:m-1  sm:p-2 sm:m-2 gap-8 flex items-center justify-center  '>
            <button className='text-[14px] bg-cyan-300 p-[4px] rounded-sm text-white' onClick={hadnleSignIn}>Sign-In</button>
            <a href='/' className='border-0 border-b-[1px] text-[14px] p-1 border-blue-700'>Log-In</a>
        </div>
   
    </div>
    </div>
  )
}

export default Signin
