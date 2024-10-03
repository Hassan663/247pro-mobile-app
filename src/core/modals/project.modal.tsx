// ProjectListViewModel

export interface ProjectListViewModel {
  id: number; // Unique identifier for the project
  name: string; // Name of the project
  status: number; // Status of the project (could be an enum)
  address: string; // Address of the project
  latitude: number; // Latitude of the project location
  longitude: number; // Longitude of the project location
  createdDate: string; // Creation date of the project in ISO string format
  primaryContactId: number; // ID of the primary contact for the project
  primaryContactName: string; // Name of the primary contact
  primaryContactProfile: string; // Profile picture or link for the primary contact
  secondaryContactId: number; // ID of the secondary contact for the project
  secondaryContactName: string; // Name of the secondary contact
  secondaryContactProfile: string; // Profile picture or link for the secondary contact
  estimatedTotal: number; // Estimated total cost or budget for the project
}
