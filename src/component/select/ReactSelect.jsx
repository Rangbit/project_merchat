import React from "react";
import Select from "react-select";

export default function ReactSelect({
  inputId,
  placeholder,
  options,
  value,
  onChange,
  isDisabled,
}) {
  return (
    <Select
      closeMenuOnSelect={true}
      isDisabled={isDisabled}
      isClearable={true}
      isSearchable={true}
      instanceId={inputId}
      inputId={inputId}
      name={inputId}
      placeholder={placeholder}
      isMulti={false}
      options={options}
      value={value}
      onChange={onChange}
    />
  );
}
