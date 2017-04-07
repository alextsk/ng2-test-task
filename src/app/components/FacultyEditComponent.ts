import { Component, OnInit, OnChanges} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DataService } from './get_data.service'

@Component({
  selector: 'faculty-edit',
  template: `
     <h1 *ngIf="id != 'create'">Update Faculty №{{id}}</h1>
    <h1 *ngIf="id == 'create'">Create Faculty</h1>

    <form [formGroup]="facultyForm" 
          (ngSubmit)="onSubmit()"
          (keypress)="keyPressHandler($event)"
          class="form "
          >
      <div class="form-group">
        <label> Name: </label> 
        <input type="text"
          placeholder="faculty name"
          [formControl]="facultyForm.controls['name']" 
          class="form-control"
          />
      </div> 
      <div class="form-group" *ngIf="facultyForm.valid">
        <button class="btn"> Save </button>
      </div>
      
    </form>
  `
})
export class FacultyEditComponent implements OnInit {
  id: any;
  facultyForm : FormGroup;
  faculties : any[];

  constructor (
    private route: ActivatedRoute, 
    private fb: FormBuilder,
    private data: DataService,
    private router :Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => { 
      this.id = params['id']; 
      this.faculties = this.data.getFacultiesList();
      let faculty = this.data.getFaculty(this.id);
      this.facultyForm = this.fb.group({
        'name': [faculty && faculty.name || '', Validators.required],
      })
    });
  }

  keyPressHandler(event) {
    if (event.ctrlKey && event.code == "Enter") {
      this.onSubmit();
    }
  }

  onSubmit() {
    console.log('submitting', this.facultyForm.value)
    if (<string>this.id == 'create') {
      this.data.createFaculty(this.facultyForm.value)  
    } else {
      this.data.updateFaculty(this.id, this.facultyForm.value)  
    }
    this.router.navigate(['faculties'])
  }
}