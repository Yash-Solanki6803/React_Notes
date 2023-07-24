import React, { useState } from "react";

const UseStateBasics = () => {
  const [text, setText] = useState("random title");
  const titles = [
    "ffo",
    "baar",
    "asdasd",
    "werw",
    "effa",
    "aefff",
    "dfdff",
    "adfff",
    "assd",
    "qwee",
  ];

  const handleClick = () => {
    const idx = Math.floor(Math.random() * 10);
    setText(titles[idx]);
  };
  return (
    <>
      <h1>{text}</h1>
      <button className="btn" onClick={handleClick}>
        change title
      </button>
    </>
  );
};

export default UseStateBasics;
