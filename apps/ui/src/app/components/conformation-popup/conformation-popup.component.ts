import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../states/employee/employee.model';

@Component({
  selector: 'app-conformation-popup',
  templateUrl: './conformation-popup.component.html',
  styleUrls: ['./conformation-popup.component.scss']
})
export class ConformationPopupComponent {

    public title = 'Conform';
    public message = 'Are you sure want to delete?'
    public confirmButtonText = 'Yes';
    public cancelButtonText = 'No Thanks';
    public employeeInfo: Employee;

    constructor(public dialogRef: MatDialogRef<ConformationPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: Employee) {
      this.employeeInfo = data;
      this.message = 'Are you sure to delete ' + this.employeeInfo.name;
    }

    public onClose() {
      this.dialogRef.close();
    }
  
    public onAccept() {
      this.dialogRef.close(this.employeeInfo);
    }

}
