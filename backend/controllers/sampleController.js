"use strict"
const Models = require("../models");

const getSamples = (res) => {
    Models.Sample.findAll({})
    .then(function (data) {
        res.send({  result: 200, data: data });
    })
    .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    });
};

const createSample = (data, res) => {
    Models.Sample.create(data)
    .then(function (data) {
        res.send({  result: 200, data: data });
    })
    .catch((err) => {
        console.log(err);
        res.send({  result: 500, error: err.message });
    });
};

const updateSample = (req, res) => {
    console.log(req.params);
    Models.Sample.update(req.body, { where: { id: req.params.id }})
    .then(function (data) {
        res.send({ result: 200, data: data});
    })
    .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    });
};

const deleteSample = (req, res) => {
    console.log(req.pramans);
    Models.Sample.destroy({ where: { id: req.params.id }})
    .then(function (data) {
        res.send({ result: 200, data: data });
    })
    .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    });
};

module.exports = {
    getSamples,
    createSample,
    updateSample,
    deleteSample,
}