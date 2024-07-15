const express = require("express");
const bodyparser = require("body-parser");
const swagger = require('swagger-ui-express');
const app = express();
const port = 5000;
require("./config/db");
require("./config/passport-jwt");
const apiDocs = require("./swagger.json");


app.use(express.json());

app.use('/docs', swagger.serve, swagger.setup(apiDocs))
app.use(bodyparser.json());

app.use("/", require("./routes"))
app.listen(port, (err)=>{
    if(err){
        console.log("error in connecting to the server",err);
    }
    console.log("server is listeing the port", port)
})