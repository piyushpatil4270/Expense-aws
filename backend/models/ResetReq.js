const Sequelize=require("sequelize")
const sequelize=require("../utils/db")


const Request=sequelize.define("Reset_req",{
    id:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    isActive:{
        type:Sequelize.BOOLEAN,
        allowNull:false
    }
});


module.exports=Request