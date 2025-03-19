"use client";
// components/Alert.js
import { useEffect } from "react";

const Alert = () => {
  useEffect(() => {
    alert("This is a school project and NOT the real Wellcome website. \n \nThis is only used for displaying the school project");
  }, []);

  return null;
};

export default Alert;
