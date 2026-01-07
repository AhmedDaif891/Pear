import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department } from '../Models/department';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private httpClient: HttpClient) {}

  getAllDepartment(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(
      `${environment.baseUrl}/Department/GetAllDepartments`
    );
  }

  addDepartment(department: Department): Observable<Department> {
    return this.httpClient.post<Department>(
      `${environment.baseUrl}/Department/AddDepartment`,
      department,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  updateDepartment(department: Department): Observable<Department> {
    return this.httpClient.put<Department>(
      `${environment.baseUrl}/Department/UpdateDepartment`,
      department,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  deleteDepartment(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.baseUrl}/Department/DeleteDepartment/${id}`
    );
  }
}
