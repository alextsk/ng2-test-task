import { Component, OnInit, OnChanges} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup} from '@angular/forms';
import { DataService } from './get_data.service'

@Component({
  selector: 'faculty-edit',
  template: `
    <h1>Faculty id:{{id}}</h1>

    <form [formGroup]="facultyForm" 
          (ngSubmit)="onSubmit()"
          (keypress)="keyPressHandler($event)"
          >
      <div>
        <label> Name
          <input type="text"
            placeholder="faculty name"
            [formControl]="facultyForm.controls['name']" 
            />
        </label> 
      </div> 
      <button> Save </button>
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
    private data: DataService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => { 
      this.id = params['id']; 
      this.faculties = this.data.getFacultiesList();
      let faculty = this.data.getFaculty(this.id);
      this.facultyForm = this.fb.group({
        'name': [faculty && faculty.name || ''],
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
  }
}