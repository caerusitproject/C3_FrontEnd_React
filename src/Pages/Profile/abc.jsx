import React from "react";
import { useEffect } from "react";

const abc = () => {
  const x = {
    abc: 67,
    xyz: 89,
  };

  useEffect(() => {
    //
  }, [x]);

  return <div>abc</div>;
};

export default abc;
