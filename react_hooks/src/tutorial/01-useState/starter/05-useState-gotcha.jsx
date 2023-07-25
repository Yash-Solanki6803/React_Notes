import { useState } from "react";

const UseStateGotcha = () => {
  const [value, setValue] = useState(0);

  const complexIncrease = () => {
    setTimeout(() => {
      setValue((currentState) => {
        return currentState + 1;
      });
    }, 3000);
  };

  return (
    <>
      <section style={{ margin: "4rem 0" }}>
        <h3>Regular Counter</h3>
        <h4>{value}</h4>
        <button className="btn" onClick={() => setValue(value - 1)}>
          decrease
        </button>
        <button className="btn" onClick={() => setValue(0)}>
          reset
        </button>
        <button className="btn" onClick={() => setValue(value + 1)}>
          increase
        </button>
      </section>
      <section style={{ margin: "4rem 0" }}>
        <h3>More complex Counter</h3>
        <h4>{value}</h4>
        <button className="btn" onClick={complexIncrease}>
          Increase Later
        </button>
      </section>
    </>
  );
};

export default UseStateGotcha;
