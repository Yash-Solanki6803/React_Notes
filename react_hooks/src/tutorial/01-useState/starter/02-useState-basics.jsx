import React, { useState } from "react";

const titles = [
  "Oyy",
  "Hii",
  "Hello",
  "Bonjour",
  "Kem Cho",
  "Tiger Zinda Hai",
  "Nikel lodian",
  "Brrr",
  "Sync Error",
  "Khatammm",
];

export const random_array = titles;

const UseStateBasics = () => {
  const [text, setText] = useState("random title");

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
