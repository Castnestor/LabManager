const {  DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");

const sequelizeInstance = dbConnect.Sequelize;

class Invoice extends Model { };

Invoice.init(
    {
        id: {
            type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true,
        },
        invoice_number: {
            type: DataTypes.INTEGER, unique: true,
        },
        work_order: {
            type: DataTypes.STRING, allowNull: false, require: true, unique: true,
        },
        
    },
    {
        sequelize: sequelizeInstance, modelName: "invoices",
        timestamps: true,
        freezeTableName: true,
    }
);


module.exports = Invoice;