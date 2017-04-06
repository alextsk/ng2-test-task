import {Component, OnInit, OnChanges} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DataService } from './get_data.service'

@Component({
  selector: 'student-edit',
  template: `
    <h1 *ngIf="id != 'create'">Update Student №{{id}}</h1>
    <h1 *ngIf="id == 'create'">Create Student</h1>

    <form [formGroup]="studentForm" 
          (ngSubmit)="onSubmit()"
          (keypress)="keyPressHandler($event)"
          class="form"
          >
      <div class="form-group">
        <label> Name:
          <input type="text"
            placeholder="student name"
            [formControl]="studentForm.controls['name']" 
            />
        </label> 
      </div> 

      <div class="form-group">
        Faculty:
        <select name="" id="" [formControl]="studentForm.controls['facId']" >
          <option *ngFor="let faculty of faculties" [value]="faculty.id">{{faculty.name}}</option>
        </select>
      </div>
      
      <div class="form-group">
        <label> Year of birth:
          <input type="text"
            placeholder="xxxx"
            [formControl]="studentForm.controls['dob']" 
            />
        </label>  
      </div>

      <div class="form-group">
        Sex:
        <label>
          <input type="radio" name="gender" value="male" [formControl]="studentForm.controls['sex']" [checked]="'male'=== studentForm.controls['sex']"> Male
        </label>
        <label>
          <input type="radio" name="gender" value="female" [formControl]="studentForm.controls['sex']" [checked]="'female'=== studentForm.controls['sex']"> Female
        </label>  
      </div>
      <div class="form-control">
        <button *ngIf="studentForm.valid"> Save </button>
      </div>
      
    </form>
  `
})
export class StudentEditComponent  {
  id: any;
  studentForm : FormGroup;
  faculties : any[];

  constructor (
    private route: ActivatedRoute, 
    private fb: FormBuilder,
    private data: DataService
  ) {
      this.route.params.subscribe(params => { 
      this.id = params['id']; 
      this.faculties = this.data.getFacultiesList();
      let student = this.data.getStudent(this.id);
      this.studentForm = this.fb.group({
        'name': [student && student.name || '', Validators.required],
        'dob': [student && student.dob || ''],
        'sex': [student && student.sex || ''],
        'facId': [student && student.facId || '', Validators.required]
      })
    }); }

  keyPressHandler(event) {
    if (event.ctrlKey && event.code == "Enter") {
      this.onSubmit();
    }
  }

  onSubmit() {
    console.log('submitting', this.studentForm)

    if (<string>this.id == 'create') {
      this.data.createStudent(this.studentForm.value)  
    } else {
      this.data.updateStudent(this.id, this.studentForm.value)  
    }
    
  }
}