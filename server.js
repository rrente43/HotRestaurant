var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// waiting list

var reservation = [
    {
        routeName: "bob",
        name: "bob",
        phoneNumber: "1800-934-7564",
        email: "bob100@gmail.com",
        uniqueID: 2000
    },
    {
        routeName: "rubi",
        name: "rubi",
        phoneNumber: "1800-934-7564",
        email: "rubi100@gmail.com",
        uniqueID: 200
    },
    {
        routeName: "will",
        name: "will",
        phoneNumber: "1800-934-7564",
        email: "gdg100@gmail.com",
        uniqueID: 2
    },
];

var waitinglist = [];

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays all characters
app.get("/api/waitinglist", function (req, res) {
    return res.json(waitinglist);
});

app.get("/api/reservation", function (req, res) {
    return res.json(reservation);
});
// Displays a single character, or returns false
app.get("/api/waitinglist/:name", function (req, res) {
    var chosen = req.params.waitinglist;

    console.log(chosen);

    for (var i = 0; i < waitinglist.length; i++) {
        if (chosen === waitinglist[i].routeName) {
            return res.json(waitinglist[i]);
        }
    }

    return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/reservation", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newGuest = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newGuest.routeName = newGuest.name.replace(/\s+/g, "").toLowerCase();

    console.log(newGuest);

    if (reservation.length < 5) {
        reservation.push(newGuest);
    }
    else {
        waitinglist.push(newGuest);
    }
    res.json(newGuest);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});