import { useState } from "react";
import classes from "./Counter.module.scss";

export const Counter = () => {
  const [count, setCount] = useState(0);
  const onClick = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <span>{count}</span>
      <button onClick={onClick} className={classes.button}>
        +
      </button>
    </div>
  );
};
