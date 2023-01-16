require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { createServer } = require("http");
const cors = require("cors");
const api = require("./routes");

const app = express();
const port = process.env.PORT;
const server = createServer(app);

app.use(cors());
app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));
app.use(api);

server.listen(port, () => console.log(`Server running in http://localhost:${port}`));
