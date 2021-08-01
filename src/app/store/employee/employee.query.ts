import { Injectable } from "@angular/core";
import { ID, QueryEntity } from "@datorama/akita";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { ModelEmployee } from "src/app/models/model.employee";
import { EmployeeState, EmployeeStore } from "./employee.store";

@Injectable({ providedIn: 'root' })
export class EmployeeQuery extends QueryEntity<EmployeeState, ModelEmployee>{

    constructor(
        protected store: EmployeeStore
    ) {
        super(store);
    }

    entities$ = combineLatest([
        this.selectAll(),
        this.selectLoading()
    ]).pipe(map(loadEntities));
}

function loadEntities([employees, loading]: [ModelEmployee[], boolean]) {
    return {
        employees,
        loading
    }
}
