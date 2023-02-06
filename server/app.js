require("dotenv").config();
const express = require("express");
const app = express();
require("./db/connection");
const cors = require("cors");
const router = require("./Routes/router");
const PORT = 6010 
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());
app.use(router);


app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`);    
});

module.exports = app ;
