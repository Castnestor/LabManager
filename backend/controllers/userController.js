"use strict"
const { createToken } = require("../middleware/authentication");
const Models = require("../models");
const bcrypt = require("bcryptjs");

const getUsers = (res) => {
    Models.User.findAll({})
    .then(function (data) {
        res.send({ result: 200, data: data});
    })
    .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    })
}

//this function is only for testing purposes
const createUser = async (data, res) => {

    console.log(data);
    const { userName, email, password, role } = data;

    if(!(userName && email && password && role)) {
        res.status(400).json({ result: "You need to provide userName, email, password and role" });
        return; //stoping the function and sending the error to client
    }
    
    let hashPassword = await bcrypt.hash(password, 10);
    console.log("hash " + hashPassword)

    await Models.User.create({
        userName,
        email: email.toLowerCase(),
        password: hashPassword,
        role,
    })
    .then(function (data) {
        res.send({ result: 200, data: data });
    })
    .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    })
};

const registerUser = async (req, res) => {
    try{
        const { userName, email, password, role } = req.body;

        //Checking if the user is giving all required information.
        if(!(userName && email && password && role)) {
            res.status(400).json({ result: "You need to provide userName, email, password and role" });
            return; //stoping the function and sending the error to client
        }

        //retriving information from input
        const existingUserEmail = await Models.User.findOne({ where: { email }});
        const existingUserName = await Models.User.findOne({ where: { userName } });

        //Checking is the userName already exist
        if (existingUserName) {
            res.status(409).json({ result: "User name already exist. Please Login" });
            return;
        }

        //Checking if the email is already in use
        if (existingUserEmail) {
            res.status(409).json({ result: "This email is already in use, please recover password" });
            return;
        }

        //If all is correct, continue with registration
        //1.- Encrypt user password
        let hashPassword = await bcrypt.hash(password, 10);

        //creating user in database with hash and sanitize information
        const userMetaData = await Models.User.create({
            userName,
            email: email.toLowerCase(),
            password: hashPassword,
            role: role
        });

        const user = userMetaData.get({ plain: true })

        //create token
        const token = createToken(user.id, email, role);
        user.token = token;

        res.status(201).json({ result: "User has been successfully registered", data: user })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ result: err.message });
    }
 };

 const loginUser = async (req, res) => {
    try {
        //Get user input from request
        const { userName, password } = req.body;
    
        if (!(userName && password)) {
            res.status(400).json({ result: "User and password required" });
        }
    
        //Check for userName existence in database
        const user = await Models.User.findOne({ raw: true, where: { userName: userName }});

        //check if password matches with user
        if(user && (await bcrypt.compare(password, user.password))) {
            //create a token for this account
            const token = createToken(user.id, email, user.role);
            //save their token
            user.token = token;

            console.log(user);

            //send back logged in user details and token
            res.status(200).send({ result: "User successfully logged in", data: user });
        }
    } 
    catch (err) {
        console.log(err);
        res.status(500).json({ result: err.message });
    }
 };

const updateUser = (req, res) => {
    Models.User.update(req.body, { where: { id: req.params.id }})
    .then (function (data) {
        res.send({ result:200, data: data });
    })
    .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    })
};

const deleteUser = (req, res) => {
    console.log(req.params);
    Models.User.destroy({ where: { id: req.params.id }})
    .then(function (data) {
        res.send({ result: 200, data: data});
    })
    .catch((err) => {
        console.log(err);
        res.send({ result: 500, error: err.message });
    });
};

module.exports = {
    createUser,
    registerUser,
    getUsers,
    updateUser,
    deleteUser,
    loginUser
}