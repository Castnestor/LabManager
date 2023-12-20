"use strict"

//Require all models
const Client = require("./client");
const User = require("./user");
const Invoice = require("./invoice");
const Test = require("./test");
const Sample = require("./sample");
const Requested_test = require("./requested_test");
const Test_report = require("./test_report");


//Synchronizing all models
async function init() {
    await Client.sync();
    await User.sync();
    await Invoice.sync();
    await Test.sync();
    await Sample.sync();
    await Requested_test.sync();
    await Test_report.sync();
}


//Call the Asynchronous function
init();

//exports all models
module.exports = {
    Client,
    User,
    Invoice,
    Test,
    Sample,
    Requested_test,
    Test_report,
};