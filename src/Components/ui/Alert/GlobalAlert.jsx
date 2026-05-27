import { useDispatch, useSelector } from "react-redux";
import { hideAlert } from "../../../store/slices/alertSlice";
import { Alert } from "./Alert";

export function GlobalAlert() {
  const dispatch = useDispatch();
  const { open, type, title, message } = useSelector((s) => s.alert);

  return (
    <Alert
      floating
      visible={open}
      intent={type}
      title={title}
      message={message}
      autoClose
      autoCloseDuration={3500}
      onDismiss={() => dispatch(hideAlert())}
    />
  );
}
