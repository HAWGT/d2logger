var fs = require('fs');
var path = require('path');
var process = require("process");

function saveLog() {

    var time = Date.now()
    var matchid = document.getElementById('matchid_input').value
    var hero = document.getElementById('hero_select').value
    var improvements = document.getElementById('improvements_input').value
    var mistakes = document.getElementById('mistakes_input').value
    var notes = document.getElementById('notes_input').value

    var fname = time + '.json'

    var json = '[ "time":"' + time + '", "matchid":"' + matchid + '", "hero":"' + hero + '", "improvements":"' + improvements + '", "mistakes":"' + mistakes + '", "notes":"' + notes + '" ]'


    fs.writeFile('./logs/' + fname, json, function(err, data) {
        if (err) {
            return console.log(err);
        }
        console.log(data);
    });

    location.reload();


}

function showLogs() {
    var dir = './logs/'
    fs.readdir(dir, (err, dir) => {
        //console.log(dir);
        for (let filePath of dir)
            console.log(filePath);
    });
}
