import { Bike, BikeType } from '../types';

const PARIS_BOUNDS = {
  north: 49.0,
  south: 48.5,
  east: 3.2,
  west: 1.9
};

export function generateBikes(count: number): Bike[] {
  return Array.from({ length: count }, (_, i) => {
    const totalKilometers = Math.round(Math.random() * 1000);
    const kilometersSinceLastMaintenance = Math.round(Math.random() * Math.min(totalKilometers, 300));
    const type: BikeType = Math.random() > 0.4 ? 'electric' : 'mechanical';
    
    return {
      id: i + 1,
      position: [
        PARIS_BOUNDS.south + Math.random() * (PARIS_BOUNDS.north - PARIS_BOUNDS.south),
        PARIS_BOUNDS.west + Math.random() * (PARIS_BOUNDS.east - PARIS_BOUNDS.west)
      ] as [number, number],
      usageHours: Math.random() * 100,
      batteryLevel: type === 'electric' ? 20 + Math.random() * 80 : null,
      status: kilometersSinceLastMaintenance > (type === 'electric' ? 200 : 250) ? 'maintenance' : 'available',
      lastMaintenance: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      kilometers: totalKilometers,
      kilometersSinceLastMaintenance,
      type
    };
  });
}