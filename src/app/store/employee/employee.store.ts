import { Injectable } from "@angular/core";
import { EntityState, EntityStore, ID, StoreConfig } from "@datorama/akita";
import { ModelEmployee } from "src/app/models/model.employee";

export interface EmployeeState extends EntityState<ModelEmployee> {
    employeeId: ID;
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'books', idKey: 'id' })
export class EmployeeStore extends EntityStore<EmployeeState, ModelEmployee>{

    constructor() {
        super({
            employeeId: ''
        });
    }
}