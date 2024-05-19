//dependencies
require("dotenv").config();
const conn = require("./config/dbConnection.cjs");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
conn();
const app = express();
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//routes
app.use("/auth", require("./routes/auth/user.route.cjs"));
//app
const PORT = process.env.PORT;
const HOST = process.env.HOST;
mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
});
