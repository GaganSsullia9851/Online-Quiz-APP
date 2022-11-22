const express = require('express');
//const cors = require("cors");
const app = express();
const bodyparser=require('body-parser');

// var corsOptions = {
//   origin: "http://localhost:9000"
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyparser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Succesfully Connected to the database!");
  })
  .catch(err => {
    console.log("Failed to connect database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json("Welcome to Quiz App");
});

require("./app/routes/route.js")(app);

// set port, listen for requests
const port = 9001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
