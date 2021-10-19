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
import { Container } from "react-bootstrap";

const coords = [52.3881, 4.824];

const shroomIcon = new Icon({
  iconUrl: "https://pics.clipartpng.com/Red_Mushroom_PNG_Clipart-1193.png",
  iconSize: [25, 25],
});
const poisonousIcon = new Icon({
  iconUrl:
    "https://i.ibb.co/F3P2XJC/transparent-violet-mushroom-purple-pink-magenta-5da0dc22959de6-7385818915708232026128.png",
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

  // const poisonousMushrooms = observations.filter((observation) => {
  //   return observation.mushroom.isPoisonous === true;
  // });

  // console.log("poisonous?", poisonousMushrooms);

  return (
    <Container>
      <MapContainer
        id="mapid2"
        center={coords}
        zoom={14}
        scrollWheelZoom={false}
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
        {observations.map((observation) => {
          return (
            <Marker
              key={observation.id}
              position={[observation.latitude, observation.longitude]}
              icon={
                observation.mushroom.isPoisonous ? poisonousIcon : shroomIcon
              }
            >
              <Popup>
                <MushroomMarkerCard
                  key={observation.id}
                  id={observation.id}
                  commonNameEnglish={observation.mushroom.commonNameEnglish}
                  title={observation.title}
                  image={observation.image}
                  mushroomId={observation.mushroomId}
                />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </Container>
  );
}

// <option key={observation.id} value={mushroom.id}>
//   {mushroom.commonNameEnglish}
// </option>
