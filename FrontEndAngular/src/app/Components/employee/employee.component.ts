import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../Services/employee.service';
import { Employee } from '../../Models/employee';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DepartmentService } from '../../Services/department.service';
import { Department } from '../../Models/department';

@Component({
  selector: 'app-employee',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  departments!: Department[];
  employeeForm: FormGroup;
  showForm: boolean = true;

  constructor(
    private employeeServices: EmployeeService,
    private departmentService: DepartmentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.employeeForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(
          '^[\u0600-\u06FFa-zA-Z]+( [\u0600-\u06FFa-zA-Z]+)*$'
        ),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobileNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^01[0-9]{9}$'),
        Validators.maxLength(11),
      ]),
      defaultDepartment: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.GetAllEmployee();
    this.GetAllDepartment();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  dataSource = new MatTableDataSource<Employee>([]);
  displayColumn: string[] = [
    'number',
    'name',
    'email',
    'defaultDepartment',
    'mobileNumber',
    'updateBtn',
    'deleteBtn',
  ];

  GetAllEmployee() {
    this.employeeServices.getAllEmployee().subscribe({
      next: (res) => {
        this.dataSource.data = res;
      },
      error: (err) => console.log(err),
    });
  }

  DeleteEmployee(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'هل أنت متأكد أنك تريد حذف المستخدم',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.employeeServices.deleteEmployee(id).subscribe({
          next: () => {
            this.GetAllEmployee();
          },
          error: (err) => console.log(err),
        });
      }
    });
  }

  AddNewEmployee(employee: Employee) {
    this.employeeServices.addEmployee(employee).subscribe({
      next: (res) => {
        this.snackBar.open('تم إضافه المستخدم بنجاح ✅', 'إغلاق', {
          duration: 3000,
        });
        this.employees.push(res);
        this.GetAllEmployee();
        this.ClearData();
        this.openTheTableandCloseTheForm();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  UpdateEmployee(employee: Employee) {
    this.employeeServices.updateEmployee(employee).subscribe({
      next: (res) => {
        this.snackBar.open('تم تعديل المستخدم بنجاح ✅', 'إغلاق', {
          duration: 3000,
        });
        this.GetAllEmployee();
        this.ClearData();
        this.openTheTableandCloseTheForm();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  submit() {
    const employeeData: Employee = this.employeeForm.value;
    if (employeeData.id === 0) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          message: 'هل أنت متأكد أنك تريد إضافه المستخدم',
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.AddNewEmployee(employeeData);
        }
      });
    } else {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          message: 'هل أنت متأكد أنك تريد تعديل المستخدم',
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.UpdateEmployee(employeeData);
        }
      });
    }
  }

  openFormANdCloseTable() {
    this.showForm = true;
    this.ClearData();
  }

  openTheTableandCloseTheForm() {
    this.showForm = false;
  }

  setDataInForm(employee: Employee) {
    this.showForm = true;
    this.employeeForm.patchValue({
      id: employee.id,
      name: employee.name,
      email: employee.email,
      mobileNumber: employee.mobileNumber,
      defaultDepartment: employee.defaultDepartment,
    });
  }

  ClearData() {
    this.employeeForm.reset({
      id: 0,
      name: '',
      mobileNumber: '',
      defaultDepartment: '',
    });
  }

  get name() {
    return this.employeeForm.get('name');
  }

  get mobileNumber() {
    return this.employeeForm.get('mobileNumber');
  }

  get email() {
    return this.employeeForm.get('email');
  }

  get defaultDepartment() {
    return this.employeeForm.get('defaultDepartment');
  }

  GetAllDepartment() {
    return this.departmentService.getAllDepartment().subscribe({
      next: (res) => {
        this.departments = res;
      },
    });
  }
}
