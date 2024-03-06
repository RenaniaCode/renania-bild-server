const express = require("express");
const AuthController = require("../controllers/auth");

const api = express.Router();

api.get("/auth/register",(req, res)=>{
    res.render("auth/signup");
});
api.post("/auth/register",AuthController.register);
api.post("/auth/login", AuthController.login);
api.post("/auth/refreshAT", AuthController.refreshAccessToken);

module.exports = api;
