import React from "react";

export const AppInput = ({ type, inputLabel, placeholder, ...props }) => {
  return (
    <label>
      {inputLabel}
      <input type={type} placeholder={placeholder} {...props} />
    </label>
  );
};
