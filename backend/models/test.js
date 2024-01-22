const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");

const sequelizeInstance = dbConnect.Sequelize;

class Test extends Model { };

Test.init(
    {
        id: {
            type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true,
        },
        name: {
            type: DataTypes.STRING, allowNull: false, require: true, unique: true,
        },
        standard: {
            type: DataTypes.STRING, allowNull: false, require: true,
        },
        category: {
            type: DataTypes.STRING, allowNull: false, require: true,
        }
    },
    {
        sequelize: sequelizeInstance, modelName: "tests",
        timestamps: true,
        freezeTableName: true, 
    }
);

module.exports = Test;