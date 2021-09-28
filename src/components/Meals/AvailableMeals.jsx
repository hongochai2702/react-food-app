import React, { useMemo } from "react";
import { DUMMY_MEALS } from "./dummy-meals";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const mealsItems = useMemo(
    () => DUMMY_MEALS.map((meal) => <MealItem key={meal.id} {...meal} />),
    []
  );

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsItems}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
