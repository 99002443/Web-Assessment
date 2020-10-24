const app = require("express")();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Client.html");
})

app.listen(2222, () => {
    console.log("Client App running at 2222");
})