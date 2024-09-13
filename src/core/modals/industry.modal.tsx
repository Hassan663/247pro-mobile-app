export interface Industry {
  name: string;
  isDefault: boolean;
  isVisible: boolean;
  id: number;
}

export interface PrimarySpecialty {
  name: string;
  publishType: number;
  isDefault: boolean;
  accountId: number;
  industryId: number;
  id: number;
}

export interface JobType {
  name: string;
  industoryId: number;
  id: number;
}
