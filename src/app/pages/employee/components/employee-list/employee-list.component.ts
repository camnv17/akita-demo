import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ID } from '@datorama/akita';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EmployeeService } from 'src/app/services/service.employee.service';
import { EmployeeQuery } from 'src/app/store/employee/employee.query';
import { EmployeeDetailComponent } from '../employee-detail/employee-detail.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  entities$ = this.employeeQuery.entities$

  constructor(
    private employeeService: EmployeeService,
    private employeeQuery: EmployeeQuery,
    private modalService: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees() {
    this.employeeService.getEmployees().subscribe();
  }

  public opanModalDetailemployee(id: ID) {
    const modal = this.modalService.create({
      nzTitle: 'Employee Detail',
      nzContent: EmployeeDetailComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzFooter: null,
      nzComponentParams: {
        employeeId: id
      }
    });
  }
}
