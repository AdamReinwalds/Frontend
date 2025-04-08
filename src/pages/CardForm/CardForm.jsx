import React from "react";
import "./CardForm.css";
import LogotypeLink from "../../partials/components/LogotypeLink";

const CardForm = ({
  heading,
  inputs,
  submitText,
  onSubmit,
  checkbox,
  cardFooterHtml,
}) => {
  const inputsHtml = inputs.map((input) => (
    <div key={input.id} className="cardForm__inputWrapper">
      <label className="cardForm__label" htmlFor={input.id}>
        {input.label}
      </label>
      <input
        value={input.value}
        id={input.id}
        onChange={input.onChange}
        className="cardForm__input"
        type={input.type}
        placeholder={input.placeholder}
      />
    </div>
  ));

  return (
    <div className="cardForm__container">
      <div className="cardForm__card">
        <h1 className="cardForm__heading">{heading}</h1>
        <div className="cardForm__body">
          <form className="cardForm__form" onSubmit={onSubmit}>
            <div className="cardForm__inputsContainer">{inputsHtml}</div>
            {/* {checkbox && (
              <div className="cardForm__checkboxWrapper">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="cardForm__checkbox"
                  checked={checkbox.checked}
                  onChange={checkbox.onChange}
                />
                <label htmlFor="rememberMe" className="cardForm__label">
                  Remember me
                </label>
              </div>
            )} */}
            <button type="submit">{submitText}</button>
          </form>
          <div className="cardForm__cardFooter">{cardFooterHtml}</div>
        </div>
      </div>
      <div className="cardForm__footer">
        <LogotypeLink />
      </div>
    </div>
  );
};

export default CardForm;
