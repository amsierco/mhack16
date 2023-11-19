const express = require("express");
const cors = require("cors");
const app = express();
const index = require("./index");
const fs = require("fs");

async function wrapper() {
    app.use(cors());
    app.use(express.json());

    app.get("/:dynamic", (req, res) => {
        const dynamic = req.params;
        console.log(dynamic);
        index.generate(dynamic.dynamic).then(() => index.scrape());
        setTimeout(function () {
            res.json({
                message: JSON.stringify(
                    JSON.parse(fs.readFileSync("out.json"))
                ),
            });
        }, 150000);
    });

    app.listen(8000, () => {
        console.log(`Server is running on port 8000.`);
    });

    // await index.generate("I want to learn to cook").then(() => index.scrape());
    // setTimeout(function () {
    //     app.get("/:dynamic", (req, res) => {
    //         const dynamic = req.params;
    //         console.log(dynamic);
    //         res.json({
    //             message: JSON.stringify(
    //                 JSON.parse(fs.readFileSync("out.json"))
    //             ),
    //         });
    //     });

    //     app.listen(8000, () => {
    //         console.log(`Server is running on port 8000.`);
    //     });
    // }, 60000);
}

wrapper();
