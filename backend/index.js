const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();

const app = express()
app.get('/', (req, res) => {
    return res.status(200).send("Server is up")
})
const port = process.env.PORT || 8200;

app.listen(port, () => {
    console.log(`Server Running on ${port}`)
})