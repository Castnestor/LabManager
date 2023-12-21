require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    //Grabing the token from either the body, query or headers
    const token = req.body.token || req.query.token || req.header["x-access-token"];

    if (!token) {
        //return an error message ans stops the function
        return res.status(403).send("A token is required for authentication");
    }

    try {
        //Decode token
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        //Store user data into request for controller
        req.user = decoded;

        console.log(decoded);
    }
    catch {
        return res. status(401).send("Invalid token");
    }

    return next();
}

const requireAdmin = (req, res, next) => {
    if (req.user.role === "admin") {
        return next();
    } else {
        return res.status(403).send("You are not authorize");
    }
}

const createToken = (userId, userEmail, role) => {
    const token = jwt.sign(
        { user_id: userId, userEmail, role },
        process.env.JWT_KEY,
        { expiresIn: "12h" }
    );
    return token;
}

module.exports = { createToken, verifyToken, requireAdmin };