import React from "react";
import MapContainer from "./MapContainer";

function VisitedLocations({ height }) {
  return (
    <div
      style={{
        borderRadius: "15px",
        height: "100%",
        overflow: "hidden",
        minHeight: height,
        width: "100%",
      }}
    >
      <MapContainer
        center={{
          lat: 22.572645,
          lng: 88.363892,
        }}
      />
    </div>
  );
}

export default VisitedLocations;
