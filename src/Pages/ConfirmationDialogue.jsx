import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import Slide from "@mui/material/Slide";
import { closeConfirmationDialogue } from "../store/slices/assetManagementSlice";
// import * as actions from "../store/actions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ConfirmDialog(props) {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.assetManagement.open);
  const message = useSelector((state) => state.assetManagement.message);
  //   const BodyText = useSelector((state) => state.loginReducer.ConfirmdialogText);

  const handleClose = () => {
    dispatch(closeConfirmationDialogue());
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{message}</DialogTitle>
        {/* {BodyText && (
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {BodyText}
            </DialogContentText>
          </DialogContent>
        )} */}

        <DialogActions>
          <Button
            color="success"
            onClick={(e) => {
              e.preventDefault();
              handleClose();
              props.agreedAction();
            }}
          >
            Yes
          </Button>
          <Button onClick={handleClose} color="success">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmDialog;
