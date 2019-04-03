const express = require("express");
const bodyParser = require("body-parser");

module.exports = (kvfs) => {
    let app = express();

    app.use(bodyParser.json());

    app.put("/:id", (req, res) => {
        if(!req.body || typeof req.body !== "object") {
            return res.status(400).send({ error: "Invalid request! I need a body..." });
        }
        kvfs.set(req.params.id, req.body, (error) => {
            if(error) {
                console.error("Failed to set data", req.params.id, req.body, error);
                return res.status(500).send({ error: "Failed to save data" });
            }
            res.send({});
        });
    });

    app.get("/:id", (req, res) => {
        kvfs.get(req.params.id, (error, value) => {
            if(error && error.code == "ENOENT") {
                return res.status(404).send({});
            }
            if(error) {
                console.error("Failed to get data", req.params.id, error);
                return res.status(500).send({ error: "Failed to get data" });
            }
            res.send(value);
        });
    });

    return app;
};