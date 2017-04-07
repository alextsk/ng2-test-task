import { Injectable } from '@angular/core';
//import { Http, Response } from '@angular/http';

@Injectable()
export class DataService {
	app = {
	  students: [
	    {id:1, name:"Vasiliy", dob:1973, facId:1, sex:"male"},
	    {id:2, name:"Anastasia", dob:1990, facId:2, sex:"female"},
	    {id:3, name:"John", dob:1988, facId:2, sex:"male"},
	    {id:4, name:"Jennyfer", dob:1992, facId:2, sex:"female"},
	    {id:5, name:"Petrovich", dob:1955, facId:2, sex:"male"},
	    {id:6, name:"Juan", dob:1999, facId:1, sex:"male"},
	  ],
	  //stByFac : {"1": ['1','3'], "2": ['2','4','5', '6']}, idea - index?
	  faculties: [
	    {name: "Biology", id: 1},
	    {name: "Literature", id: 2}
	  ]
	}

  constructor () { }
  
  getStudent(id: number) {
  	return this.app.students.find(stu => stu.id == id)
  }  
 
	updateStudent(id, student) {
  	let index = this.app.students.findIndex(stu => stu.id == id)
  	this.app.students[index] = student;
  }

  getStudentsList() {
    return this.app.students;
  }
  
  createStudent(student) {
  	let newId = this.app.students[this.app.students.length - 1].id + 1
  	student.id = newId;
  	this.app.students.push(student);
  }

  deleteStudent(id: number) {
  	let index = this.app.students.findIndex(stu => stu.id == id)
  	this.app.students.splice(index, 1);
  }

	getStudentsTotal() {
		return this.app.students.length;	
	}



  getFaculty(id: number) {
    return this.app.faculties.find(fac => fac.id == id)
  }
  
  createFaculty(faculty) {
    let newId = this.app.faculties[this.app.faculties.length - 1].id + 1
    faculty.id = newId;
    this.app.faculties.push(faculty);
  }

  updateFaculty(id, faculty) {
    let index = this.app.faculties.findIndex(fac => fac.id == id)
    this.app.faculties[index].name = faculty.name;
  }

	getFacultiesTotal() {
		return this.app.faculties.length;	
	}

  getFacultiesList() {
    return this.app.faculties;
  }

  deleteFaculty(id: number) {
  	let notEmpty = this.app.students.find(stu => stu.facId == id)

  	if (notEmpty) throw "Attemp to delete nonempty faculty";

  	let index = this.app.faculties.findIndex(fac => fac.id == id)
  	this.app.faculties.splice(index, 1);
  }

}