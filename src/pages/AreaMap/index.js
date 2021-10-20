import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import L, { Icon } from "leaflet";
import { fetchParks } from "../../store/park/actions";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
  Popup,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";
import { fetchedParks } from "../../store/park/selectors";

import { Container } from "react-bootstrap";

export default function AreaMap() {
  const dispatch = useDispatch();
  const parks = useSelector(fetchedParks);
  const redOptions = { color: "green" };
  useEffect(() => {
    dispatch(fetchParks());
  }, []);

  return (
    <Container>
      <MapContainer
        id="areamap"
        center={[52.3881, 4.824]}
        zoom={13}
        scrollWheelZoom={true}
      >
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
        {parks.map((park) => {
          return (
            <Circle
              center={[park.latitude, park.longitude]}
              pathOptions={redOptions}
              radius={400}
            >
              <Popup>Popup in CircleMarker</Popup>
            </Circle>
          );
        })}
      </MapContainer>
    </Container>
  );
}
