const express=require("express")
const { Reset } = require("../controllers/reset")

const router=express.Router()




router.get("/reset_password/:id",Reset)



module.exports=router