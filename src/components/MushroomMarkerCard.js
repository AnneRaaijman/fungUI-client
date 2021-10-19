import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function MushroomMarkerCard(props) {
  return (
    <div>
      <h5>
        {props.commonNameEnglish} @ {props.title}
      </h5>
      <img
        src={props.image}
        alt={props.title}
        style={{ display: "block,", maxWidth: " 50%" }}
      />
      <Link to={`/mushroom/${props.id}`}>
        <Button>Look at Mushroom information</Button>
      </Link>
    </div>
  );
}
