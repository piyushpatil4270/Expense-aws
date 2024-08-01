const express=require("express")

const router=express.Router()
const Users=require("../models/Users")
const authenticate=require("../middleware/auth")
const sequelize = require("../utils/db")
const Expenses = require("../models/Expenses")
const { addPremiumUser, findUser, getLeaderboard } = require("../controllers/premium")



router.post("/add",authenticate,addPremiumUser)


router.get("/user",authenticate,findUser)


router.get("/leaderboard",getLeaderboard)




module.exports=router