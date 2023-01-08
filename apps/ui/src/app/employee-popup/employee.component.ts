import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Employee, Skill } from '../states/employee/employee.model';
import { EmployeesState } from '../states/employee/employee.state';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeePoupupComponent implements OnInit {

  public titleText = 'Add a new User';
  public employeeInfo: Employee;
  public skills: Skill[] = [];
  public actionButtonText = 'Add';
  public formGroup: FormGroup;

  public name: FormControl;
  public skillsControl: FormControl;
  public experience: FormControl;
  public level: FormControl;
  public training: FormControl;
  public remarks: FormControl;
  public id: FormControl;
  public employeeId: FormControl;

  @Select(EmployeesState.skills) skills$!: Observable<Skill[]>;


  constructor(private store: Store, public dialogRef: MatDialogRef<EmployeePoupupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee) {
      this.employeeInfo = data;
      this.actionButtonText = data.name ? 'Update' : 'Add';
      this.titleText = data.name ? 'Update ' + data.name : 'Add a new User';

      this.employeeId = new FormControl(this.employeeInfo.employeeId, [Validators.required]);
      this.name = new FormControl(this.employeeInfo.name, [Validators.required, Validators.minLength(3)]);
      this.skillsControl = new FormControl(this.employeeInfo.skills, [Validators.required]);
      this.experience = new FormControl(this.employeeInfo.experience);
      this.level = new FormControl(this.employeeInfo.level);
      this.training = new FormControl(this.employeeInfo.training);
      this.remarks = new FormControl(this.employeeInfo.remarks);
      this.id = new FormControl(this.employeeInfo.id);

      this.formGroup = new FormGroup({
        'name': this.name,
        'skills' : this.skillsControl,
        'level': this.level,
        'remarks' : this.remarks,
        'training': this.training,
        'experience' : this.experience,
        'id': this.id,
        'employeeId': this.employeeId
      });
     }

     ngOnInit(): void {
      this.skills$.subscribe(response => {

        if (response)
          this.skills = response;
      });
     }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public onSubmitClick() {
    this.dialogRef.close(this.formGroup.value);
  }

}
