import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMushrooms } from "../../store/mushroom/actions";
import ObservationForm from "../../components/Home/ObservationForm";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMushrooms());
  }, []);

  return (
    <div>
      <ObservationForm />
    </div>
  );
}
