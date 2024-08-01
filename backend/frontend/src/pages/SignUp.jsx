import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const SignUp = ({setIsAuth}) => {
  const [email,setEmail]=useState("")
  const [pass,setPass]=useState("")
  const navigate=useNavigate()
  const handleLogin=async()=>{
    try {
        const res=await axios.post("http://16.170.233.122:5500/auth/login",{email:email,password:pass})
        console.log(res.data)
        alert(res.data.msg)
        localStorage.setItem('token',res.data.token)
        if(res.status===202){
          setIsAuth(true)
          navigate("/daily")
        }
    } catch (error) {
       if(error.response && (error.response.status === 404))alert("Incorrect Password")
       else if(error.response && (error.response.status === 401))alert("User doesnt exist") 

    }
  }
  return (
    <div className='w-full h-dvh bg-cyan-300 flex flex-col justify-center items-center'>
    <div className='xs:w-[60%]  sm:w-[40%] bg-white flex flex-col  '>
        <div className='xs:p-1 xs:m-1  sm:p-2 sm:m-2'>
            <span className='border-0 border-b-2 xs:text-[14px] sm:text-[16px] border-cyan-300 p-2'>SignIn</span>
        </div>
      
        <div className='w-auto xs:p-1 xs:m-1  sm:p-2 sm:m-2  gap-2 flex items-center justify-start'>
            <span className='flex-1 xs:text-[12px] sm:text-[15px]'>Email</span>
            <input className='w-[70%] border-0 border-cyan-400 border-b-[1px] outline-none' onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className='w-auto xs:p-1 xs:m-1  sm:p-2 sm:m-2 gap-2 flex items-center justify-start'>
            <span className='flex-1 xs:text-[12px] sm:text-[15px]'>Password</span>
            <input className='w-[70%] border-0 border-cyan-400 border-b-[1px] outline-none' onChange={(e)=>setPass(e.target.value)} />
        </div>
        <div className='w-auto xs:p-1 xs:m-1  sm:p-2 sm:m-2 gap-2 flex items-center justify-center'>
            <button className='text-[14px] bg-cyan-300 p-[4px] rounded-sm text-white' onClick={handleLogin}>Sign-Up</button>
            <a href='/signin' className='border-0 border-b-[1px] text-[14px] p-1 border-blue-700'>Sign-In</a>
           
        </div>
        <div className='w-auto xs:p-1 xs:m-1  sm:p-2 sm:m-2 gap-2 flex items-center justify-center'>
        <a href='/forgot' className='border-0 border-b-[1px] text-[14px] p-1 border-blue-700'>Forgot Password</a>
       </div>
    </div>
    </div>
  )
}

export default SignUp
