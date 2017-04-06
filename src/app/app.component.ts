import { Component } from '@angular/core';

@Component({
  selector: 'academy-root',
  template: `
  <div>
    <nav>
      <ul>
        <li><a [routerLink]="['']">Overview</a></li>
        <li><a [routerLink]="['students']">Students</a></li>
        <li><a [routerLink]="['faculties']">Faculties</a></li>
      </ul>
    </nav>

    <router-outlet></router-outlet>
  </div>
  `
})
export class AcademyAppComponent {
}
