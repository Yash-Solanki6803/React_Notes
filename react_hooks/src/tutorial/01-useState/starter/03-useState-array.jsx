import { useState } from "react";
// import { data } from "../../../data";

const UseStateArray = () => {
  //states
  // const [person, setPerson] = useState({
  //   firstName: "",
  //   lastName: "",
  //   id: "",
  // });
  const [people, setPeople] = useState([]);

  //Random name Array
  const firstNames = ["Yash", "Yogesh", "Harsh", "Rahul"];
  const lastNames = ["Solanki", "Shah", "Desai", "Patel"];

  //Function is generate a Random Name
  const getName = () => {
    const idx1 = Math.floor(Math.random() * 4);
    const idx2 = Math.floor(Math.random() * 4);

    const name1 = firstNames[idx1];
    const name2 = lastNames[idx2];

    return {
      firstName: name1,
      lastName: name2,
      id: new Date().getTime().toString(),
    };
  };

  //Function to push the Name into people State
  const addPerson = () => {
    console.log("addPerson called");

    const newName = getName();
    console.log(newName);

    // setPerson(newName);
    // console.log(person);

    setPeople([...people, newName]);
    console.log(people);
  };

  //Remove Person from the people array
  const removeItem = (id) => {
    //only keep the people with ID different than id.
    const newPeople = people.filter((person) => person.id !== id);
    setPeople(newPeople);
  };

  return (
    <>
      {people.map((person) => {
        const { id, firstName, lastName } = person;
        return (
          <div key={id} className="item">
            <h4>
              {firstName} {lastName}
            </h4>

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
