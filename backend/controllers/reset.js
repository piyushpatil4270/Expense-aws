const Reset_req=require("../models/ResetReq")



const Reset=async(req,res,next)=>{
    const {id}=req.params
    const resetReq=await Reset_req.findByPk(id)
    if(resetReq && resetReq.isActive){
     return  res.render("email",{id})
    }
    res.render("error")
  
  }


module.exports={
    Reset
}