import React from 'react';
import { GeoJSON } from 'react-leaflet';
import { parisMetropoleGeoJSON } from '../data/parisMetropole';

export const ParisBoundary: React.FC = () => {
  return (
    <>
      <GeoJSON
        data={parisMetropoleGeoJSON}
        pathOptions={{
          color: '#3b82f6',
          weight: 1,
          fillOpacity: 0.1,
          fillColor: '#3b82f6'
        }}
      />

    </>
  );
};