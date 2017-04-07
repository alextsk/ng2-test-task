import {Component} from '@angular/core';
import {DataService} from './get_data.service';


@Component({
  selector: 'overview',
  template: `
  	<h1>Overview</h1>
  	<div class="card">Total students: <span class="badge">{{students}}</span></div>
  	<div class="card">Total faculties: <span class="badge">{{faculties}}</span></div>
	`
})
export class OverviewComponent {
	students: number;
	faculties: number;

	constructor(private data: DataService) {
		this.students = this.data.getStudentsTotal();
		this.faculties = this.data.getFacultiesTotal();
	}
}