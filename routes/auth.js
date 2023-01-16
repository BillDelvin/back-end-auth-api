const express = require("express");
const routes = express();
const { validateAuth, login, register } = require("../controller/auth");

// mendefinisikan nama-nama API
routes.post("/user-register", [validateAuth, register]);
routes.post("/user-login", [validateAuth, login]);

module.exports = routes;
