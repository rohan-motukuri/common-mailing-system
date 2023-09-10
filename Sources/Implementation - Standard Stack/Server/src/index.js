const express = require("express");
const app = express();
const cors = require("cors");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const port = process.env.PORT;
const userCheck = require('./routes/userCheck');

app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

//Routes
app.use("/userCheck", userCheck);

app.listen(port, () => {
    console.log('Listening at port : ' + process.env.PORT)
})