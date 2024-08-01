import React, { useState } from 'react'
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
const Daily_card= ({title,description}) => {
  const [showDesc,setShowdesc]=useState(false)
  return (
    <div className="flex flex-col items-center justify-center gap-[2px]">
                  <div className="flex items-center justify-center gap-5">
                    <span className="mx-[2px] font-normal text-black xs:text-[12px] sm:text-[15px]">
                      {title}
                    </span>
                    {!showDesc ?(<ArrowCircleDownIcon
                      fontSize="15px"
                      onClick={()=>setShowdesc(!showDesc)}
                      style={{ marginTop: "2px", marginBottom: "2px" }}
                    />):(<ArrowCircleUpIcon
                      fontSize="15px"
                      onClick={()=>setShowdesc(!showDesc)}
                      style={{ marginTop: "2px", marginBottom: "2px" }}
                    />)}
                  </div>
                  {showDesc && <div className="flex  items-start justify-start mt-[2px] w-full">
                    <span className=" xs:text-[10px] sm:text-[12px] mx-[2px]">{description}</span>
                  </div>}
                </div>
  )
}

export default Daily_card
