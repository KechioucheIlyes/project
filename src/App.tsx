import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Bike, FilterStatus } from './types';
import { generateBikes } from './utils/generateData';
import { BikeMarker } from './components/BikeMarker';
import { BikeList } from './components/BikeList';
import { ParisBoundary } from './components/ParisBoundary';
import { MaintenanceStats } from './components/MaintenanceStats';
import { Toaster } from 'sonner';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function App() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    setBikes(generateBikes(40));

    const interval = setInterval(() => {
      setBikes(prevBikes => 
        prevBikes.map(bike => {
          const additionalKm = Math.random() * 0.5;
          const newBatteryLevel = bike.type === 'electric' && bike.batteryLevel !== null
            ? Math.max(0, bike.batteryLevel - Math.random() * 3)
            : bike.batteryLevel;
          const newKmSinceMaintenance = bike.kilometersSinceLastMaintenance + additionalKm;

          return {
            ...bike,
            usageHours: bike.usageHours + Math.random() * 2,
            batteryLevel: newBatteryLevel,
            kilometers: bike.kilometers + additionalKm,
            kilometersSinceLastMaintenance: newKmSinceMaintenance,
            status: newKmSinceMaintenance > (bike.type === 'electric' ? 200 : 250) ? 'maintenance' : 'available'
          };
        })
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const filteredBikes = bikes.filter(bike => 
    filter === 'all' ? true : bike.status === filter
  );

  return (
    <div className="flex h-screen">
      <Toaster position="top-right" />
      <div className="flex-1 relative">
        <MapContainer
          center={[48.8566, 2.3522]}
          zoom={10}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ParisBoundary />
          {filteredBikes.map(bike => (
            <BikeMarker key={bike.id} bike={bike} />
          ))}
        </MapContainer>
      </div>
      
      <div className={`transition-all duration-300 ${showStats ? 'w-[800px]' : 'w-80'}`}>
        <div className="h-full flex">
          <div className="w-80 border-l border-gray-200 flex flex-col">
            <BikeList
              bikes={bikes}
              filter={filter}
              onFilterChange={setFilter}
            />
            <button
              onClick={() => setShowStats(!showStats)}
              className="p-2 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 border-t"
            >
              {showStats ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              <span>{showStats ? 'Masquer' : 'Voir'} les statistiques</span>
            </button>
          </div>
          
          <div 
            className={`transition-all duration-300 ${
              showStats ? 'w-[520px] opacity-100' : 'w-0 opacity-0 overflow-hidden'
            }`}
          >
            <div className="h-full overflow-auto border-l border-gray-200">
              <MaintenanceStats bikes={bikes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}