import React, { useCallback, useEffect, useState } from "react";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Marker,
  Pin,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { mapStyles } from "./mapStyles";
import pin from "../assets/pin.png";
import carPin from "../assets/carPin.png";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from "react-google-places-autocomplete";
function MapContainer({ center, zoom, markersLocations = [], navigateFrom }) {
  const map = useMap();
  const [show, setShow] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const fitBounds = useCallback(() => {
    const bounds = map?.getBounds();
    if (!bounds) return;
    if (map && markersLocations.length) {
      markersLocations.forEach((marker) => bounds?.extend(marker));
      if (navigateFrom) {
        bounds?.extend(navigateFrom);
      }
      bounds?.extend(center); // Include the center point in the bounds
      map?.fitBounds(bounds);
    } else if (navigateFrom) {
      bounds?.extend(navigateFrom);
      map?.fitBounds(bounds);
    }
  }, [markersLocations, map, center]);

  useEffect(() => {
    fitBounds();
  }, [markersLocations, map, loaded, navigateFrom]);
  useEffect(() => {
    fitBounds();

    setTimeout(() => {
      setShow(true);
    }, 2000);
  }, []);

  if (show)
    return (
      <>
        <APIProvider apiKey={"AIzaSyCrkT383kr0odCNYNvNULUcWn9B_wmOIYE"}>
          <Map
            defaultCenter={center}
            defaultZoom={zoom || 15}
            styles={mapStyles}
            scaleControl={false}
            zoomControl={false}
            streetViewControl={false}
            fullscreenControl={false}
            mapTypeControl={false}
          >
            <Marker position={center} icon={pin} animation={"BOUNCE"} />
            <Marker position={navigateFrom} icon={pin} animation={"BOUNCE"} />
            <Directions origin={navigateFrom} destination={center} />

            {markersLocations.map((marker, index) => (
              <Marker
                key={index}
                position={marker}
                icon={carPin}
                clickable={true}
                onClick={() => {
                  map.panTo(marker);
                }}
              />
            ))}
          </Map>
        </APIProvider>
      </>
    );
  else
    return (
      <div className="d-none">
        <GooglePlacesAutocomplete
          apiKey="AIzaSyCrkT383kr0odCNYNvNULUcWn9B_wmOIYE"
          componentRestrictions={{ country: "in" }}
          debounce={300}
        />
      </div>
    );
}

export default MapContainer;

function Directions({ origin, destination }) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(
      new routesLibrary.DirectionsRenderer({
        map,
        markerOptions: {
          visible: false,
        },
        polylineOptions: {
          strokeColor: "#000000",
          strokeWeight: 5,
        },
      })
    );
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: origin,
        destination: destination,
        travelMode: "DRIVING",
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div
      className="position-absolute text-white p-3"
      style={{
        top: 50,
        right: 10,
        background: "rgba(0,0,0,0.9)",
        borderRadius: "10px",
        fontSize: "12px",
      }}
    >
      <p className="m-0">Distance: {leg?.distance?.text}</p>
      ETA: {leg?.duration?.text}
    </div>
  );
}
