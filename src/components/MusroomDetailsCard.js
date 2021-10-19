import React from "react";
import { Container, Card } from "react-bootstrap";

export default function MushroomMarkerCard(props) {
  return (
    <div>
      <Container>
        <h4>The {props.scientificName}</h4>
        <p> More commonly known as</p>
        <h4>{props.commonNameEnglish}</h4>

        <img
          src={props.image}
          alt={props.commonNameEnglish}
          style={{ display: "block,", maxWidth: " 50%" }}
        />
        <h4>Safety Information:</h4>
        {props.isPoisonous ? (
          <p>Do NOT eat or TOUCH this mushroom</p>
        ) : (
          <p>
            This mushroom is not known to be poisonous. However, when picking
            your own mushrooms, it is advised to be extra ordinarily cautious!
          </p>
        )}
      </Container>
    </div>
  );
}
