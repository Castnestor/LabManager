"use strict"
const Models = require("../models");

const getInvoices = (res) => {
    Models.Invoice.findAll({})
    .then(function (data) {
        res.send({  result: 200, data: data });
    })
    .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    });
};

const createInvoice = (data, res) => {
    Models.Invoice.create(data)
    .then(function (data) {
        res.send({  result: 200, data: data });
    })
    .catch((err) => {
        console.log(err);
        res.send({  result: 500, error: err.message });
    });
};

const updateInvoice = (req, res) => {
    console.log(req.params);
    Models.Invoice.update(req.body, { where: { id: req.params.id }})
    .then(function (data) {
        res.send({ result: 200, data: data});
    })
    .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    });
};

const deleteInvoice = (req, res) => {
    console.log(req.pramans);
    Models.Invoice.destroy({ where: { id: req.params.id }})
    .then(function (data) {
        res.send({ result: 200, data: data });
    })
    .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    });
};

module.exports = {
    getInvoices,
    createInvoice,
    updateInvoice,
    deleteInvoice,
}