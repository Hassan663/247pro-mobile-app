export interface TeamTimesheetListView {
  userId: string;
  userName: string;
  userProfile?: string;
  clockInTime?: string; // ISO 8601 date string
  clockOutTime?: string; // ISO 8601 date string
  projectAddress?: string;
}

// Timesheet Transaction Interface
export interface TimesheetTransaction {
  id: string;
  timesheetId: string;
  transactionType: number;
  transactionDateTime: string; // ISO string for date
  latitude: number;
  longitude: number;
  address: string;
}

// Timesheet Interface
export interface TimesheetViewModel {
  id: string;
  userId: string;
  accountId: string;
  timesheetDate: string; // ISO string for date
  userName: string;
  userProfile: string;
  projectId: number;
  status: number;
  timesheetTimezone: string;
  projectName: string;
  projectAddress: string;
  projectLatitude: number;
  projectLongitude: number;
  timesheetNumber: number;
  timesheetTransactions: TimesheetTransaction[];
}
