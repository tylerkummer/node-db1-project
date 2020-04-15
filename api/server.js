const express = require("express");

const db = require("../data/dbConfig.js");

const AccountRouter = require("../accounts/accountsRouter");

const server = express();

server.use(express.json());

server.use("/api/accounts", AccountRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
