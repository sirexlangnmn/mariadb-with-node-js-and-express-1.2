// This loads the settings from your `.env` file.
require("dotenv").config();
const express = require("express");
const db = require("./db/database");
const app = express();
const PORT = 3333;

////////////
// Routes //
////////////

// The home page lists some available URLs.
app.get("/", (req, res) => {
    res.json({
        urls: {
            get_all: `localhost:${PORT}/api`,
            get_1: `localhost:${PORT}/api/1`,
            get_a_different_one: `localhost:${PORT}/api/2`,
            search_1: `localhost:${PORT}/api/search/beh`,
            search_2: `localhost:${PORT}/api/search/r`,
        },
    });
});

// list all monsters
app.get("/api", (req, res) => {
    db.getAllMonsters()
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err));
});

// get a monster by ID (1, 2, or 3)
app.get("/api/:id", (req, res) => {
    const id = req.params.id;

    db.getMonsterById(id)
        .then(data => {
            if (data.length > 0) {
                console.log("data", data);
                res.json(data);
            } else {
                res.status(404).json({ message: "Not Found" });
            }
        })
        .catch(err => res.status(500).json(error));
});

// Search the database by monster name
app.get("/api/search/:keyword", (req, res) => {
    const keyword = req.params.keyword;
    db.searchMonsterByName(keyword)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err));
});

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));