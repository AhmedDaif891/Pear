import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Employee } from '../Models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpClient: HttpClient) {}

  getAllEmployee(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(
      `${environment.baseUrl}/Employee/GetAllEmployee`
    );
  }

  deleteEmployee(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.baseUrl}/Employee/DeleteEmployee/${id}`
    );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(
      `${environment.baseUrl}/Employee/AddEmployee`,
      employee,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(
      `${environment.baseUrl}/Employee/UpdateEmployee`,
      employee,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}
