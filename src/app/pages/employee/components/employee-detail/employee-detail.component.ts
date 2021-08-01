import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ID } from '@datorama/akita';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { take } from 'rxjs/operators';
import { EmployeeService } from 'src/app/services/service.employee.service';
import { EmployeeQuery } from 'src/app/store/employee/employee.query';
import { EmployeeStore } from 'src/app/store/employee/employee.store';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  @Input() employeeId: ID = '';

  loading$ = this.employeeQuery.selectLoading();

  formEmployee!: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private employeeQuery: EmployeeQuery,
    private emloyeeStore: EmployeeStore,
    private modelRef: NzModalRef,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.initialForm();
    this.getEmployee();
    this.setEmployee();
  }

  get id() {
    return this.employeeId;
  }

  private initialForm() {
    this.formEmployee = this.fb.group({
      id: [],
      name: [],
      email: []
    })
  }

  private getEmployee() {
    if (!this.employeeQuery.hasActive(this.id)) {
      this.employeeService.getEmployee(this.id).subscribe();
    }
  }

  private setEmployee() {
    this.employeeQuery.selectEntity(this.id)
      .pipe(
        take(2)
      ).subscribe(employee => {
        if (employee) this.formEmployee.patchValue(employee);
      });
  }

  public onSubmit() {
    const model = this.formEmployee.getRawValue();
    this.emloyeeStore.setLoading(true);
    if (this.employeeId) this.employeeService.putEmployee(model).subscribe(_ => this.modelRef.destroy());
    else this.employeeService.postEmployee(model).subscribe(_ => this.modelRef.destroy());
  }
}
