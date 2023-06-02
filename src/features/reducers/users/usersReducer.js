export const users = (state = [], action) => {
  switch (action.type) {
    case "FETCH_USERS":
      return action.payload;

    case "UPDATE_USERS":
      return state.map((user) =>
        user.publicUID === action.payload.id
          ? { ...user, ...action.payload.data }
          : user
      );

    case "DELETE_USER":
      return state.filter((user) => user.publicUID !== action.payload);

    default:
      return state;
  }
};
