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
// app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/api/users", require("./Routes/UserRoutes"));
app.use("/api/properties", require("./Routes/PropertyRoutes"));
app.use("/api/requests", require("./Routes/RequestRoutes"));
app.use("/api/reviews", require("./Routes/ReviewRoutes"));
app.use("/api/uploads", require("./Routes/ImageRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server started on port " + PORT));
