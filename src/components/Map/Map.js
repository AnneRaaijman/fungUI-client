import React, { useState, useEffect } from "react";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "./Map.css";
// import { markerPosition } from "../../store/map/actions";

const shroomIcon = new Icon({
  iconUrl: "https://pics.clipartpng.com/Red_Mushroom_PNG_Clipart-1193.png",
  iconSize: [25, 25],
});

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

// Create a functional component that will handle the layer where events will happen (and also that marker get printed)
export default function Map(props) {
  const [initialPosition, setInitialPosition] = useState([52.386702, 4.876364]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
      console.log("initialPosition", initialPosition);
    });
  }, []);

  const Markers = () => {
    useMapEvents({
      click(e) {
        props.setCoords([e.latlng.lat, e.latlng.lng]);
        props.setLatitude(e.latlng.lat);
        props.setLongitude(e.latlng.lng);
      },
    });

    return (
      props.selectedPosition && (
        <Marker
          key={props.selectedPosition[0]}
          position={props.selectedPosition}
          interactive={false}
          icon={shroomIcon}
        ></Marker>
      )
    );
  };

  return (
    <div>
      <MapContainer
        id="mapid"
        center={initialPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <ChangeView center={props.selectedPosition} zoom={13} />
        <Markers />
        <TileLayer
          url={
            "https://{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token={accessToken}"
          }
          attribution={
            '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
          accessToken={
            "ubARfEgYw6uacBazXZHj4JCpeSmFpmcjDCb7fY7XJNZ4KcpVYuA3EHvqklsmLAgm"
          }
        />
      </MapContainer>
    </div>
  );
}
