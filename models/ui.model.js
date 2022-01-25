const mongoose = require('mongoose');

var uiSchema = new mongoose.Schema({
    reads: [{ type: mongoose.SchemaTypes.ObjectId }],
    likes: [{ type: mongoose.SchemaTypes.ObjectId }]
})

mongoose.model('user_interaction', uiSchema)