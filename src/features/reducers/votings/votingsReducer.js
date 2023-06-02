export const votings = (state = [], action) => {
  switch (action.type) {
    case "FETCH_VOTINGS":
      return action.payload;

    case "ADD_VOTINGS":
      const allId = state.map((item) => item._id);
      if (!allId.includes(action.payload._id)) {
        return [...state, action.payload];
      }

    case "UPDATE_VOTINGS":
      return state.map((item) =>
        item._id === action.payload._id ? { ...item, ...action.payload } : item
      );

    case "DELETE_VOTING":
      return state.filter((item) => item._id !== action.payload);

    default:
      return state;
  }
};
