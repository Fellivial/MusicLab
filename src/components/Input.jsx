import React from 'react';

const Input = ({ id, ...props }) => {
  return (
    <input
      id={id}
      className="bg-white rounded-lg text-black focus:outline-none focus:ring-1 focus:ring-black"
      {...props}
    />
  );
};

export default Input;

const TextArea = ({ id, label, placeholder, value, ...props }) => {
  return (
    <>
      {label && <label>{label}</label>}
      <textarea
        id={id}
        className="textarea textarea-bordered"
        placeholder={placeholder}
        value={value}
        {...props}
      />
    </>
  );
};

export { Input, TextArea };
