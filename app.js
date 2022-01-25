require("dotenv/config");
require("./db");
const express = require("express");
const app = express();

require("./config")(app);

const allRoutes = require("./routes");
app.use("/", allRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);


const userRoutes = require("./routes/user.routes");
app.use("/", userRoutes);

const dogRoutes = require("./routes/dog.routes");
app.use("/", dogRoutes);

const postRoutes = require("./routes/post.routes");
app.use("/", postRoutes);

require("./error-handling")(app);

module.exports = app;
