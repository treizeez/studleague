export const theme = (state = localStorage.getItem("theme"), action) => {
  switch (action.type) {
    case "SET_THEME":
      return action.payload;

    default:
      return state;
  }
};
