const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express();
app.use(express.json())

const dbURI = process.env.DB_URL

mongoose
  .connect(dbURI)
  .then((result) =>
    app.listen(3000, (req, res) => {
      console.log("Connected to DB listening on port 3000");
    })
  )
  .catch((error) => console.log(error));