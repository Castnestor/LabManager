const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");

const sequelizeInstance = dbConnect.Sequelize;

class Client extends Model { };

Client.init(
    {
        id: {
            type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true,
        },
        name: { 
            type: DataTypes.STRING, allowNull: false, require: true, unique: true,
        },
        email: {
            type: DataTypes.STRING, allowNull: false, require: false, unique: true,
        },
        address: {
            type: DataTypes.TEXT
        }
    },
    {
        sequelize: sequelizeInstance, modelName: "clients",
        timestamps: true,
        freezeTableName: true,
    }
)

module.exports = Client;