const fetch = require('node-fetch');
const mongoose = require('mongoose')
const ui = mongoose.model('User-Interaction')
var ObjectId = require('mongodb').ObjectId;


var uicontroller = {}

uicontroller.read = (req, res) => {
    console.log(req.body.userid)
    let body1 = `{"id": "${req.body.userid}"}`;
    fetch("http://localhost:3002/user/finduser", {
        method: 'POST',
        body: JSON.parse(body1)
    }).then((resuser) => {
        console.log(resuser);
        if (resuser == "") {
            console.log(res.user);
            res.send("User does not exist")
        }
        else {
            ui.findByIdAndUpdate(req.body.userid, { $push: { reads: req.body.contentid } }, (err) => {
                if (err) res.send("there was an error")
            });
            fetch("http://content-service_content-service-cont_1:3000/content/listid", {
                method: 'POST',
                body: JSON.parse(`{"id": "${req.body.contentid}"}`)
            }).then((res1) => {
                body2 = `{
            "reads":${res1.body.reads + 1}, 
            }`
                fetch("https://content-service_content-service-cont_1:3000/content/update", {
                    method: 'POST',
                    body: JSON.parse(body2)
                }).then(res.send("Added read"))
            })

        }

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
            "likes": ${res1.body.likes + 1}  
        }`
        fetch("https://localhost:3000/content/update", {
            body: JSON.parse(body2)
        }).then(res.send("Added like"))
    })

}
module.exports = uicontroller;