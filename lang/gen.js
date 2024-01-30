var json = `{
"#lang.name": "LANGUAGE NAME",
"#lang.credit": "NAME, NAME, NAME",
"land": "",
"liquids": "",
"life": "",
"powders": "",
"solids": "",
"energy": "",
"weapons": "",
"gases": "",
"food": "",
"machines": "",
"special": "",
"other": ""`;
for (var element in elements) {
    json += ',\n"'+element+'": ""'
}
json += "\n}";
console.log(json);