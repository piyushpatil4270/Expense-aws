import React, { useState } from "react";
import moment from "moment";

const SlidingDatePicker = ({selectedDate,setSelectedDate}) => {


    const handlePreviousDay = () => {
        setSelectedDate(prevDate => moment.utc(prevDate).subtract(1, 'days').toDate());
    };

    const handleNextDay = () => {
        setSelectedDate(prevDate => moment(prevDate).add(1, 'days').toDate());
    };
    const isBeforeToday = moment.utc(selectedDate).isBefore(moment(), 'day');

    return (
        <div className="p-[4px]  flex items-center justify-center gap-4 bg-gray-100 border border-gray-300 rounded-md shadow-md">
            <span className="text-[18px] font-semibold cursor-pointer text-black" onClick={handlePreviousDay}>{'<'}</span>
            <span className="xs:text-[12px] sm:text-[16px] font-semibold text-black">{moment(selectedDate).format('DD-MM-YY')}</span>
            <span className={`text-[18px] cursor-pointer font-semibold text-black ${isBeforeToday?'text-black':'text-gray-500'}`} onClick={()=>{
               if(isBeforeToday){
                handleNextDay()
               }
            }}>{'>'}</span>
        </div>
    );
};

export default SlidingDatePicker;
