import React from "react";
import { Container } from "react-bootstrap";

export default function MushroomMarkerCard(props) {
  return (
    <div>
      <Container>
        <h5>{props.commonNameEnglish}</h5>
        <img
          src={props.image}
          alt={props.commonNameEnglish}
          style={{ display: "block,", maxWidth: " 50%" }}
        />
        <p>Is this fella posionous?</p>
      </Container>
    </div>
  );
}
