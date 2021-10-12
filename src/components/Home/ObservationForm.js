import React, { useState } from "react";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import { fetchedMushrooms } from "../../store/mushroom/selectors";

export default function ObservationForm() {
  const mushrooms = useSelector(fetchedMushrooms);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const uploadImage = () => {
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
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h1 className="mt-5 mb-5">Add a new Observation!</h1>
        <Form.Group controlId="formBasicMushroom">
          <select class="form-select" aria-label="Default select example">
            <option selected>Select a mushroom</option>
            {mushrooms.map((mushroom) => {
              return (
                <option value={mushroom.id}>
                  {mushroom.commonNameEnglish}
                </option>
              );
            })}
          </select>
        </Form.Group>
        <Form.Group controlId="formBasicPicture">
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <Button onClick={uploadImage}>Upload</Button>
          <div>
            <p>Uploaded image will be displayed here</p>
            <img src={url} alt="preview" />
          </div>
        </Form.Group>
      </Form>
    </Container>
  );
}
