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

const findSamples = (req, res) => {
    Models.Sample.findAll({ where: { invoice_id: req.params.id }})
    .then(function (data) {
        res.send({ result: 200, data: data });
    })
    .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    });
}


const createSample = async (data, res) => {
    try {
        const createdSample = await Models.Sample.create(data);
    
        //creates multiple test entrys for each sample nad waits for the result
        const testPromises = data.testList.map((testData) => {
          return Models.Requested_test.create({ ...testData, sample_id: createdSample.id });
        });
    
        const createdTests = await Promise.all(testPromises);
    
        res.send({
          result: 200,
          data: data
        });
      } catch (err) {
        console.error(err);
        res.send({ result: 500, error: err.message || 'Internal Server Error' });
      }
};


//creates multiple samples and awaits for result
const createBulkSample = async (dataArray, res) => {

    const latestInvoice = await Models.Invoice.findOne({
        order: [['id', 'DESC']],  // Order the results by id in descending order
        attributes: ['work_order'],  // Only select the 'work_order' field
    });
    console.log(latestInvoice);

    let sequentialNumber = 1;
        if (latestInvoice) {
            sequentialNumber = parseInt(latestInvoice.work_order.split('/')[0]) + 1;
        }

        const currentYear = new Date().getFullYear();
        const newWorkOrder = `${sequentialNumber}/${currentYear}`;

        const newInvoiceEntry = await Models.Invoice.create({work_order: newWorkOrder})
        console.log(newInvoiceEntry);

        //not really working yet
        dataArray.forEach((data) => {
            data.invoice_id = newInvoiceEntry.id;
        });

    const samplePromises = dataArray.map((data) => {
        return new Promise((resolve, reject) => {
            createSample(data, { send: resolve, status: (code) => reject({ statusCode: code })})
        })
    });

    Promise.all(samplePromises)
    .then((results) => {
        res.send({ result: 200, message: 'Bulk samples created successfully'})
    })
    .catch((err) => {
        console.log(err);
        res.send({  result: 500, error: err.message });
    })
}

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
    // createSample,
    findSamples,
    updateSample,
    deleteSample,
    createBulkSample
}