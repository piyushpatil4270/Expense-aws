import React, { useState } from "react";
import moment from "moment";

const SlidingDatePicker = ({currMonth,setCurrMonth}) => {


    const handlePreviousMonth = () => {
        setCurrMonth(prevDate => moment.utc(prevDate).subtract(1, 'months').toDate());
    };
    
    const handleNextMonth = () => {
        setCurrMonth(prevDate => moment.utc(prevDate).add(1, 'months').toDate());
    };
   

    return (
        <div className="p-[4px] flex items-center justify-center gap-4 bg-gray-100 border border-gray-300 rounded-md shadow-md">
            <span className="text-[18px] font-semibold cursor-pointer text-black" onClick={()=>handlePreviousMonth()}>{'<'}</span>
            <span className="text-[15px] font-semibold text-black">{moment(currMonth).utc().format('MMMM YYYY')}</span>
            <span className={`text-[18px] cursor-pointer font-semibold text-black`} onClick={()=>{
               handleNextMonth()
            }}>{'>'}</span>
            
        </div>
    );
};

export default SlidingDatePicker;
