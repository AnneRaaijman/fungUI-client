import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchedMushroomDetails } from "../../store/mushroom/actions";
import { selectMushroomDetails } from "../../store/mushroom/selectors";
import MushroomDetailsCard from "../../components/MusroomDetailsCard";
export default function MushroomDetails() {
  const mushroom = useSelector(selectMushroomDetails);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchedMushroomDetails(id));
  }, []);
  return (
    <div>
      <MushroomDetailsCard
        key={mushroom.id}
        commonNameEnglish={mushroom.commonNameEnglish}
        image={mushroom.image}
      />{" "}
    </div>
  );
}
