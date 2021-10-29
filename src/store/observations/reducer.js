const initialState = {
  loading: true,
  all: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case "observations/fetched":
      return { loading: false, all: action.payload };
    default:
      return state;
  }
};
