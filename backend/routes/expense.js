const express = require("express");
const Expenses = require("../models/Expenses");
const authenticate = require("../middleware/auth");
const Users = require("../models/Users");
const sequelize = require("../utils/db");
const moment = require("moment");
const Sequelize = require("sequelize");
const { addExpense, getAllExpenses, getByMonth, getStats } = require("../controllers/expenses");

const router = express.Router();

router.post("/add", authenticate,addExpense);

router.post("/all", authenticate,getAllExpenses );

router.post("/delete/:id", authenticate, async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { id: expenseId } = req.params;
    const userId = req.user.id;

    const expense = await Expenses.findOne(
      { where: { userId: userId, id: expenseId } },
      { transaction: t }
    );
    if (expense) {
      const amt = expense.amount;
      const user = await Users.findByPk(userId, { transaction: t });
      await user.decrement("totalExpenses", { by: amt, transaction: t });
      await expense.destroy({ transaction: t });
      t.commit();
      return res.status(202).json("expense deleted");
    }
    t.rollback();

    res.status(201).json("expense not found");
  } catch (error) {
    t.rollback();
    res.status(404).json(error);
  }
});

router.post("/getbyMonth", authenticate,getByMonth);

router.get("/getStat",authenticate,getStats)

module.exports = router;
