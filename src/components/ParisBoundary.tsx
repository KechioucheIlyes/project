import React from 'react';
import { GeoJSON } from 'react-leaflet';
import { parisMetropoleGeoJSON } from '../data/parisMetropole';

export const ParisBoundary: React.FC = () => {
  return (
    <>
      <GeoJSON
        data={parisMetropoleGeoJSON}
        pathOptions={{
          color: 'red',
          weight: 1,
          fillOpacity: 0.1,
          fillColor: 'red'
        }}
      />

    </>
  );
};