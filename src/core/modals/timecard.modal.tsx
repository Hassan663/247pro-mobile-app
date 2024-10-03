//Timesheet Models

export interface TimesheetTransactionViewModel {
  id: string; // Unique identifier (UUID)
  timesheetId: string; // Associated timesheet identifier (UUID)
  transactionType: number; // Type of transaction (e.g., clock-in or clock-out)
  transactionDateTime: string; // Date and time of the transaction (ISO format)
  latitude: number; // Latitude for the location of the transaction
  longitude: number; // Longitude for the location of the transaction
  address: string; // Address where the transaction occurred
}
