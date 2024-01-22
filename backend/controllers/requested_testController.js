"use strict"
const Models = require("../models");

const getRequested_tests = (res) => {
    Models.Requested_test.findAll({})
    .then(function (data) {
        res.send({  result: 200, data: data });
    })
    .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    });
};

const getTestSample = (req, res) => {
    Models.Requested_test.findAll({ where: { sample_id: req.params.id }})
    .then(function (data) {
        res.send({  result: 200, data: data });
    })
    .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    });
};


const createRequested_test = (data, res) => {
    Models.Requested_test.create(data)
    .then(function (data) {
        res.send({  result: 200, data: data });
    })
    .catch((err) => {
        console.log(err);
        res.send({  result: 500, error: err.message });
    });
};

const updateRequested_test = (req, res) => {
    console.log(req.params);
    Models.Requested_test.update(req.body, { where: { id: req.params.id }})
    .then(function (data) {
        res.send({ result: 200, data: data});
    })
    .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    });
};

const deleteRequested_test = (req, res) => {
    console.log(req.pramans);
    Models.Requested_test.destroy({ where: { id: req.params.id }})
    .then(function (data) {
        res.send({ result: 200, data: data });
    })
    .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    });
};

module.exports = {
    getRequested_tests,
    createRequested_test,
    updateRequested_test,
    deleteRequested_test,
    getTestSample
}