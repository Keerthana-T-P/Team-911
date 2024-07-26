// src/GoogleMapComponent.js
import React from 'react';
import { GoogleMap, LoadScript ,Marker} from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function GoogleMapComponent() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCoBlEMQLB8KjARa3vv5fj8jb9MOQHBtms">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  )
}

export default GoogleMapComponent;
