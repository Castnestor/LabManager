const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../dbConnect");
const Sample = require("./sample");

const sequelizeInstance = dbConnect.Sequelize;

class Test_report extends Model {  };


Test_report.init(
    {
        id: {
            type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true,
        },
        report_number: {
            type: DataTypes.INTEGER, allowNull: false, require: true, unique: true,
        },
        date: {
            type: DataTypes.DATE
        },
        sample_id: {
            type: DataTypes.INTEGER, allowNull: false, require: true,
            references: {model: Sample, key: 'id'}
        }
    },
    {
        sequelize: sequelizeInstance, modelName: "test_reports",
        timestamps: true,
        freezeTableName: true,
    }
)

module.exports = Test_report;