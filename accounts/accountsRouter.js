const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

// GET Accounts
router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then((accounts) => {
      res.status(200).json({ data: accounts });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// GET accounts by id
router.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .first()
    .then((account) => {
      res.status(200).json({ data: account });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// POST accounts
router.post("/", (req, res) => {
  const accountData = req.body;
  db("accounts")
    .insert(accountData, "id")
    .then((ids) => {
      const id = ids[0];
      db("accounts")
        .where({ id })
        .first()
        .then((account) => {
          res.status(201).json({ data: account });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// PATCH account
router.patch("/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db("accounts")
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "update successful" });
      } else {
        res.status(404).json({ message: "no posts by that id found" });
      }
    });
});

// DELETE account
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("accounts").where({ id }).del();
});

module.exports = router;
