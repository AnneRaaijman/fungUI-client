import axios from "axios";

export const fetchObservations = () => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get("http://localhost:4000/observations");
      dispatch({ type: "observations/fetched", payload: res.data });
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const postObservation = (
  title,
  observationTime,
  url,
  latitude,
  longitude,
  mushroomId
) => {
  return async (dispatch, getState) => {
    try {
      const reduxState = getState();
      //   const token = reduxState.user.token;
      const userId = reduxState.user.id;
      console.log("state?", reduxState);
      const res = await axios.post(
        "http://localhost:4000/observations",
        {
          title,
          observationTime,
          url,
          latitude,
          longitude,
          mushroomId,
          userId,
        }
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
      );
      // dispatch(showMessageWithTimeout("success", true, "Auction Created"));
    } catch (e) {
      console.log(e.message);
    }
  };
};
