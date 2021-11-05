import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StudentForCreationDTO } from './employee';

@Injectable({
  providedIn:'root'
})

  export class EmployeeService {
    private apiServerUrl = environment.apiBaseUrl2;

   constructor(private http:HttpClient) {}

   //get method
   public getEmployee():Observable<StudentForCreationDTO[]> {
     return this.http.get<StudentForCreationDTO[]>(`${this.apiServerUrl}/api/[controller]/{get}`);
   }
  //post method
   public addEmployee(studentForCreation:StudentForCreationDTO):Observable<StudentForCreationDTO> {
     return this.http.post<StudentForCreationDTO>(`${this.apiServerUrl}/api/[controller]/{post}`,studentForCreation);
   }

   //update method
   public updateEmployee (studentForUpdate:StudentForCreationDTO):Observable<StudentForCreationDTO> {
     return this.http.put<StudentForCreationDTO>(`${this.apiServerUrl}/employee/update`, studentForUpdate);
   }

   //delete method
   public deleteEmployee (id:number): Observable<void> {
     return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${id}`);
   }

  }
