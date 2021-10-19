const initialState = {
  loading: true,
  all: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "observations/fetched":
      return { loading: false, all: action.payload };
    default:
      return state;
  }
};
