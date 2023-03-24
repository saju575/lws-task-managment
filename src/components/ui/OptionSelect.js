import React from "react";

const OptionSelect = ({ htmlFor, options, defaultOption, label, ...rest }) => {
  return (
    <div className="fieldContainer">
      <label htmlFor={htmlFor}>{label}</label>
      <select {...rest}>
        <option value="" hidden>
          {defaultOption}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OptionSelect;
