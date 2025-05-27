// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes=require("./routes/authRoutes");
const dbConnect = require('./config/dbConnect');
const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

const port=process.env.PORT||4000;

app.use("/api/auth",authRoutes);


dbConnect()

app.listen(port, () => console.log(`THE server is running on${port
}`));
