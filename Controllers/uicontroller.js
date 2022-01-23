const mongoose = require('mongoose')
const ui = mongoose.model('User-Interaction')
var uicontroller = {}

uicontroller.read = (req, res) => {
    let user;
    body = `{
        "id": "${req.body.id}"
    }`
    ui.find({ _id: req.body.id }).exec((err, thisuser) => {
        user = thisuser;
    })
    if (user == NULL) {
        res.send("user does not exist")
    }
    ui.findOneAndUpdate({ userid: req.body.userid }, { $push: { reads: req.body.contentid } }, (err) => {
        if (err) res.send("there was an error")
    });
    fetch("https://localhost:3000/content/listid", {
        body: JSON.parse(body)
    }).then((res1) => {
        body2 = `{
            "id": ${res1.body.id},
            "title" :${res1.body.title},
            "story" :${res1.body.story},
            "date_published":${res1.body.date_published} ,
            "user_id":${res1.body.user_id},
            "reads":${res1.body.reads + 1},
            "likes": ${res1.body.likes}  
        }`
        fetch("https://localhost:3000/content/update", {
            body: JSON.parse(body2)
        }).then(res.send("Added read"))
    })

}

uicontroller.like = (req, res) => {
    body = `{
        "id": "${req.body.id}"
    }`
    ui.find({ _id: req.body.id }).exec((err, thisuser) => {
        user = thisuser;
    })
    if (user == NULL) {
        res.send("user does not exist")
    }
    ui.findOneAndUpdate({ userid: req.body.userid }, { $push: { likes: req.body.contentid } }, (err) => {
        if (err) res.send("there was an error")
    });
    fetch("https://localhost:3000/content/listid", {
        body: JSON.parse(body)
    }).then((res1) => {
        body2 = `{
            "id": ${res1.body.id},
            "title" :${res1.body.title},
            "story" :${res1.body.story},
            "date_published":${res1.body.date_published} ,
            "user_id":${res1.body.user_id},
            "reads":${res1.body.reads},
            "likes": ${res1.body.likes + 1}  
        }`
        fetch("https://localhost:3000/content/update", {
            body: JSON.parse(body2)
        }).then(res.send("Added like"))
    })

}
module.exports = uicontroller;