import React from "react";

const Subtitle = ({ subtitle }) => {
  // Corrected prop name to 'subtitle'
  return <h3 className="section__subtitle">{subtitle}</h3>; // Changed 'Subtile' to 'subtitle'
};

export default Subtitle;
