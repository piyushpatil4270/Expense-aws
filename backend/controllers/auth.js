const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const nodemailer=require("nodemailer")
const {v4:uuidv4}=require("uuid");
const Request = require("../models/ResetReq");


const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: 'piyushpatil4270@gmail.com',
        pass: 'uwzocqrsvibhjans' 
    }
})


function generateToken(id) {
  const token = jwt.sign({ userId: id }, "fskhkahkk88245fafjklakljfalk");
  return token;
}


const signUp=async (req, res, next) => {
    try {
      const body = req.body;
      const username = body.username;
      const email = body.email;
      const user = await Users.findOne({ where: { username: username } });
      if (user) return res.status(202).json("User already exist");
      const useremail = await Users.findOne({ where: { email: email } });
      if (useremail) return res.status(202).json("User with email already exist");
      const hasdhedPass = await bcrypt.hash(body.password, saltRounds);
      await Users.create({
        username: body.username,
        email: body.email,
        password: hasdhedPass,
      });
  
      res.json("User created succesfully");
    } catch (error) {
      res.status(404).json(error);
    }
  }

  const logIn= async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ where: { email: email } });
      if (!user) {
        return res.status(401).json("Email doesnt exist");
      }
  
      const matched = await bcrypt.compare(password, user.password);
      if (!matched) return res.status(404).json("Password is incorrect");
      const token = generateToken(user.id);
      res.status(202).json({ msg: "Login Successful", token: token });
    } catch (error) {
      res.status(404).json(error);
    }
  }


const forgotPassword=async (req, res, next) => {
    try {
     const {email}=req.body
     const user=await Users.findOne({where:{email:email}})
     if(!user){
      return res.status(404).json("User with email doesnt exist")
     }
     const userId=user.id
     const uId=uuidv4()
     const reset_req=await Request.create({
      id:uId,
      isActive:true,
      userId:userId
     })
     
     const mailOptions={
      from:'piyushpatil4270@gmail.com',
      to:email,
      subject:"Reset email ",
      text:"Successfully retrieve to old password",
      html:`<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
          </head>
          <body>
            <a href="http://localhost:5500/password/reset_password/${uId}">Reset Password</a>
          </body>
        </html>`
     }
   
      transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
          console.log(err)
          return
        }
        console.log(info)
      })
      res.status(202).json(`Mail sent to ${email} successfully`)
     } catch (error) {
      console.log(error)
      res.status(404).json(error);
    }
  }


const ResetPassword=async(req,res)=>{
    try {
      const {id}=req.params
      console.log("Url hitted")
      const {email,password}=req.body
      
      const Reset_req=await Request.findOne({where:{id:id}})
      if(!Reset_req){
       return res.send("Request doesnt exist")
      }
      const user=await Users.findOne({where:{email:email}})
      if(!user){
        return res.send("User doesnt exist")
  
      }
      const hasdhedPass=await bcrypt.hash(password,saltRounds)
     const update= await Users.update(
        {password:hasdhedPass},
        {where:{email:email}}
      )
      if(update){
      await Reset_req.update(
        {isActive:false},
        {where:{id:id}}
      )
      return res.send("Password updated succesfully")
      }
      res.send("There was error updating password")
      
    } catch (error) {
      console.log("Error resetting password ",error)
      res.status(404).json("Error")
    }
  }



module.exports={
    signUp,
    logIn,
    forgotPassword,
    ResetPassword
}