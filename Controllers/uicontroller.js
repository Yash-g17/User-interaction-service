const fetch = require('node-fetch');
const mongoose = require('mongoose')
const ui = mongoose.model('user_interaction')
var ObjectId = require('mongodb').ObjectId;


var uicontroller = {}

const createuiuser = (id) => {
    let uiuser = new ui();
    uiuser.userid = ObjectId(id)
    uiuser.reads = [];
    uiuser.writes = [];
    uiuser.save((err, doc) => {
        if (!err) console.log("user created in uidb");
        else console.log(err);
    })
}
const checkuiuser = (id) => {
    let uiuser;
    console.log(`id = ${id}`);
    ui.find({ userid: ObjectId(id) }).exec((err, content) => {
        if (err) {
            console.log(err);
            res.send('there was an error');
        } else {
            uiuser = content;
        }
        console.log(`user = ${uiuser}`);
        if (!uiuser.length) {
            createuiuser(id)
            return uiuser;
        }
        else {
            console.log(uiuser);
            return uiuser;
        }
    })
}



uicontroller.read = (req, res) => {

    var raw1 = JSON.stringify({
        "id": `${req.body.userid}`
    });
    var requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: raw1,
        redirect: 'follow'
    };
    fetch("http://user:3002/user/find", requestOptions)
        .then(response => response.json())
        .then((resuser) => {
            if (resuser == "") {
                res.send("User does not exist in userdb")
            }
            else {
                uiuser = checkuiuser(req.body.userid)
                console.log(uiuser);
                var raw2 = JSON.stringify({
                    "id": `${req.body.contentid}`
                });

                var requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: raw2,
                    redirect: 'follow'
                };
                fetch("http://content:3000/content/listid", requestOptions)
                    .then(response1 => response1.json()).then(res1 => {
                        console.log(res1[0].reads);
                        var raw3 = JSON.stringify({
                            "id": `${req.body.contentid}`,
                            "reads": `${res1[0].reads + 1}`,
                        });
                        var requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: raw3,
                            redirect: 'follow'
                        };
                        // console.log(uiuser);
                        ui.findByIdAndUpdate(req.body.userid, { $push: { reads: req.body.contentid } }, (err) => {
                            if (err) res.send("there was an error")
                        });
                        fetch("http://content:3000/content/update", requestOptions).then(res.send("Added read")).catch((err) => console.log(err))
                    })

            }

        })
}

uicontroller.like = (req, res) => {

    var raw1 = JSON.stringify({
        "id": `${req.body.userid}`
    });
    var requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: raw1,
        redirect: 'follow'
    };
    fetch("http://user:3002/user/find", requestOptions)
        .then(response => response.json())
        .then((resuser) => {
            // console.log(resuser);
            if (resuser == "") {
                res.send("User does not exist")
            }
            else {
                uiuser = checkuiuser(req.body.id)
                ui.findByIdAndUpdate(req.body.userid, { $push: { likes: req.body.contentid } }, (err) => {
                    if (err) res.send("there was an error")
                });
                var raw2 = JSON.stringify({
                    "id": `${req.body.contentid}`
                });

                var requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: raw2,
                    redirect: 'follow'
                };
                fetch("http://content:3000/content/listid", requestOptions)
                    .then(response1 => response1.json()).then(res1 => {
                        console.log(res1[0].likes);
                        var raw3 = JSON.stringify({
                            "id": `${req.body.contentid}`,
                            "likes": `${res1[0].likes + 1}`,
                        });
                        var requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: raw3,
                            redirect: 'follow'
                        };
                        fetch("http://content:3000/content/update", requestOptions).then(res.send("Added like")).catch((err) => console.log(err))
                    })

            }

        })
}



uicontroller.list = (req, res) => {
    fetch('http://user:3002/user/listUsers').then(resp => resp.json()).then(data => {
        res.send(data)
    })
}
module.exports = uicontroller;