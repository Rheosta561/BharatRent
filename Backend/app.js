const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const rentRoutes = require("./routes/rentRoutes")

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());


app.use( authRoutes);
app.use( rentRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
