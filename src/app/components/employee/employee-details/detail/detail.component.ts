import { Component, Input } from '@angular/core';
import { Employee } from 'src/app/interface/employee';
import { Leave } from 'src/app/interface/leave';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent {
  @Input() employee: Employee | undefined;
}
