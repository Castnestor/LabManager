const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const Client = require("./client");
const User = require("./user");
const Invoice = require("./invoice");

const sequelizeInstance = dbConnect.Sequelize;

class Sample extends Model { };

Sample.init(
    {
        id: {
            type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true,
        },
        date: {
            type: DataTypes.DATE, allowNull: false, require: true,
        },
        description: {
            type: DataTypes.TEXT, allowNull: false, require: true,
        },
        chain_of_custody: {
            type: DataTypes.INTEGER
        },
        invoice_number: {
            type: DataTypes.INTEGER, references: {model: Invoice, key: 'id'}
        },
        client: {
            type: DataTypes.INTEGER, allowNull: false, require: true,
            references: {model: Client, key: 'id'}
        },
        user: {
            type: DataTypes.INTEGER, references: {model: User, key: 'id'}
        }
    },
    {
        sequelize: sequelizeInstance, modelName: "samples",
        timestamps: true,
        freezeTableName: true,
    }
)

module.exports = Sample;