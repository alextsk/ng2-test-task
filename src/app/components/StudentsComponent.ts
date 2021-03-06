import {Component} from '@angular/core';
import {DataService} from './get_data.service';

@Component({
  selector: 'students',
  template: `
  <h1>Students</h1>
   <button class="btn btn-success btn-create-student" [routerLink]="['create']"> Create New Student</button>
   <hr />
  <table class="table table-students">
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
        <td> <a [routerLink]="[ student.id ]" class="btn btn-sm"> Edit </a> </td>
        <td> <button (click)= "deleteStudent(student.id)" class="btn btn-sm btn-danger"> delete </button> </td>
      </tr>
    </tbody>
  </table>
  
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