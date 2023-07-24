import { useState } from "react";
import { data } from "../../../data";

const UseStateArray = () => {
  const [people, setPeople] = useState(data);

  let id_count = 4;
  const firstNames = ["Yash", "Yogesh", "Harsh", "Rahul"];

  const lastNames = ["Solanki", "Shah", "Desai", "Patel"];

  const addPerson = () => {
    const idx1 = Math.floor(Math.random() * 4);
    const idx2 = Math.floor(Math.random() * 4);

    const arr = [...people];
    arr.push({
      id: ++id_count,
      name: `${firstNames[idx1]} ${lastNames[idx2]}`,
    });

    setPeople(arr);
  };

  const removeItem = (id) => {
    const newPeople = people.filter((person) => person.id !== id);
    setPeople(newPeople);
  };

  return (
    <>
      {people.map((person) => {
        const { id, name } = person;
        return (
          <div key={id} className="item">
            <h4>{name}</h4>
            <button
              onClick={() => {
                removeItem(id);
              }}
            >
              Remove
            </button>
          </div>
        );
      })}

      <button className="btn" onClick={addPerson}>
        Add items
      </button>
    </>
  );
};

export default UseStateArray;
