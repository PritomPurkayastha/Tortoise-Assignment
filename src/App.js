import { useMemo, useState } from "react";
import "./App.css";
import Timer from "./Components/Timer";
import BestTime from "./Components/BestTime";

function App() {
  const [input, setInput] = useState("");

  const [miliSeconds, setMiliSeconds] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [result, setResult] = useState(null);

  //! Generating Random Character
  function generateRandomLetter() {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return possible.charAt(Math.floor(Math.random() * possible.length));
  }

  let randomCharacter = useMemo(() => {
    return generateRandomLetter();
  }, [input]);

  //! conditionally changing the className to change the style when the player wins or loses.
  let className;
  if (result === true) {
    className = "success";
  } else if (result === false) {
    className = "failure";
  } else {
    className = "alphabetArea";
  }

  return (
    <div className="App">
      <div className="info">
        <h1 className="text">Type The Alphabet</h1>
        <h3 className="text">
          Typing game to test how fast you type. Time starts when you do :)
        </h3>
      </div>
      <div className={className}>
        {result === true
          ? "Success!"
          : result === false
          ? "Failure"
          : randomCharacter}
      </div>
      <div className="timer">
        <Timer
          miliSeconds={miliSeconds}
          setMiliSeconds={setMiliSeconds}
          seconds={seconds}
          setSeconds={setSeconds}
          timerOn={timerOn}
          setTimerOn={setTimerOn}
        />
      </div>
      <div className="timer">
        <BestTime/>
      </div>
      <div className="input">
        <input
          type="text"
          value={input}
          className="inputField"
          onClick={() => {
            if (!timerOn && input.length === 0) {
              setTimerOn(true);
            }
          }}
          onKeyPress={(event) => {
            if (
              event.key !== randomCharacter &&
              event.key !== "Shift" &&
              input.length < 20
            ) {
              setMiliSeconds(miliSeconds + 500);
            }
            if (input.length === 19) {
              setTimerOn(false);

              let bestTimeSec = localStorage.getItem("seconds");
              let bestTimeMs = localStorage.getItem("miliSeconds");

              if (bestTimeSec === null && bestTimeMs === null) {
                //! Success will be displayed if the player runs the game for the 1st time
                localStorage.setItem("seconds", seconds);
                localStorage.setItem("miliSeconds", miliSeconds);
                setResult(true);
              } else if (parseInt(bestTimeSec) > seconds) {
                localStorage.setItem("seconds", seconds);
                localStorage.setItem("miliSeconds", miliSeconds);
                setResult(true);
              } else if (
                parseInt(bestTimeSec) === seconds &&
                parseInt(bestTimeMs) > miliSeconds
              ) {
                localStorage.setItem("seconds", seconds);
                localStorage.setItem("miliSeconds", miliSeconds);
                setResult(true);
              } else {
                setResult(false);
              }
            }
          }}
          onChange={(event) => {
            if (input.length < 20) {
              setInput(event.target.value);
            }
          }}
        />
        <button
          className="button"
          onClick={() => {
            setTimerOn(false);
            setInput("");
            setSeconds(0);
            setMiliSeconds(0);
            setResult(null);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
