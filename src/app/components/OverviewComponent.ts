import {Component} from '@angular/core';
import {DataService} from './get_data.service';


@Component({
  selector: 'overview',
  template: `
  	<h1>Overview</h1>
  	<div>Total students: {{students}}</div>
  	<div>Total faculties: {{faculties}}</div>
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