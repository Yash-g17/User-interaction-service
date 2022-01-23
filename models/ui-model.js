const mongoose = require('mongoose');

var uiSchema = new mongoose.Schema({
    id: { type: String },
    reads: [{ type: mongoose.SchemaTypes.ObjectId }],
    likes: [{ type: mongoose.SchemaTypes.ObjectId }]
})

mongoose.model('User-Interaction', uiSchema)