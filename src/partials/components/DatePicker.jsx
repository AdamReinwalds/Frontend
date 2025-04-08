import React, { useRef } from "react";
import calendar from "../../assets/images/calendar.svg";

const DatePicker = ({ onChange, dateValue, id, required, placeholder }) => {
  const dateInputRef = useRef(null);

  const handleInputClick = () => {
    dateInputRef.current.showPicker();
  };

  return (
    <div className="date-picker-container" onClick={handleInputClick}>
      <input
        className="date-picker-input"
        ref={dateInputRef}
        onChange={onChange}
        name={id}
        id={id}
        value={dateValue}
        required={required}
        type="date"
      />

      <div>{dateValue || placeholder}</div>
      <img
        className="date-picker-icon"
        src={calendar}
        alt="calendar icon"
        onClick={handleInputClick}
      />
    </div>
  );
};

export default DatePicker;
