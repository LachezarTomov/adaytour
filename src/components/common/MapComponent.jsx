import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MapComponent = withScriptjs(withGoogleMap((props) => {
  return <GoogleMap
    zoom={10}
    center={{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) }}
  >
    {props.isMarkerShown && <Marker position={{ lat: parseFloat(props.lat), lng: parseFloat(props.lng) }} />}
  </GoogleMap>
}
))

export default MapComponent;