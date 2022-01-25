require('./models/db')
const uirouter = require('./routes/uiroutes')
const express = require("express");
var bodyParser = require('body-parser');
const cron = require("node-cron")
const app = express();

app.use(bodyParser.json())

cron.schedule("* 0 * * *", function () {
    console.log("service is up and running ");
});

app.use('/ui', uirouter)
app.get('/', (req, res) => {
    res.end("hello darkness my old friend !!!!")
})
const port = 3001;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});

