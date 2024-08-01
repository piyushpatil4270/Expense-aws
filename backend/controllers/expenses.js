
const Expenses = require("../models/Expenses");
const Users = require("../models/Users");
const sequelize = require("../utils/db");
const moment = require("moment");
const Sequelize = require("sequelize");


const addExpense=async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const { category, amount, title, description, date } = req.body;
      const userId = req.user.id;
  
      const formattedDate = moment.utc(date).toDate();
  
      let amt = parseInt(amount);
      const user = await Users.findByPk(userId, { transaction: t });
  
      const expense = await Expenses.create(
        {
          title: title,
          description: description,
          amount: amt,
          category: category,
          userId: userId,
          date: formattedDate,
        },
        { transaction: t }
      );
      await user.increment("totalExpenses", { by: amt, transaction: t });
      await t.commit();
      res.json(expense);
    } catch (error) {
      console.log(error);
      await t.rollback();
      res.status(404).json(error);
    }
  }

const getAllExpenses=async (req, res, next) => {
    try {
      const { date,limit,page } = req.body;
      const userId =req.user.id;
      const skip=(page-1)*limit
  
      const startOfDay = moment.utc(date).startOf("day").toDate();
      const endOfDay = moment.utc(date).add(1,'day').startOf('day').toDate();
      console.log("Daily ",startOfDay," ",endOfDay)
     
      const {count,rows} = await Expenses.findAndCountAll({
        where: {
          userId: userId,
          
          date: {
            [Sequelize.Op.between]: [startOfDay, endOfDay],
          },
        },
        limit:parseInt(limit),
        offset:parseInt(skip)
      });
      const totalExpense=await Expenses.sum('amount',{
        where:{userId:userId,
          date:{
            [Sequelize.Op.between]:[startOfDay, endOfDay]
          }
        }
        
      })
      console.log("count is ",count," expenses ",rows)
      res.status(202).json({expenses:rows,total:count,totalAmount:totalExpense});
    } catch (error) {
      console.log(error)
      res.status(404).json(error);
    }
  }

const getByMonth= async (req, res, next) => {
    try {
      const { month: date,limit,page } = req.body;
      const userId = req.user.id;
      console.log("The date is ", date);
      const startMonth = moment.utc(date).startOf("month").format("YYYY-MM-DD");
      const endMonth = moment.utc(date).add(1, "month").startOf("month").format("YYYY-MM-DD");
      console.log("start-month ", startMonth, "  ", "end-month ", endMonth);
      const skip=(page-1)*limit
      const {rows,count}=await Expenses.findAndCountAll({
          where:{
              userId:userId,
              date:{
                  [Sequelize.Op.between]:[startMonth,endMonth]
              }
          },
          limit:parseInt(limit),
          offset:parseInt(skip),
         order:[Sequelize.literal('DATE(date)')]
      })
  
    
      res.status(202).json({expenses:rows,total:count});
    } catch (error) {
      console.log(error);
      res.status(404).json(error);
    }
  }

const getStats=async(req,res,next)=>{
    try {
      const userId=req.user.id
      const startOfYear=moment.utc().startOf("year").toDate()
      const endOfYear=moment.utc().endOf("year").toDate()
      const expenses=await Expenses.findAll({
        where:{
          userId:userId,
          date:{
  
            [Sequelize.Op.between]:[startOfYear,endOfYear]
          }
        },
        order:[Sequelize.literal('DATE(date)')]
      })
  
      const groupByMonth=expenses.reduce((acc,expense)=>{
      const month=moment(expense.date).format("MMMM")
      if(!acc[month]){
        acc[month]=[]
      }
      acc[month].push(expense)
      return acc
      },{})
     
      const yearlyExpenses=await Expenses.findAll({
        attributes: [
           [Sequelize.fn('DATE_FORMAT', Sequelize.col('date'), '%Y-%m'), 'month'],
            [Sequelize.fn('SUM', Sequelize.col('amount')), 'totalAmount']
        ],
        where: {
            date: {
                [Sequelize.Op.between]: [startOfYear, endOfYear]
            }
        },
        group: [Sequelize.fn('DATE_FORMAT', Sequelize.col('date'), '%Y-%m')],
        order: [Sequelize.fn('DATE_FORMAT', Sequelize.col('date'), '%Y-%m')]
    });
      res.status(202).json({Montlyexpenses:groupByMonth,Yearlyexpenses:yearlyExpenses})
      
    } catch (error) {
      console.log(error)
      res.status(404).json(error)
    }
  }


module.exports={
    addExpense,
    getAllExpenses,
    getByMonth,
    getStats
}