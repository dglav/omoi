import { useState, useEffect } from "react";

export const useAlignmentResetForMultiLineButton = () => {
  const [labelStyle, setLabelStyle] = useState({});

  useEffect(() => {
    setLabelStyle({
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    });
  }, []);

  return labelStyle;
};
