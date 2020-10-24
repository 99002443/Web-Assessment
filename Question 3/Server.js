//Example for creating JSON Rest server....
const app = require('express')();
const parser = require("b-parser");
const fs = require("fs");
const dir = __dirname;

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());


let person = []; 
let flag = 1;

function read() {
    const filename = "data.json";  
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    person = JSON.parse(jsonContent);
}

function save() {
    const filename = "data.json";
    const jsonData = JSON.stringify(person);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}
app.get("/person", (req, res) => {
    read();
    res.send(JSON.stringify(person));
})

app.get("/person/:id", (req, res) => {
    const personid = req.params.id;
    if (person.length == 0) {
        read();
    }
    let foundRec = person.find((e) => e.personId == personid);
    if (foundRec == null)
        throw "Not found";
    res.send(JSON.stringify(foundRec))
})

app.put("/person", (req, res) => {
    if (person.length == 0)
        read(); 
    let b = req.b;
   
    for (let index = 0; index < person.length; index++) {
        let element = person[index];
        if (element.personId == b.personId) { 
            element.personName = b.personName;
            element.personCity = b.personCity;
            element.personEmail = b.personEmail;
            element.personPhone = b.personPhone;
            save();
            res.send("Person updated successfully");
        }
    }
    
})

app.post('/person', (req, res) => {
    if (person.length == 0)
        read(); 
    let b = req.b; 


    for (let index = 0; index < person.length; index++) {
        let element = person[index];
        if (element.personName == b.personName) { 
            res.send("Person name already present");
            flag = 0;
        }

    }


    if (flag >= 1) {
        person.push(b);
        save(); 
        res.send("Person added successfully");
    }

})
app.delete("/person/:id", (req, res) => {
    throw "Opps!!! are sure to delete ";
})

app.listen(1235, () => {
    console.log("Server available at 1235");
})