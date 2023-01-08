import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee, Skill } from '../states/employee/employee.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

 // private baseUrl = 'http://localhost:4000';
  private baseUrl = 'http://localhost:4300/api'

  constructor(private http: HttpClient) { }

  getAll(): Observable<Employee[]> {
   return this.http
      .get<Employee[]>(`${this.baseUrl}/employees`);
  }

  getSkills(): Observable<Skill[]> {
    return this.http
       .get<Skill[]>(`${this.baseUrl}/skills`);
   }

  get(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/employees/${id}`);
  }

  add(data: Employee): Observable<any> {
    return this.http.post(`${this.baseUrl}/employees`, data);
  }

  update(id: string, data: Employee): Observable<any> {
    return this.http.put(`${this.baseUrl}/employees/${id}`, data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/employees/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/employees`);
  }

  findByTitle(title: any): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/employees?name=${title}`);
  }

  filter(query: string): any {
    console.log(query, ' query')
    return this.http
       .get(`${this.baseUrl}/employees?${query}`);
   }
}
