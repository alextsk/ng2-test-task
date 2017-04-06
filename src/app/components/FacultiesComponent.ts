import {Component} from '@angular/core';
import {DataService} from './get_data.service';

@Component({
  selector: 'faculties',
  template: `
    <h1>Faculties List</h1>
    <table class="table">
      <thead>
      <tr>
        <th>№</th>
        <th>Name</th>
        <th>Total Students</th>
        <th>Male Students</th>
        <th>Female Students</th>
        <th>Avg student age</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
        <tr *ngFor="let faculty of faculties">
          <td> {{faculty.id}}</td>
          <td> {{faculty.name}}</td>
          <td> {{countStudentsByFac(faculty.id)}} </td>
          <td> {{countStudentsByFac(faculty.id, "male")}} </td>
          <td> {{countStudentsByFac(faculty.id, "female")}} </td>
          <td> {{avgAge(faculty.id)}} </td>
          <td>
            <a [routerLink]="faculty.id" >edit</a>
            <button *ngIf="!countStudentsByFac(faculty.id)" 
                    (click)="deleteFaculty(faculty.id)"
                    > Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <button [routerLink]="['create']"> Create New Faculty</button>
  `
})
export class FacultiesComponent {

  faculties: any[];
  students: any[];

  constructor(private data: DataService) {
    this.faculties = this.data.getFacultiesList();
    this.students= this.data.getStudentsList();
  }

  countStudentsByFac(facId : number, sex:  string = null) {
    let studentsTotal = this.students.filter( stu => (stu.facId == facId));
    return sex ? studentsTotal.filter(s => s.sex == sex).length : studentsTotal.length;
  }

  avgAge(facId : number) {
    let currentYear = (new Date()).getFullYear();
    let students = this.students
      .filter( stu => (stu.facId == facId));
    let average = students.reduce((acc, stu) => acc + (currentYear - stu.dob), 0) / (students.length || 1) ;
    return average.toFixed(2);
    
  }
  deleteFaculty(id) {
    this.data.deleteFaculty(id);
  }
}