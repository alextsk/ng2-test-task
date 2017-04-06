import { Component } from '@angular/core';

@Component({
  selector: 'academy-root',
  host:{'class': 'container'},
  template: `
  <div >
    <nav class="navigation">
      <ul>
        <li routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}"><a [routerLink]="['']" >Overview</a></li>
        <li routerLinkActive="active"><a [routerLink]="['students']" >Students</a></li>
        <li routerLinkActive="active"><a [routerLink]="['faculties']" >Faculties</a></li>
      </ul>
    </nav>

    <router-outlet></router-outlet>
  </div>
  `
})
export class AcademyAppComponent {
}
