import {Component} from '@angular/core';
import {DataService} from './get_data.service';

@Component({
  selector: 'students',
  template: `
  <h1>Students List</h1>
  
  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Year of birth</th>
        <th>Sex</th>
        <th>Faculty</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let student of students">
        <td> {{student.name}} </td>
        <td> {{student.dob}} </td>
        <td> {{student.sex}} </td>
        <td> {{getFacById(student.facId)}} </td>
        <td> <a [routerLink]="[ student.id ]" > Edit </a> </td>
        <td> <button (click)= "deleteStudent(student.id)"> delete </button> </td>
      </tr>
    </tbody>
  </table>
  <button [routerLink]="['create']"> Create New Student</button>
  `
})
export class StudentsComponent {
  students: any[];
  faculties: any[]

  constructor(private data: DataService) {
    this.students = this.data.getStudentsList();
    this.faculties = this.data.getFacultiesList();
  }

  getFacById(id: number) {
    return this.faculties.find( fac => fac.id == id ).name
  }

  deleteStudent(id) {
    this.data.deleteStudent(id);
  }

}