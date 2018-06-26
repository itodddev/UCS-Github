var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();
var parser = require('xml2json');
const axios = require('axios');

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



var filename;

const xmlData = xml;

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

var fs = require('fs');

const getImageBack = (conv) => {
    return axios.get(conv, {
            responseType: 'stream'
        })
        .then(function (response) {
            response.data.pipe(fs.createWriteStream('Hospital.jpg'));
            
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

convertCurrencyAlt(url, xmlData).then((status) => {
    return status
}).then((stat) => {
    getImageBack(stat);
});

/* getImageBack('http://ucs4.us/ucs/engine/temp/ucs-layout-3320.jpg').then((status) => {
    console.log('gIB: ' + status);
}); */
