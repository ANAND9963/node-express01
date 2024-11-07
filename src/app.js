
const PORT = 3000;
const express = require("express");

const fs = require("fs");

const bodyParser = require("body-parser");

const server = express();


server.get("/",(req, res) => {
    res.send("hello hello")
})


server.listen(PORT);

