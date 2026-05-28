import React from "react";
import {
  useTheme,
  useGlobalTokens,
} from "../../context/ThemeContext";

export default function Footer() {
const theme = useTheme();
  return (
    <></>
    // <footer className="h-[35px] flex items-center justify-center border-t bg-white text-sm text-gray-500">
    //   © {new Date().getFullYear()} C3 Design System
    // </footer>
  );
}