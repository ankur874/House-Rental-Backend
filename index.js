const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const app = express();

(async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected..... 🚀");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();

app.use(express.json({ extended: false }));
app.use("/api/users", require("./Routes/UserRoutes"));
app.use("/api/property", require("./Routes/PropertyRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server started on port " + PORT));
