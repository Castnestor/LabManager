const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");

const sequelizeInstance = dbConnect.Sequelize;

class User extends Model { };

User.init(
    {
        id: {
            type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true,
        },
        userName: {
            type: DataTypes.STRING, allowNull: false, require: true, unique: true,
        },
        email: {
            type: DataTypes.STRING, allowNull: false, require: true, unique: true,
        },
        password: {
            type: DataTypes.STRING, allowNull: false, require: true,
        },
        role: {
            type: DataTypes.STRING
        },
    },
    {
        sequelize: sequelizeInstance, modelName: 'users',
        timeStamps: true, freezeTableName: true
    }
)

module.exports = User;