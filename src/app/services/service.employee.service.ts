import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeStore } from '../store/employee/employee.store';
import { delay, tap } from "rxjs/operators";
import { ModelEmployee } from '../models/model.employee';
import { ID } from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private url = 'https://60570ddd055dbd0017e84612.mockapi.io/employee';

  constructor(
    private http: HttpClient,
    private employeeStore: EmployeeStore
  ) { }

  public getEmployees() {
    return this.http.get<ModelEmployee[]>(this.url)
      .pipe(
        tap(employees => { this.employeeStore.set(employees) })
      );
  }

  public getEmployee(id: ID) {
    return this.http.get<ModelEmployee>(`${this.url}/${id}`)
      .pipe(
        tap(employee => {
          this.employeeStore.add(employee);
          this.employeeStore.update({ employeeId: employee.id });
        })
      );
  }

  public postEmployee(model: ModelEmployee) {
    return this.http.post<ModelEmployee>(this.url, model)
      .pipe(
        tap(response => {
          this.employeeStore.add(response);
          this.employeeStore.setLoading(false);
        })
      );
  }

  public putEmployee(model: ModelEmployee) {
    return this.http.put<ModelEmployee>(`${this.url}/${model.id}`, model)
      .pipe(
        tap(employee => {
          this.employeeStore.update(employee.id, employee);
          this.employeeStore.setLoading(false);
        })
      );
  }

  public deleteEmployee(id: ID) {
    return this.http.delete(`${this.url}/${id}`)
      .pipe(
        tap(_ => {
          this.employeeStore.remove(id);
          this.employeeStore.setLoading(false);
        })
      );
  }
}
