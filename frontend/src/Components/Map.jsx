import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React, { useState, useEffect } from 'react';

const Map = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  
  // Static charging station data (this will be replaced with API data later)
  const chargingStations = [
    {
      id: 1,
      name: "EV Station 1",
      position: {
        lat:12.845030,
        lng: 80.133637
      },
      available: true
    },
    {
      id: 2,
      name: "EV Station 2",
      position: {
        lat: 12.835639,
        lng: 80.154895 
      },
      available: false
    },
    {
      id: 3,
      name: "EV Station 3",
      position: {
        lat: 40.7138,
        lng: -74.0048
      },
      available: true
    }
  ];

  // Container style for the map
  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  // Default center position (fallback if geolocation fails)
  const defaultCenter = {
    lat: 40.7128,
    lng: -74.0060
  };

  useEffect(() => {
    // Get user's current position with high accuracy
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        options
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyBBwZm07xk0_e82GeopVeuDd0YDm7ymdys">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition || defaultCenter}
        zoom={15}
      >
        {/* User's current location marker */}
        {currentPosition && (
          <Marker
            position={currentPosition}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#4285F4',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            }}
          />
        )}

        {/* Charging station markers */}
        {chargingStations.map((station) => (
          <Marker
            key={station.id}
            position={station.position}
            title={station.name}
            icon={{
              url: station.available 
                ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
            }}
            onClick={() => {
              alert(`${station.name}\nAvailable: ${station.available ? 'Yes' : 'No'}`);
            }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
