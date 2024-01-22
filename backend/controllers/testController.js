"use strict"
const Models = require("../models");

const getTests = (res) => {
    Models.Test.findAll({})
    .then(function (data) {
        res.send({  result: 200, data: data });
    })
    .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    });
};

const createTest = (data, res) => {
    Models.Test.create(data)
    .then(function (data) {
        res.send({  result: 200, data: data });
    })
    .catch((err) => {
        console.log(err);
        res.send({  result: 500, error: err.message });
    });
};

const createTestBulk = (data, res) => {
    Models.Test.bulkCreate(data)
    .then(function (data) {
        res.send({ result: 200, data: data });
    })
    .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    });
};

const updateTest = (req, res) => {
    console.log(req.params);
    Models.Test.update(req.body, { where: { id: req.params.id }})
    .then(function (data) {
        res.send({ result: 200, data: data});
    })
    .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    });
};

const deleteTest = (req, res) => {
    console.log(req.pramans);
    Models.Test.destroy({ where: { id: req.params.id }})
    .then(function (data) {
        res.send({ result: 200, data: data });
    })
    .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    });
};

module.exports = {
    getTests,
    createTest,
    createTestBulk,
    updateTest,
    deleteTest,
}