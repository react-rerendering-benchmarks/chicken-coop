import React from "react";
const PrimaryButton = props => {
  console.log(window.globalCount++);
  return <button {...props} className={props.className + " btn"}>
      {props?.label}
    </button>;
};
export default PrimaryButton;