import axios from 'axios'
import React, { useState } from 'react'

const Resend_Form  = () => {
    const [email,setEmail]=useState("")

    const sendForm=async()=>{
        try {
            const res=axios.post("http://localhost:5500/auth/forgot_password",{email:email})
            
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='w-full h-dvh bg-cyan-300 flex flex-col justify-center items-center'>
    <div className='xs:w-[60%]  sm:w-[40%] bg-white flex flex-col  '>
        <div className='xs:p-1 xs:m-1  sm:p-2 sm:m-2'>
            <span className='border-0 border-b-2 xs:text-[14px] sm:text-[16px] border-cyan-300 p-2'>Forgot Password</span>
        </div>
      
        <div className='w-auto xs:p-1 xs:m-1  sm:p-2 sm:m-2  gap-2 flex items-center justify-start'>
            <span className='flex-1 xs:text-[12px] sm:text-[15px]'>Email</span>
            <input className='w-[70%] border-0 border-cyan-400 border-b-[1px] outline-none' onChange={(e)=>setEmail(e.target.value)} />
        </div>
        
        <div className='w-auto xs:p-1 xs:m-1  sm:p-2 sm:m-2 gap-2 flex items-center justify-center'>
            <button className='text-[14px] bg-cyan-300 p-[4px] rounded-sm text-white' onClick={sendForm} >Confirm</button>
           
        </div>
       
    </div>
    </div>
  )
}

export default Resend_Form 
