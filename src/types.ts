export type FilterStatus = 'all' | 'available' | 'maintenance';
export type BikeType = 'electric' | 'mechanical';
export type BikeStatus = 'available' | 'maintenance';

export interface Bike {
  id: number;
  position: [number, number];
  usageHours: number;
  batteryLevel: number | null;
  status: BikeStatus;
  lastMaintenance: Date;
  kilometers: number;
  kilometersSinceLastMaintenance: number;
  type: BikeType;
}