import { EmployeeService } from './employee.service';
import {  StudentForCreationDTO } from './employee';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees: StudentForCreationDTO[] = [];
  public editEmployee!: StudentForCreationDTO;
  public deleteEmployee!: StudentForCreationDTO;

  constructor(private employeeService:EmployeeService) {}

  ngOnInit() {
    this.getEmployee();
  }

  public getEmployee():void {
    this.employeeService.getEmployee().subscribe(
      (response: StudentForCreationDTO[]) => {
        console.log(response);
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmployee(addForm:NgForm): void {
    document.getElementById('addemployeeform')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response:StudentForCreationDTO) => {
        console.log(response);
        this.getEmployee();
        addForm.reset();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }

    )
  }

  public onUpdateEmployee(employee:StudentForCreationDTO): void {
    document.getElementById('updateemployeeform')?.click();
    this.employeeService.updateEmployee(employee).subscribe(
      (response:StudentForCreationDTO) => {
        console.log(response);
        this.getEmployee();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteEmployee(employeeId:number):void {
    document.getElementById('deleteemployeeform')?.click();
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response:void) =>{
        console.log(response);
        this.getEmployee();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


  public onOpenModal(employee: any, mode:string):void {
    const container = document.getElementById('maincontainer');
    const button = document.createElement('button');
    button.type='button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle','modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target','#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-bs-target','#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-bs-target','#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();

    }
}
