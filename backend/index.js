const http = require("http");
const express = require("express");
const cors = require("cors");
const sequelize = require("./utils/db");
const AuthRouter = require("./routes/auth");
const Users = require("./models/Users");
const Expenses = require("./models/Expenses");
const ExpenseRouter = require("./routes/expense");
const PremiumRouter=require("../backend/routes/premium")
const Reset_req=require("./models/ResetReq")
const crypto = require("crypto");
const bodyParser = require("body-parser");
const path = require("path");
const ResetPass_Router=require("./routes/reset")
const helmet=require("helmet")
const morgan=require("morgan")
const fs=require("fs")
const app = express();
const server = http.createServer(app);
require("dotenv").config()

Users.hasOne(Expenses, { foreignKey: "userId" });
Users.hasMany(Reset_req,{foreignKey:"userId"})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

const accessLogStream=fs.createWriteStream(path.join(__dirname,"access.log"),{flags:"a"})

app.use(morgan('combined',{stream:accessLogStream}))
app.use(helmet())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


sequelize
  .sync()
  .then(() => console.log("Connected to the database on the ec2 instance"))
  .catch((err) => console.log(err));









function generateHash(key, txnid, amount, productinfo, firstname, email, salt) {
  const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
  return crypto.createHash("sha512").update(hashString).digest("hex");
}


app.post("/payu", async (req, res, next) => {
  try {
    const { txnid, amount, productinfo, firstname, email, phone } = req.body;
    console.log(req.body)
    const hash = generateHash(key, txnid, amount, productinfo, firstname, email,process.env.PAYU_SALT);
    const payuData = {
      key: process.env.PAYU_KEY,
      txnid: txnid,
      amount: amount,
      productinfo: productinfo,
      firstname: firstname,
      email: email,
      phone: phone,
      surl: "http://localhost:5500/success",
      furl: "http://localhost:5500/failure",
      hash: hash,
      service_provider: "payu_paisa",
    };

    res.status(200).json({...payuData,status:"success"});
  } catch (error) {
    console.error("Error in /payu endpoint:", error);
    res.status(500).json({ status: "failure", message: "Internal Server Error" });
  }
});

app.post("/payu_response", (req, res) => {
  try {
    const { key, txnid, amount, productinfo, firstname, email, status, hash } = req.body;
    console.log("url hitted")
    const newHash = generateHash(key, txnid, amount, productinfo, firstname, email, process.env.PAYU_SALT);
    if (newHash === hash) {
      res.status(200).json({ status: "success", message: "Payment Successful" });
    } else {
      res.status(400).json({ status: "failure", message: "Payment Verification Failed" });
    }
  } catch (error) {
    console.error("Error in /payu_response endpoint:", error);
    res.status(500).json({ status: "failure", message: "Internal Server Error" });
  }
});





app.post("/success", (req, res) => {
  console.log("Success Endpoint:", req.body);

  res.json("Payment Successful");
});

app.post("/failure", (req, res) => {
  res.json("Payment failed");
});



app.use("/password",ResetPass_Router)
app.use("/auth", AuthRouter);
app.use("/expense", ExpenseRouter);
app.use("/premium",PremiumRouter)

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"frontend","build","index.html"))
})

server.listen(process.env.PORT_NO||5500, () => console.log(`Server started on port ${process.env.PORT_NO ||5500}`));
