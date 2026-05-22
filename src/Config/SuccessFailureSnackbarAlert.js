import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import * as actions from "../stores/actions";
import { closeSnackbar } from "../store/slices/globalSlice";

export default function SuccessFailureSnackbar() {
  const dispatch = useDispatch();
  const { message, status, open } = useSelector(
    (state) => state.global.snackbar,
  );
  const vertical = "top",
    horizontal = "right";
  // const [open, setOpen] = React.useState(false);

  // const handleClose = (event, reason) => {
  //   // "clickaway" means user clicked outside → usually you ignore that
  //   if (reason === "clickaway") return;
  //   setOpen(false);
  // };

  console.log("this is snackbar__", message);

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => {
          dispatch(closeSnackbar({ message: "", status: "" }));
        }}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={() => {
            dispatch(closeSnackbar({ message: "", status: "" }));
          }}
          severity={status}
          // variant='outlined'
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
