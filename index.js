

const express = require('express');
const mongoose = require("mongoose")
const app = express();
const url='mongodb://localhost/SfqOTP';
const cors = require('cors')


app.use(cors())  //cross-origin resource sharing

app.use(express.json()) // json format use cheyyaaaan

app.use(express.urlencoded({ extended: true }))  

mongoose.connect(url, { useNewUrlParser: true })  //warning oyivakkaan {}
const con = mongoose.connection  // we will hold on connection
con.on('open', function () {
    console.log("connected...")
})

const router= require("./routes/router")
app.use('/',router)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("server is running 0n 4000")
})
