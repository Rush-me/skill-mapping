import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePoupupComponent } from './employee.component';

describe('NewProductComponent', () => {
  let component: EmployeePoupupComponent;
  let fixture: ComponentFixture<EmployeePoupupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePoupupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePoupupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
