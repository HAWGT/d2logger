var fs = require('fs')

var contents = fs.readFileSync("./resources/heroes.json", 'utf-8')

var json = JSON.parse(contents)

document.write('<select id="hero_select" onchange="updateIMG()">')
document.write('<option value=""></option>')


for (var i = 0; i < json.result.heroes.length; i++) {
    var name = json.result.heroes[i].name
    document.write('<option value="' + name.substr(14) + '">' + json.result.heroes[i].localized_name + '</option>')

}


document.write("</select>")
