import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentService } from '../../Services/department.service';
import { Department } from '../../Models/department';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Employee } from '../../Models/employee';
import { EmployeeService } from '../../Services/employee.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-department',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    FormsModule,
    MatPaginatorModule,
  ],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
})
export class DepartmentComponent implements OnInit {
  departments: Department[] = [];
  departmentForm: FormGroup;
  showForm: boolean = true;
  employees: Employee[] = [];

  constructor(
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.departmentForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      managerId: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    this.GetAllDepartment();
    this.GetAllEmployee();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  dataSource = new MatTableDataSource<Department>([]);
  displayColumn: string[] = [
    'number',
    'name',
    'managerId',
    'updateBtn',
    'deleteBtn',
  ];

  GetAllDepartment() {
    return this.departmentService.getAllDepartment().subscribe({
      next: (res) => {
        this.dataSource.data = res;
      },
    });
  }

  GetAllEmployee() {
    this.employeeService.getAllEmployee().subscribe({
      next: (res) => {
        this.employees = res;
      },
      error: (err) => console.log(err),
    });
  }

  DeleteDepartment(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'هل أنت متأكد أنك تريد حذف المستخدم',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.departmentService.deleteDepartment(id).subscribe({
          next: () => {
            this.GetAllDepartment();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  submit() {
    const departmentData: Department = this.departmentForm.value;
    if (departmentData.id === 0) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          message: 'هل أنت متأكد أنك تريد إضافه المستخدم',
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.AddNewDepartment(departmentData);
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
          this.UpdateDepartment(departmentData);
        }
      });
    }
    // if (departmentData.id === 0) {
    //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //     data: {
    //       message: 'هل أنت متأكد أنك تريد إضافه المستخدم',
    //     },
    //   });
    //   dialogRef.afterClosed().subscribe((result) => {
    //     if (result) {
    //       this.AddNewDepartment(departmentData);
    //     }
    //   });
    // } else {
    //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //     data: {
    //       message: 'هل أنت متأكد أنك تريد إضافه المستخدم',
    //     },
    //   });
    //   dialogRef.afterClosed().subscribe((result) => {
    //     if (result) {
    //       this.UpdateDepartment(departmentData);
    //     }
    //   });
    // }
  }

  AddNewDepartment(department: Department) {
    this.departmentService.addDepartment(department).subscribe({
      next: (res) => {
        this.snackBar.open('تم إضافه المستخدم بنجاح ✅', 'إغلاق', {
          duration: 3000,
        });
        this.departments.push(res);
        this.openTheTableandCloseTheForm();
        this.clearData();
        this.GetAllDepartment();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  UpdateDepartment(department: Department) {
    this.departmentService.updateDepartment(department).subscribe({
      next: () => {
        this.snackBar.open('تم تعديل المستخدم بنجاح ✅', 'إغلاق', {
          duration: 3000,
        });
        this.clearData();
        this.GetAllDepartment();
        this.openTheTableandCloseTheForm();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openTheTableandCloseTheForm() {
    this.showForm = false;
  }

  openFormAndCloseTable() {
    this.showForm = true;
    this.clearData();
  }

  clearData() {
    this.departmentForm.reset({
      id: 0,
      name: '',
      managerId: '',
    });
  }

  setDataInForm(department: Department) {
    this.showForm = true;
    this.departmentForm.patchValue({
      id: department.id,
      name: department.name,
      managerId: department.managerId,
    });
  }

  get name() {
    return this.departmentForm.get('name');
  }

  get managerId() {
    return this.departmentForm.get('managerId');
  }
}
