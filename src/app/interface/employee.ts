import { Leave } from './leave';

export interface Employee {
  id?: string;
  name: string;
  email: string;
  department: string;
  dateOfHire: string;
  leaves?: Leave[]; // Array of leave objects
}
