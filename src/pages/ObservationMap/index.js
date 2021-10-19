import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import L, { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MushroomMarkerCard from "../../components/MushroomMarkerCard";
import { fetchObservations } from "../../store/observations/actions";
import { fetchedObservations } from "../../store/observations/selectors";
import "./index.css";

const coords = [52.3881, 4.824];

const shroomIcon = new Icon({
  iconUrl: "https://pics.clipartpng.com/Red_Mushroom_PNG_Clipart-1193.png",
  iconSize: [25, 25],
});

export default function ObservationMap() {
  const observations = useSelector(fetchedObservations);
  const dispatch = useDispatch();
  // const observationLocation = [observations.latitude, observations.longitude];
  // console.log("location?", observationLocation);

  console.log("observations?", observations);

  useEffect(() => {
    dispatch(fetchObservations());
  }, []);

  return (
    <MapContainer id="mapid2" center={coords} zoom={14} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {observations.map((observation) => {
        return (
          <Marker
            key={observation.id}
            position={[observation.latitude, observation.longitude]}
            icon={shroomIcon}
          >
            <Popup>
              <MushroomMarkerCard
                key={observation.id}
                id={observation.id}
                commonNameEnglish={observation.mushroom.commonNameEnglish}
                title={observation.title}
                image={observation.image}
              />
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

// <option key={observation.id} value={mushroom.id}>
//   {mushroom.commonNameEnglish}
// </option>
