import React from "react";

//returns field with label and input
export default ({ input, label, meta: { touched, error } }) => {
  return (
    <div>
      <label>
        {label}
      </label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <p className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </p>
    </div>
  );
};
