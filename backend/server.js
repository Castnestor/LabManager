const express = require("express");
const app = express();

const dotenv = require("dotenv");
const enviroment = process.env.NODE_ENV || "local";

dotenv.config({ path: `./.env.${enviroment}` });

let dbConnect = require("./dbConnect");
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to LabManager API" });
})

let userRoutes = require("./routes/userRoute")
app.use("/api/users", userRoutes);

let sampleRoutes = require("./routes/sampleRoute");
app.use("/api/samples", sampleRoutes);

let clientRoutes = require("./routes/clientRoute");
app.use("/api/clients", clientRoutes);

let testRoutes = require("./routes/testRoute");
app.use("/api/tests", testRoutes);

const PORT = process.env.PORT || 4545;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})