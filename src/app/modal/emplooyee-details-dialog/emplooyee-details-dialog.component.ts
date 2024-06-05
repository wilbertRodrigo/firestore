import { Employee } from '../../interface/employee';
import { Leave } from 'src/app/interface/leave';

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emplooyee-details-dialog',
  templateUrl: './emplooyee-details-dialog.component.html',
  styleUrls: ['./emplooyee-details-dialog.component.css'],
})
export class EmplooyeeDetailsDialogComponent {
  buttonDisabled: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { employee: Employee; leaves: Leave[] },
    private dialogRef: MatDialogRef<EmplooyeeDetailsDialogComponent>
  ) {}
  getLeavesByType(leaves: Leave[]): { [key: string]: Leave[] } {
    return leaves.reduce((acc, leave) => {
      const key = leave.leaveType;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(leave);
      return acc;
    }, {} as { [key: string]: Leave[] });
  }
  closeDialog() {
    this.dialogRef.close();
    this.buttonDisabled = true;
  }
  print() {
    window.print(); // This triggers the browser's print dialog
  }
}
