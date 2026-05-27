import React from "react";

export default function Footer() {
  return (
    <footer className="h-[50px] flex items-center justify-center border-t bg-white text-sm text-gray-500">
      © {new Date().getFullYear()} C3 Design System
    </footer>
  );
}