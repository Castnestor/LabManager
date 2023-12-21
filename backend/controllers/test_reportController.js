"use strict"
const Models = require("../models");

const getTest_reports = (res) => {
    Models.Test_report.findAll({})
    .then(function (data) {
        res.send({  result: 200, data: data });
    })
    .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    });
};

const createTest_report = (data, res) => {
    Models.Test_report.create(data)
    .then(function (data) {
        res.send({  result: 200, data: data });
    })
    .catch((err) => {
        console.log(err);
        res.send({  result: 500, error: err.message });
    });
};

const updateTest_report = (req, res) => {
    console.log(req.params);
    Models.Test_report.update(req.body, { where: { id: req.params.id }})
    .then(function (data) {
        res.send({ result: 200, data: data});
    })
    .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    });
};

const deleteTest_report = (req, res) => {
    console.log(req.pramans);
    Models.Test_report.destroy({ where: { id: req.params.id }})
    .then(function (data) {
        res.send({ result: 200, data: data });
    })
    .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    });
};

module.exports = {
    getTest_reports,
    createTest_report,
    updateTest_report,
    deleteTest_report,
}