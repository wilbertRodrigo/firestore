import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeaveService } from 'src/app/services/leave.service';
@Component({
  selector: 'app-file-leave',
  templateUrl: './file-leave.component.html',
  styleUrls: ['./file-leave.component.css'],
})
export class FileLeaveComponent {
  leaveForm: FormGroup;
  leaveTypes = ['Emergency', 'Sick Leave', 'Maternity', 'Vacation Leave'];

  constructor(private fb: FormBuilder, private leaveService: LeaveService) {
    this.leaveForm = this.fb.group({
      employeeId: ['', Validators.required],
      leaveType: ['', Validators.required],
      leaveReason: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.leaveForm.valid) {
      const { employeeId, leaveType } = this.leaveForm.value;
      this.leaveService.fileLeave(employeeId, leaveType).subscribe({
        next: (result) => {
          console.log('Leave filed successfully', result);
          this.leaveForm.reset();
        },
        error: (err) => {
          console.error('Error filing leave', err);
        },
      });
    }
  }
}
