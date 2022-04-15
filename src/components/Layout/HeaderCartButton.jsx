import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const context = useContext(CartContext);
  const [isHighligtBtn, setIsHighligtBtn] = useState(false);
  const numberOfCartItems = context.totalItemAmount;
  const btnHeaders = `${classes.button} ${isHighligtBtn ? classes.bump : ""}`;

  useEffect(() => {
    if (context.items.length === 0) {
      return;
    }
    setIsHighligtBtn(true);

    const timer = setTimeout(() => {
      setIsHighligtBtn(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [context.items]);

  return (
    <button type="button" className={btnHeaders} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
