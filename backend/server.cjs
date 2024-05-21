//dependencies
require("dotenv").config();
const verify = require("./middleware/verifyUser.cjs");
const conn = require("./config/dbConnection.cjs");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
conn();
const app = express();
//middleware
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    method: ["GET", "PUT", "POST", "DELETE"],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
//routes
app.use("/auth", require("./routes/auth/user.route.cjs"));
app.use(require("./routes/auth/refreshToken.cjs"));
app.use(require("./routes/auth/logout.route.cjs"));
app.use(require("./routes/profile/profile.route.controller.cjs"));
app.use("/profile", require("./routes/profile/update.profile.route.cjs"));
//app
const PORT = process.env.PORT;
const HOST = process.env.HOST;
mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
});
