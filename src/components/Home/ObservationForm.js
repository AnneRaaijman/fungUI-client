import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Form, Button, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Map from "../Map/Map";
import { fetchedMushrooms } from "../../store/mushroom/selectors";
import { fetchedParks } from "../../store/park/selectors";
import { postObservation } from "../../store/observations/actions";
import "./ObservationForm.css";
import "react-datepicker/dist/react-datepicker.css";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ObservationForm() {
  // const state = getState();
  // console.log("state", state);
  const dispatch = useDispatch();
  //select parks from database for dropdown selection
  const parks = useSelector(fetchedParks);
  console.log("parks", parks);
  //select mushrooms from database for dropdown selection
  const mushrooms = useSelector(fetchedMushrooms);

  // set states from form for making mushroom observation
  const [parkId, setParkId] = useState("");
  const [mushroomId, setMushroomId] = useState(0);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [coords, setCoords] = useState([52.386702, 4.876364]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [observationTime, setObservationTime] = useState(new Date());

  function submitForm(event) {
    event.preventDefault();
    // uploadImage();

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "img_fungui");
    data.append("cloud_name", "fungui");
    fetch("https://api.cloudinary.com/v1_1/fungui/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        dispatch(
          postObservation({
            parkId,
            observationTime,
            url: data.url,
            latitude,
            longitude,
            mushroomId,
          })
        );
      })
      .catch((err) => console.log(err));
  }

  console.log("lat?", latitude);
  console.log("long?", longitude);

  return (
    <Container
      style={{ backgroundColor: "#589a4a", border: "3px solid black" }}
    >
      <Form md={{ span: 6, offset: 3 }} className="mt-5, mb-5">
        <h1 className="formContainer">Add a new Observation!</h1>
        <Row>
          <Col>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>What park did you find this mushroom?</Form.Label>
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(event) => setParkId(event.target.value)}
                value={parkId}
              >
                <option value={0}>--- Which park did you go? ----</option>
                {parks.map((park) => {
                  return (
                    <option key={park.id} value={park.id}>
                      {park.parkName}
                    </option>
                  );
                })}
              </select>
            </Form.Group>
            <Form.Group className="mt-10 mb-5" controlId="formBasicMushroom">
              <Form.Label>Select the mushroom you saw </Form.Label>
              <select
                class="form-select"
                aria-label="Default select example"
                onChange={(event) => setMushroomId(event.target.value)}
                value={mushroomId}
              >
                <option value={0}>--- Pick a mushroom type ----</option>
                {mushrooms.map((mushroom) => {
                  return (
                    <option key={mushroom.id} value={mushroom.id}>
                      {mushroom.commonNameEnglish}
                    </option>
                  );
                })}
              </select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> When did you see it?</Form.Label>
              <DatePicker
                value={observationTime}
                selected={observationTime}
                onChange={(date) => setObservationTime(date)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPicture">
              <Form.Label> Upload your picture here!</Form.Label>

              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <div>
                <p>Uploaded image will be displayed here</p>
                <img src={url} alt="preview" style={{ maxHeight: "400px" }} />
              </div>
            </Form.Group>
            <Form.Group className="mt-5">
              <Button variat="primary" type="submit" onClick={submitForm}>
                Add Observation to Map!
              </Button>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label class="text-succes">
                Click on the map to Place your mushroom!
              </Form.Label>
              <Map
                selectedPosition={coords}
                isEventDetail={false}
                setCoords={setCoords}
                setLatitude={setLatitude}
                setLongitude={setLongitude}
              ></Map>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
