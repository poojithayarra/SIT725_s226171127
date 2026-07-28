const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

app.listen(port, () => {
    console.log("App listening on port " + port);
});