import arrondissementGeoJSON from './../data/arrondissements-ile-de-france.json';
import { Feature, FeatureCollection, MultiPolygon } from 'geojson';

// Typage des données GeoJSON pour gérer les MultiPolygons
const arrondissementFeatureCollection = arrondissementGeoJSON as FeatureCollection;

// Vérification de la présence de coordonnées
const allArrondissementCoordinates = arrondissementFeatureCollection.features.map(
  (feature) => feature?.geometry?.coordinates
);

// Vérification que nous avons des données
if (!allArrondissementCoordinates || allArrondissementCoordinates.length === 0) {
  throw new Error("Aucune coordonnée trouvée pour les arrondissements.");
}

// Création du GeoJSON pour Paris Métropole avec tous les polygones
export const parisMetropoleGeoJSON: Feature<MultiPolygon> = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "MultiPolygon",
    coordinates: allArrondissementCoordinates, // Utilisation de toutes les coordonnées des arrondissements
  },
};
