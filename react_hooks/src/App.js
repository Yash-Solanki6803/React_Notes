import RandomTitle from "./tutorial//01-useState/starter/02-useState-basics";
import RandomUsers from "./tutorial/01-useState/starter/03-useState-array";
import RandomMessage from "./tutorial/01-useState/starter/04-useState-object";
import Counter from "./tutorial/01-useState/starter/05-useState-gotcha";
import WindowSize from "./tutorial/02-useEffect/starter/02-useEffect-basics";
import DoubleState from "./tutorial/02-useEffect/starter/03-multiple-effects";
import FetchProfile from "./tutorial/02-useEffect/starter/04-fetch-data";
import ToggleShow from "./tutorial/03-conditional-rendering/starter/06-toggle-challenge";
import Form from "./tutorial/06-forms/starter/03-multiple-inputs";

function App() {
  return (
    <>
      <div className="container">
        <RandomTitle />
      </div>
      <div className="container">
        <RandomUsers />
      </div>
      <div className="container">
        <RandomMessage />
      </div>
      <div className="container">
        <Counter />
      </div>
      <div className="container">
        <WindowSize />
      </div>
      <div className="container">
        <DoubleState />
      </div>
      <div className="container">
        <FetchProfile />
      </div>
      <div className="container">
        <ToggleShow />
      </div>
      <div className="container">
        <Form />
      </div>
    </>
  );
}

export default App;
