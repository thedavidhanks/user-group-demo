
import React from "react";

const FormElement = ({ label, forId, children, hide }) => {
  const displayed = hide ? 'none' : 'block'
  return (
    <div className="form-element" style={{display: displayed}}>
      <label htmlFor={forId}>{label}</label>
      <div>{children}</div>
    </div>
  )
};

export default FormElement;