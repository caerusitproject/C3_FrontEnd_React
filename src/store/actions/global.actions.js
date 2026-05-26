export const snackbarOpen = (data) => {
  return (dispatch) => {
    dispatch({
      type: "OPEN_SNACKBAR",
      payload: { message: data.message, status: data.status },
    });
  };
};

export const snackbarClose = (data) => {
  return (dispatch) => {
    dispatch({
      type: "CLOSE_SNACKBAR",
      payload: { message: data.message, status: data.status },
    });
  };
};
