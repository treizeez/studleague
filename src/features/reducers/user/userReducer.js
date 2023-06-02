export const user = (
  state = JSON.parse(localStorage.getItem("user")),
  action
) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;

    case "RESET_USER":
      return null;

    default:
      return state;
  }
};
