const fetch = require('node-fetch');
const mongoose = require('mongoose')
const ui = mongoose.model('user_interaction')
var ObjectId = require('mongodb').ObjectId;


var uicontroller = {}



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
            // console.log(resuser);
            if (resuser == "") {
                res.send("User does not exist")
            }
            else {
                ui.findByIdAndUpdate(req.body.userid, { $push: { reads: req.body.contentid } }, (err) => {
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
                // if(ui.findById(req.body.userid).exec((err,user)=>{
                //     if(user == "")

                // }))
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