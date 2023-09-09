const express = require("express");
const app = express();
const cors = require("cors");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const port = process.env.PORT;

app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

const userRoute = require('./routes/UserCheck');
app.use("/", userRoute);


app.listen(port, () => {
    console.log('Listening at port : ' + process.env.PORT)
})