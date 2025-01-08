export enum TableType {
  DINING = "Dining Table",
  BOOTH = "Booth Table",
  OUTDOOR = "Outdoor Table",
  PRIVATE = "Private Dining Table",
}

export interface Table {
    id: string;
    type: TableType;
    name: string;
    warning: boolean;
    guests: number;
    maxGuests: number;
  }
  