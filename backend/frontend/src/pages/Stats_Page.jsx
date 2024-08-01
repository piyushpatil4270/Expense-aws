import React, { useEffect, useState } from 'react'
import Statistics from '../components/Statistics'
import axios from 'axios'

const Stats_Page = () => {
    const [data,setdata]=useState([])
    const fetchLeaderboard=async()=>{
        try {
            const res=await axios.get("http://localhost:5500/premium/leaderboard")
            setdata(res.data)
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(()=>{
     fetchLeaderboard()
    },[])
  return (
    <div className='w-full items-center  flex flex-col xs:gap-1 sm:gap-2'>
      {data.map((user)=>{
        return(
            <Statistics user={user.email} expense={user.totalExpenses} />
        )
      })}
    </div>
  )
}

export default Stats_Page
