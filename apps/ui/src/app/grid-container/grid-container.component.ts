import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ConformationPopupComponent } from '../components/conformation-popup/conformation-popup.component';
import { EmployeePoupupComponent } from '../employee-popup/employee.component';
import { GetAllEmployees, AddNewEmployee, GetAllSkills, RemoveSelectedEmployee, UpdateSelectedEmployee } from '../states/employee/employee.action';
import { Employee } from '../states/employee/employee.model';
import { EmployeesState } from '../states/employee/employee.state';
import { getColumnDefinition } from './grid.config';

@Component({
  selector: 'app-grid-container',
  templateUrl: './grid-container.component.html',
  styleUrls: ['./grid-container.component.scss']
})
export class GridContainerComponent implements OnInit {

  @Select(EmployeesState.employees) employees$!: Observable<Employee[]>;

  public employees: Employee[] = [];
  public colDefs = getColumnDefinition();

  private gridApi: any;
  public context: any;

  constructor(private store: Store, public dialog: MatDialog) {
    this.context = {
      componentParent: this
    }
  }

  public ngOnInit(): void {
    this.employees$.subscribe(response => {

      if (response)
        this.employees = response;
    });

    this.store.dispatch(new GetAllEmployees());
    this.store.dispatch(new GetAllSkills());
  }

  public handleAddClick() {
    const dialogRef = this.dialog.open(EmployeePoupupComponent, {
      width: '600px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.store.dispatch(new AddNewEmployee(result)).subscribe(response => {
          if (response) {
            this.store.dispatch(new GetAllEmployees());
          }
        });
      }
    });
  }

  public handleExportClick() {
    const params = {
      columnGroups: true,
      columnKeys: ['name', 'skills', 'level', 'experience', 'training', 'remarks'],
      fileName: 'user-data',
      columnSeparator: ','
    };

    this.gridApi.exportDataAsCsv(params);
  }

  public onGridReady(event: any) {
    this.gridApi = event;
  }

  public deleteRow(data: Employee) {
    const dialogRef = this.dialog.open(ConformationPopupComponent, {
      width: '350px',
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new RemoveSelectedEmployee(result))
      }
    });
   
  }

  public editRow(data: any) {
    const dialogRef = this.dialog.open(EmployeePoupupComponent, {
      width: '600px',
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(new UpdateSelectedEmployee(result)).subscribe(response => {
          if (response) {
            this.store.dispatch(new GetAllEmployees());
          }
        });
      }
    });
  }

}
