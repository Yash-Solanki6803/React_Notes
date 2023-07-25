import { useState } from "react";

const ShortCircuitOverview = () => {
  const [text, setText] = useState("");
  const firstValue = text || "John Doe";
  const secondValue = text && "hello world";

  return (
    <>
      <h1>{firstValue}</h1>
      {text && <h1>Hell World</h1>}
    </>
  );
};
export default ShortCircuitOverview;
