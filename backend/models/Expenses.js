const sequelize=require("../utils/db")
const Sequelize=require("sequelize")


const Expenses=sequelize.define("Expenses",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING
    },
    amount:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    category:Sequelize.STRING
},
{
    timestamps:false
}
)

module.exports=Expenses