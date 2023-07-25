import { useState } from "react";

const MultipleInputs = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [person, setPerson] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [people, setPeople] = useState([]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setPerson({ ...person, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (person.name && person.email && person.password) {
      const newPerson = { ...person, id: new Date().getTime().toString() };
      setPeople([...people, newPerson]);
      setPerson({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div>
      <form className="form">
        <h4>Multiple Inputs</h4>
        {/* name */}
        <div className="form-control">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-input"
            id="name"
            value={person.name}
            name="name"
            onChange={handleChange}
          />
        </div>
        {/* email */}
        <div className="form-control">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-input"
            id="email"
            name="email"
            value={person.email}
            onChange={handleChange}
          />
        </div>
        {/* email */}
        <div className="form-control">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-input"
            id="password"
            name="password"
            value={person.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn" onClick={handleSubmit}>
          submit
        </button>
      </form>

      {people.map((person) => {
        const { id, name, email, password } = person;

        return (
          <div className="item" key={id}>
            <h4>{name}</h4>
            <p>{email}</p>
            <p>{password}</p>
          </div>
        );
      })}
    </div>
  );
};
export default MultipleInputs;
