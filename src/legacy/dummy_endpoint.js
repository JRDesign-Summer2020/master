import React from "react";

class DummyEndpoint {
    static student_data = require("../json/dummy_student_data.json");
    static location_data = require("../json/dummy_location_data.json");
    static comp_data = require("../json/dummy_competency_data.json");

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
            place.competencies.forEach((competency) => (competency === competencyID ? location_list.push(tuple_push) : ''))
        });
        console.log(location_list);
        return location_list;
    }

    static get_comp(id, func, studentid) {
        console.log(this.comp_data);
        let comp = this.comp_data[id];
        let student = this.student_data[studentid];
        comp["clickButton"] = <button onClick={() => func(id)}>Submit</button>;
        comp["Evaluation"] = student["evaluations"][id]['eval'];
        comp["Comments"] = student["evaluations"][id]['comment'];
        comp["Class"] = this.get_location(student["evaluations"][id]["class"])["name"];
        return comp;
    }

    static get_simple_comp(id, func, studentid) {
        console.log(this.comp_data);
        return this.comp_data[id];
    }
    static get_list_of_comps(ids, func, studentid) {
        return ids.map((id) => DummyEndpoint.get_comp(id, func, studentid));
    }

    static get_simple_list_of_comps(ids) {
        return ids.map((id) => this.comp_data[id]);
    }

    static get_list_of_students(ids) {
        return ids.map((id) => DummyEndpoint.get_student(id));
    }

    static get_all_students_list(func) {
        let list_return = []
        // {
        //   allStudents: "John Doe",
        //   id: 'jdoe3',
        //   clickButton: <button onClick={() => this.toStudent(5)}>Evaluate</button>,
        // },   return format we need
        Object.keys(this.student_data).forEach((student_id) => {
            let cur_stud = DummyEndpoint.get_student(student_id);
            let nec_data = {
                allStudents: cur_stud["name"],
                id: cur_stud["id"],
                clickButton: <button onClick={() => func(student_id)}>Evaluate</button>,
            }
            list_return.push(nec_data);
        })
        return list_return;

    }

    static write_to_student(studentId, studentInfo) {

        console.log('dumping');
        let jsonInfo = JSON.stringify(studentInfo);
        console.log(jsonInfo);

    }
}

export default DummyEndpoint;
