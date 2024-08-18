import React from "react";

const MainHeader = ({ children, className }) => {
  const classes = `text-4xl font-semibold ${className}`;
  return <h1 className={classes}>{children}</h1>;
};

export default MainHeader;
