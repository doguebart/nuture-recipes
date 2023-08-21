import React from "react";

const Input = (props) => {
  const { type, name, value, onChange, multiple, placeholder, className } =
    props;

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      {...(multiple ? { multiple } : null)}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Input;
