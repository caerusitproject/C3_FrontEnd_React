import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { Alert } from "../../Components/ui/Alert/Alert";

import { hideAlert } from "../../store/slices/alertSlice";

export default function GlobalAlert() {
  const dispatch = useDispatch();

  const alert = useSelector((state) => state.alert);

  return (
    <Alert
      floating
      visible={alert.open}
      intent={alert.type}
      title={alert.title}
      message={alert.message}
      autoClose
      autoCloseDuration={5000}
      onDismiss={() => dispatch(hideAlert())}
    />
  );
}