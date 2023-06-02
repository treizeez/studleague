export const ref = (state = [], action) => {
  switch (action.type) {
    case "FETCH_REFS":
      return action.payload;

    default:
      return state;
  }
};
