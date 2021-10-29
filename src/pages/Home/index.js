import React, { useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchMushrooms } from "../../store/mushroom/actions";
import "./index.css";

import ObservationForm from "../../components/Home/ObservationForm";
import { fetchedMushrooms } from "../../store/mushroom/selectors";

export default function Home() {
  const dispatch = useDispatch();
  const mushrooms = useSelector(fetchedMushrooms);
  // console.log("mushrooms", mushrooms);

  useEffect(() => {
    dispatch(fetchMushrooms());
  }, [dispatch]);

  return (
    <div className="mainBackground">
      {!mushrooms[0] ? (
        "Loading.."
      ) : (
        <Carousel className="carousel">
          <Carousel.Item className="carouselImage">
            <img
              className="d-block w-100"
              src="https://i.ibb.co/xqTgtsW/Black-and-White-Modern-Vintage-Pharmacy-Back-to-Business-Landscape-Banner.png"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item className="carouselImage">
            <img
              className="d-block w-100"
              src={mushrooms[1].image}
              alt="Second slide"
            />

            <Carousel.Caption className="carouselCaption">
              <h3>Use the form below to add your observations to our map!</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="carouselImage">
            <img
              className="d-block w-100"
              src={mushrooms[2].image}
              alt="Third slide"
            />

            <Carousel.Caption className="carouselCaption">
              <h3>
                {" "}
                Or open the map above to start looking for mushrooms yourself!
              </h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      )}
      <div>
        <ObservationForm />
      </div>
    </div>
  );
}
