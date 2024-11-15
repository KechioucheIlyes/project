import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Bike } from '../types';
import { Bike as BikeIcon, Zap, Cog, Wrench } from 'lucide-react';

const getStatusColor = (status: Bike['status']) => {
  return status === 'available' ? 'text-green-500' : 'text-red-500';
};

export const BikeMarker: React.FC<{ bike: Bike }> = ({ bike }) => {
  const bikeIconSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" 
      stroke="${bike.status === 'available' ? '#22c55e' : '#ef4444'}" 
      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="18.5" cy="17.5" r="3.5"></circle>
      <circle cx="5.5" cy="17.5" r="3.5"></circle>
      <circle cx="15" cy="5" r="1"></circle>
      <path d="M12 17.5V14l-3-3 4-3 2 3h2"></path>
    </svg>
  `;

  const icon = new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(bikeIconSvg)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <Marker position={bike.position} icon={icon}>
      <Popup>
        <div className="p-2">
          <div className="flex items-center gap-2 mb-2">
            <BikeIcon className={getStatusColor(bike.status)} size={20} />
            {bike.type === 'electric' ? (
              <Zap size={16} className="text-blue-500" />
            ) : (
              <Cog size={16} className="text-gray-500" />
            )}
            <span className="font-semibold">Vélib #{bike.id}</span>
            {bike.status === 'maintenance' && (
              <Wrench size={16} className="text-red-500 ml-auto" />
            )}
          </div>
          <div className="space-y-1 text-sm">
            <p>Type: {bike.type === 'electric' ? 'Électrique' : 'Mécanique'}</p>
            <p>Distance totale: {bike.kilometers.toFixed(1)} km</p>
            <p>Distance depuis maintenance: {bike.kilometersSinceLastMaintenance.toFixed(1)} km</p>
            {bike.type === 'electric' && bike.batteryLevel !== null && (
              <p>Niveau de batterie: {bike.batteryLevel.toFixed(1)}%</p>
            )}
            <p>Dernière maintenance: {bike.lastMaintenance.toLocaleDateString()}</p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};
