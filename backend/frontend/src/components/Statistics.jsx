import React from 'react'

const Statistics = ({user,expense}) => {
  return (
    <div className="p-2 w-full m-2 bg-[#ededed] flex justify-start items-center gap-2">
    <div className='bg-red-600 w-5 h-5 rounded-full'>
    <span className='text-red-600 text-[2px]'>0</span>
    </div>
    <div className="flex-1 flex gap-1 items-center justify-center">
        <div className='w-[50%]'>
        <span className="card-title sm:text-[16px] xs:font-semibold xs:text-[12px] flex-1">{user.split('@')[0]}</span>
        </div>
        <div className='w-[50%]'>
        <p className="card-text flex-1 sm:text-[14px] xs:text-[10px] font-normal">Total Expense: ${expense}</p>
        </div>
       
       
    </div>
</div>
  )
}

export default Statistics
