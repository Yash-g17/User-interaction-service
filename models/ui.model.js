const mongoose = require('mongoose');

var uiSchema = new mongoose.Schema({
    userid: { type: mongoose.SchemaTypes.ObjectId },
    reads: [{ type: mongoose.SchemaTypes.ObjectId }],
    likes: [{ type: mongoose.SchemaTypes.ObjectId }]
})

mongoose.model('user_interaction', uiSchema)