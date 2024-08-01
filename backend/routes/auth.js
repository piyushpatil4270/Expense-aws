const express = require("express");
const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const router = express.Router();
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const nodemailer=require("nodemailer")
const {v4:uuidv4}=require("uuid");
const Request = require("../models/ResetReq");
const { signUp, logIn, forgotPassword, ResetPassword } = require("../controllers/auth");






router.post("/signup",signUp );

router.post("/login",logIn);

router.post("/forgot_password",forgotPassword);


router.post("/reset/:id",ResetPassword)

module.exports = router;
