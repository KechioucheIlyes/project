import React from 'react';
import { Bike, FilterStatus } from '../types';
import { Bike as BikeIcon, Zap, Cog, Wrench } from 'lucide-react';

interface BikeListProps {
  bikes: Bike[];
  filter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

const getStatusColor = (status: Bike['status']) => {
  return status === 'available' ? 'text-green-500' : 'text-red-500';
};

export const BikeList: React.FC<BikeListProps> = ({ bikes, filter, onFilterChange }) => {
  const filteredBikes = bikes.filter(bike => 
    filter === 'all' ? true : bike.status === filter
  );

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-4">État des Vélib'</h2>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => onFilterChange('all')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'all' 
                ? 'bg-gray-200 text-gray-800' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Tous
          </button>
          <button
            onClick={() => onFilterChange('available')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'available'
                ? 'bg-green-200 text-green-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Disponible
          </button>
          <button
            onClick={() => onFilterChange('maintenance')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'maintenance'
                ? 'bg-red-200 text-red-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            En maintenance
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        {filteredBikes.map(bike => (
          <div
            key={bike.id}
            className="p-4 border-b hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <BikeIcon className={getStatusColor(bike.status)} size={20} />
              {bike.type === 'electric' ? (
                <Zap size={16} className="text-blue-500" />
              ) : (
                <Cog size={16} className="text-gray-500" />
              )}
              <span className="font-medium">Vélib #{bike.id}</span>
              {bike.status === 'maintenance' && (
                <Wrench size={16} className="text-red-500 ml-auto" />
              )}
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <p>Type: {bike.type === 'electric' ? 'Électrique' : 'Mécanique'}</p>
              <p>Distance totale: {bike.kilometers.toFixed(1)} km</p>
              <p>Distance depuis maintenance: {bike.kilometersSinceLastMaintenance.toFixed(1)} km</p>
              {bike.type === 'electric' && bike.batteryLevel !== null && (
                <p>Batterie: {bike.batteryLevel.toFixed(1)}%</p>
              )}
              <p>Dernière maintenance: {bike.lastMaintenance.toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};