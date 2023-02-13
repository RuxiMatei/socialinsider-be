const express = require("express");
const cors = require("cors");
const { getPosts } = require("./controller.js");
require('dotenv').config({path: __dirname + '/.env'});

const app = express();

const corsOptions = {
    origin:'http://localhost:4200', 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));  

// app.get("/", function (req, res) {
//     res.status(200).send("Works");
// });

app.use('/', require('./routes.js'));

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});