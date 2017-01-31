var fs = require('fs');
var path = require('path');
var process = require("process");

function saveLog() {

    var time = Date.now()
    var matchid = document.getElementById('matchid_input').value
    var hero = document.getElementById('hero_select').value
    var result = document.getElementById('result_select').value
    var improvements = document.getElementById('improvements_input').value
    var mistakes = document.getElementById('mistakes_input').value
    var notes = document.getElementById('notes_input').value

    if (matchid == '' || matchid == null) {
        alert("Please fill in the Match ID!")
        return 1;
    }

    var fname = time + '.json'

    var json = '{ "time":"' + time + '", "matchid":"' + matchid + '", "hero":"' + hero + '", "result":"' + result + '", "improvements":"' + improvements + '", "mistakes":"' + mistakes + '", "notes":"' + notes + '" }'


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
    var str = "<p>Entries:</p>";
    fs.readdir(dir, (err, dir) => {
        for (let filePath of dir) {

            var contents = fs.readFileSync('./logs/' + filePath, 'utf-8')

            var json = JSON.parse(contents)

            if (json.result == "Loss") {
                str = str.concat('<details><summary style="color: #FF0000;">Match ID: ' + json.matchid + ' <input type="button" value="Delete Entry" onclick="deleteEntry(\'./logs/' + filePath + '\')" /></summary><table><tr><td>Result:</td><td>' + json.result + '</td></tr><tr><td>Hero: </td><td><img src="http://cdn.dota2.com/apps/dota2/images/heroes/' + json.hero + '_sb.png"></img></td></tr><tr><td>Improvements: </td><td><textarea rows="8" cols="32" readonly>' + json.improvements + '</textarea></td></tr><tr><td>Mistakes: </td><td><textarea rows="8" cols="32" readonly>' + json.mistakes + '</textarea></td></tr><tr><td>Notes: </td><td><textarea rows="8" cols="32" readonly>' + json.notes + '</textarea></td></tr></table></details>')
            } else {
                str = str.concat('<details><summary style="color: #00FF00;">Match ID: ' + json.matchid + ' <input type="button" value="Delete Entry" onclick="deleteEntry(\'./logs/' + filePath + '\')" /></summary><table><tr><td>Result:</td><td>' + json.result + '</td></tr><tr><td>Hero: </td><td><img src="http://cdn.dota2.com/apps/dota2/images/heroes/' + json.hero + '_sb.png"></img></td></tr><tr><td>Improvements: </td><td><textarea rows="8" cols="32" readonly>' + json.improvements + '</textarea></td></tr><tr><td>Mistakes: </td><td><textarea rows="8" cols="32" readonly>' + json.mistakes + '</textarea></td></tr><tr><td>Notes: </td><td><textarea rows="8" cols="32" readonly>' + json.notes + '</textarea></td></tr></table></details>')
            }

            document.getElementById('entries').innerHTML = str;
        }

    });

}

function deleteEntry(filePath) {

    fs.unlinkSync(filePath)
    location.reload();

}
