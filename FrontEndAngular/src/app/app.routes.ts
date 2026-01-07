import { Routes } from '@angular/router';
import { EmployeeComponent } from './Components/employee/employee.component';
import { DepartmentComponent } from './Components/department/department.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Employee', pathMatch: 'full' },
  { path: 'Employee', component: EmployeeComponent },
  { path: 'Department', component: DepartmentComponent },
];
