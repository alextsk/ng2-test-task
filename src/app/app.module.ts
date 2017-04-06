
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { AcademyAppComponent } from './app.component';

import {OverviewComponent} from './components/OverviewComponent';
import {StudentsComponent} from './components/StudentsComponent';
import {FacultiesComponent} from './components/FacultiesComponent';
import {FacultyEditComponent} from './components/FacultyEditComponent';
import {StudentEditComponent} from './components/StudentEditComponent';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {DataService} from './components/get_data.service';

const routes: Routes = [
  { path: '', component: OverviewComponent, pathMatch: 'full' },
  { path: 'students', component: StudentsComponent },
  { path: 'students/:id', component: StudentEditComponent },
  { path: 'faculties', component: FacultiesComponent },
  { path: 'faculties/:id', component: FacultyEditComponent }
];


@NgModule({
  declarations: [
    AcademyAppComponent,
    OverviewComponent,
    StudentsComponent,
    FacultiesComponent,
    StudentEditComponent,
    FacultyEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ DataService,
  { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AcademyAppComponent]
})
export class AppModule { }
