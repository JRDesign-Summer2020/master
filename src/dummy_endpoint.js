import React, {Component} from "react";

class DummyEndpoint {
    static student_data = require("./dummy_student_data.json");
    static location_data = require("./dummy_location_data.json");
    static comp_data = require("./dummy_competency_data.json");

    static get_student(id) {
        console.log(this.student_data);
        return this.student_data[id];
    }

    static get_location(id) {
        return this.location_data[id];
    }
    static get_classes_for_competencies(competencyID) {
        let location_list = [];
        console.log(Object.keys(this.location_data));
        Object.keys(this.location_data).forEach((location) => {
            console.log(location);
            console.log(this.location_data[location]);
            let place = this.location_data[location];
            let name = place["name"];
            let tuple_push = [name, location];
            console.log(tuple_push)
            place.competencies.forEach((competency) => competency == competencyID ? location_list.push(tuple_push) : '')
        });
        return location_list;
    }

    static get_comp(id, func, studentid) {
        console.log(this.comp_data);
        let comp = this.comp_data[id];
        let student = this.student_data[studentid];
        comp["clickButton"] = <button onClick={() => func(id)}>Submit</button>;
        comp["Evaluation"] = student["evaluations"][id]['eval'];
        comp["Comments"] = student["evaluations"][id]['comment'];
        return comp;
    }
    static get_list_of_comps(ids, func, studentid) {
        let id_list = ids.map((id) => DummyEndpoint.get_comp(id, func, studentid));
        return id_list;
    }

    static get_simple_list_of_comps(ids) {
        return ids.map((id) => this.comp_data[id]);
    }

    static write_to_student(studentId, studentInfo) {

        console.log('dumping');
        let jsonInfo = JSON.stringify(studentInfo);
        console.log(jsonInfo);
        // const https = require('https');
        // var request = new XMLHttpRequest();
        // var URL = "save.php"
        // request.open("POST", URL);
        // request.setData(jsonInfo);
        // request.setRequestHeader("Content-Type","application/json");
        // request.send();
        // console.log('end dumping');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: jsonInfo
        };
        let local_url = "C:/Users/samgi/Desktop/GATECH/Spring2020/JuniorDesign/master/src/"
        let url = "http://localhost:3000/" + local_url + "save.php";
        fetch(url, requestOptions).then(console.log('did it!'));
        // fs.writeFile('extra_dummy_data.json', jsonInfo, function (err) {
        //     if (err) throw err;
        //     console.log('Saved!');
        //   });
    }
}

export default DummyEndpoint;
