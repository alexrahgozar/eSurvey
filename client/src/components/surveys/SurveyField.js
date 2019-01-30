//  this component renders a single lablel and a text input.
// redux-form watches for anychanges or event from the input component
// or we can write onBlue={input.onBlur} but decided to use the ...input instead!
import React from "react";

export default ({ input, label, meta: { error, touched } }) => {
  // console.log("meta: ", meta);
  return (
    <div>
      <label style={{ fontSize: "22px" }}>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
