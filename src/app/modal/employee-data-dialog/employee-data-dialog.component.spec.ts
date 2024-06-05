import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDataDialogComponent } from './employee-data-dialog.component';

describe('EmployeeDataDialogComponent', () => {
  let component: EmployeeDataDialogComponent;
  let fixture: ComponentFixture<EmployeeDataDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDataDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
