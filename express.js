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
var parser = require('xml2json');
const axios = require('axios');
var fs = require('fs');

let xmlInfo = `<?xml version="1.0" encoding="UTF-8"?>
<layout mode="MANUAL" src="UCS" seq="" res="LOW">
    <chassis model="UCS5109" cfg="1" qty="1">
        <power qty="4" />
    </chassis>
    <rack cfg="1" qty="1">
        <device model="SPACE2" qty="1" />
        <device model="PANDUIT2" qty="1" />
        <device model="PANDUCT2" qty="1" />
        <device model="PANTRAY1" qty="1" />
    </rack>
    <params ru="60" extra="0" face="PERSPECTIVE" bezel="NO" fill="LINEAR" load="HIGH" panels="YES" logo="CISCO" format="PHOTO" size="LARGE" trans="NO" />
</layout>`;

// Post xml string to usc4 server
var url = "http://ucs4.us/ucs/engine/ucs-engine.cgi";
xhr.open("POST", url, false);
xhr.setRequestHeader("Content-Type", "text/xml");

// test xml to json
var json = parser.toJson(xmlInfo);

// convert json to xml
var xml = parser.toXml(json);



app.get('/', (req, res, next) => {
    console.log(xml);
});

app.post('/xml', (req, res, next) => {
    res.end(JSON.stringify(req.body));


    var conv1 = parser.toJson(req.body.data);
    console.log('\n\nData recieved from website (JSON): ' + conv1);
    var conv2 = parser.toXml(conv1);
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

    /* convertCurrencyAlt(url, xmlData).then((status) => {
        console.log('GCA: ' + status);
    }).then((stat) => {
        return stat;
    }); */

    convertCurrencyAlt(url, conv2).then((status) => {
        return status
    }).then((stat) => {
        getImageBack(stat);
    });







});

app.listen(3000, () => console.log('UCS Config listening on port 3000'));