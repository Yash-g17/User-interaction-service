var express = require('express');
var router = express.Router();
var ui = require('../Controllers/uicontroller.js')

router.post('/like', (req, res) => {
    ui.like(req, res);
})

router.post('/read', (req, res) => {
    ui.read(req, res);
})

router.get('/list', (req, res) => {
    ui.list(req, res);
})
module.exports = router