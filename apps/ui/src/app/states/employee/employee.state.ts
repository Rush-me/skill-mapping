import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs";
import { DataService } from "../../services/data.service";
import * as Actions from './employee.action';
import { Employee, Employees, Skill } from "./employee.model";

@State<Employees>({
  name: 'employees',
  defaults: {
    employees: [],
    skills: [],
    selectedEmployee: undefined
  },
})
@Injectable()
export class EmployeesState {
  constructor(private store: Store, public service: DataService) { }

  @Action(Actions.GetAllEmployees)
  public getAllEmployees(ctx: StateContext<Employees>, action: Actions.GetAllEmployees) {
    return this.service.getAll().pipe(
      tap((response) => {
        ctx.patchState({
          employees: response as Employee[],
        });
      })
    );
  }

  @Action(Actions.GetAllSkills)
  public getAllSkills(ctx: StateContext<Employees>, action: Actions.GetAllSkills) {
    return this.service.getSkills().pipe(
      tap((response) => {
        ctx.patchState({
          skills: response as Skill[],
        });
      })
    );
  }

  @Action(Actions.SearchByName)
  public searchByName(ctx: StateContext<Employees>, action: Actions.SearchByName) {
    return this.service.findByTitle(action.name).pipe(
      tap((response) => {
        ctx.patchState({
          employees: response as Employee[],
        });
      })
    );
  }

  @Action(Actions.FilterData)
  public filterData(ctx: StateContext<Employees>, action: Actions.FilterData) {
   
    let query = '';
    query += action.filter.name ? '&name=' + action.filter.name : query;
    query += action.filter.skills ? '&skills='+ action.filter.skills.join('|') : query;
    query +=  action.filter.level ? '&level='+ action.filter.level.join('|') : query;
    
    return this.service.filter(query).pipe(
      tap((response) => {
        ctx.patchState({
          employees: response as Employee[],
        });
      })
    );
  }

  @Action(Actions.AddNewEmployee)
  public addNewEmployee(ctx: StateContext<Employees>, action: Actions.AddNewEmployee) {
    return this.service.add(action.employee).pipe(
      tap((response) => {
        console.log('employee added successfully');
      })
    );
  }


  @Action(Actions.SetSelectedEmployee)
  public setSelectedEmployee(ctx: StateContext<Employees>, action: Actions.SetSelectedEmployee) {
    ctx.patchState({
      selectedEmployee: action.employee
    });
  }

  @Action(Actions.RemoveSelectedEmployee)
  public removeSelectedEmployee(ctx: StateContext<Employees>, action: Actions.RemoveSelectedEmployee) {
    return this.service.delete(action.employee.id).pipe(
      tap((response) => {
        this.store.dispatch(new Actions.GetAllEmployees())
      })
    );
  }

  @Action(Actions.UpdateSelectedEmployee)
  public updateSelectedEmployee(ctx: StateContext<Employees>, action: Actions.UpdateSelectedEmployee) {
    return this.service.update(action.employee.id, action.employee).pipe(
      tap((response) => {
        this.store.dispatch(new Actions.GetAllEmployees());
      })
    );
  }

  @Selector()
  static employees(state: Employees) {
    return state.employees;
  }

  @Selector()
  static skills(state: Employees) {
    return state.skills;
  }

  @Selector()
  static selectedEmployee(state: Employees) {
    return state.selectedEmployee;
  }
}
