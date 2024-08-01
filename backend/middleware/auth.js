const Users=require("../models/Users")
const jwt=require("jsonwebtoken")



const authenticate=async(req,res,next)=>{
    try {
        const token=req.header("Authorization")
        console.log("Token is ",token)
        const user=jwt.verify(token,'fskhkahkk88245fafjklakljfalk')
        console.log(user)
        Users.findByPk(user.userId)
        .then((user)=>{
            console.log("User is ",JSON.stringify(user))
            req.user=user
            next()
        })
        .catch((err)=>{throw new Error(err)})
     
    } catch (error) {
        console.log(error)
        return res.status(404).json({success:false})
    }
}

module.exports=authenticate