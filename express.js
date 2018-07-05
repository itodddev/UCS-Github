const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    next();
});

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
//var parser = require('xml2json');
var parser = require("xml-js");
// var json2xml = require('node-json2xml');
const axios = require('axios');
var fs = require('fs');

// Post xml string to usc4 server
var url = "http://ucs4.us/ucs/engine/ucs-engine.cgi";
xhr.open("POST", url, false);
xhr.setRequestHeader("Content-Type", "text/xml");


app.get('/', (req, res, next) => {
    console.log(xml);
});

app.get('/image', (req, res) => {
    var options = {
        root: __dirname + '/',
    };
    var path = __dirname + '/' + 'new.jpg';
    res.header("Content-Disposition", "attachment; filename=photo.jpg");
    res.download(path);
});

app.post('/xml', (req, res, next) => {
    res.end(JSON.stringify(req.body));

    console.log(res);
    console.log(req);

    // var conv1 = parser.toJson(req.body.data);
    var options = {
        compact: true,
        ignoreComment: true,
        spaces: 4
    };

    var conv1 = parser.xml2json(req.body.data, options);

    console.log('\n\nData recieved from website (JSON): ' + conv1);
    // var conv2 = parser.toXml(conv1);
    var conv2 = parser.json2xml(conv1, options);

    console.log('\n\nData converted to XML in Node (XML): ' + conv2);



    var filename;
    const getResponseBack = (url, xml) => {
        return axios.post(url, xml, {
            headers: {
                'Content-Type': 'text/xml'
            }
        }).then((response) => {
            filename = response.request;
            return filename.res.responseUrl;
        });
    };
    const getImageBack = (conv) => {
        return axios.get(conv, {
                responseType: 'stream'
            })
            .then(function (response) {
                response.data.pipe(fs.createWriteStream('new.jpg'));
            }).catch(err => {
                console.log(err)
            });
    }

    const convertCurrencyAlt = async (url, xmlData) => {
        const imageURL = await getResponseBack(url, xmlData);

        return imageURL;
    };

    convertCurrencyAlt(url, conv2).then((status) => {
        return status
    }).then((stat) => {
        getImageBack(stat);
    });

});

app.listen(3000, () => console.log('UCS Config listening on port 3000'));