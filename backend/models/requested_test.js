const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const Sample = require("./sample");
const Test = require("./test");

const sequelizeInstance = dbConnect.Sequelize;

class Requested_test extends Model { };

Requested_test.init(
    {
        id: {
            type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true,
        },
        sample_id: {
            type: DataTypes.INTEGER, allowNull: false, require: true,
            references: {model: Sample, key: 'id'},
        },
        test_id: {
            type: DataTypes.INTEGER, allowNull: false, require: true,
            references: {model: Test, key: 'id'},
        },
        result: {
            type: DataTypes.STRING, allowNull: false,
        },
    },
    {
        sequelize: sequelizeInstance, modelName: "requested_tests",
        timestamps: true,
        freezeTableName: true,
    }
);

module.exports = Requested_test;