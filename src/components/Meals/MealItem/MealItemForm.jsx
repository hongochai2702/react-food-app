import React, { useCallback, useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const amountInputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);
  const onSubmitForm = useCallback(
    (ev) => {
      ev.preventDefault();
      setAmountIsValid(true);

      const amountEntered = amountInputRef.current.value;
      const amountNumber = +amountEntered;

      if (
        amountEntered.trim().length === 0 ||
        amountNumber < 1 ||
        amountNumber > 5
      ) {
        setAmountIsValid(false);
        return;
      }

      console.log(amountInputRef.current.value);
      props.onAddToCart(amountEntered);
    },
    [props]
  );

  return (
    <form className={classes.form} onSubmit={onSubmitForm}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: `amount_${props.id}`,
          type: "number",
          min: "1",
          max: "10",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
