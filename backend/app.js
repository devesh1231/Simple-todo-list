const express = require("express");
const app = express();
const cors=require("cors");
app.use(cors());
app.use(express.json({limit: '50mb'}));
const path = require("path");

const todos = require("./router");

app.use("/api/v1", todos);
module.exports = app;
