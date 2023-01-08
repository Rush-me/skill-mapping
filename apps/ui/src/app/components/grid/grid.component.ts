import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Employee } from '../../states/employee/employee.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {

  @Input() public columnDefs:any[] = [];

  @Input() public rowData:Employee[] = [];

  @Input() public context:any;

  public gridOptions : GridOptions = {
    suppressCellFocus: true
  }
  

  @Output() public gridReady = new EventEmitter();

  public onGridReady(params: GridReadyEvent) {
    this.gridReady.emit(params.api);
    params.api.sizeColumnsToFit();
  }

}
