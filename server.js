var express = require("express");
var path = require("path");

var app = express();
var PORT = 3000;
// app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// waiting list (sample data with 3 entries)

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

// create an array for overflow reservations called waitinglist
var waitinglist = [];


// setup the routing for the website, to respond with html pages for end user pages, and return api calls for backend stuff.

//Public home page route
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Public reservations page
app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

// Public page showing all current reservations, including making everyones email and phone numbers public.. OOPS!
app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

//API's!!!!!!

// API call .. this returns the array with all waitlist customers (array named "waitinglist")
app.get("/api/waitinglist", function (req, res) {
    return res.json(waitinglist);
});

// API call to ask for all active reservations (5 reserved tables), does not include waitlist array
app.get("/api/reservation", function (req, res) {
    return res.json(reservation);
});



// Create New Reservations - this call takes in JSON input and adds it to  reservations array,
//  or if it is full (has array length >= 5) then adds to waitlist array
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