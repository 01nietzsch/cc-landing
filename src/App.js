import React, { useState } from "react";
import "./App.css";
import LightNode from "./LightNode"; // Import the LightNode component

function App() {
  const metals = [
    "fe",
    "c",
    "mn",
    "si",
    "cr",
    "ni",
    "mo",
    "v",
    "n",
    "nb",
    "co",
    "w",
    "al",
    "ti",
  ];
  const [values, setValues] = useState(Array(metals.length).fill(""));
  const [resultModel1, setResultModel1] = useState("");
  const [resultModel2, setResultModel2] = useState("");
  const [resultModel3, setResultModel3] = useState(""); // State for third model

  const handleChange = (index, event) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
  };

  // Function to fill random values that sum to 1
  const fillRandomValues = () => {
    const randomValues = Array(metals.length)
      .fill(0)
      .map(() => Math.random());
    const sum = randomValues.reduce((acc, val) => acc + val, 0);
    const normalizedValues = randomValues.map((val) => (val / sum).toFixed(2)); // Normalize to sum to 1
    setValues(normalizedValues);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://git.heroku.com/coding-challenge2.git/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ values }),
        }
      );
      const data = await response.json();
      setResultModel1(data.prediction_model1);
      setResultModel2(data.prediction_model2);
      setResultModel3(data.prediction_model3); // Set result for third model
    } catch (error) {
      console.error("Error fetching predictions:", error);
      setResultModel1("Error occurred while fetching predictions.");
      setResultModel2("");
      setResultModel3("");
    }
  };

  return (
    <div className="App relative">
      {/* Header Section */}
      <header className="header">
        <div className="header-left">
          <h1 className="team-name">Coding Challenge 2025</h1>
        </div>
        {/* <div className="header-right">
          <button
            className="doc-button"
            onClick={() =>
              window.open("https://your-documentation-link.com", "_blank")
            }
          >
            Documentation
          </button>
        </div> */}
      </header>

      {/* Light Nodes */}
      <LightNode position="top-left" />
      <LightNode position="bottom-right" />

      {/* Main Content */}
      <div className="form-container">
        {metals.map((metal, index) => (
          <div key={index}>
            <label>{metal.toUpperCase()} (%)</label>
            <input
              type="number"
              value={values[index]}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
        ))}
      </div>

      <div className="button-container">
        <button onClick={fillRandomValues}>Fill Random Values</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {resultModel1 && (
        <div className="result">
          <p>Yield Strength: {resultModel1} MPa</p>
        </div>
      )}
      {resultModel2 && (
        <div className="result">
          <p>Tensile Strength: {resultModel2} MPa</p>
        </div>
      )}
      {resultModel3 && (
        <div className="result">
          <p>Elongation: {resultModel3}</p>
        </div>
      )}
      {/* <div className="final-paragraph">
        <p>
          Finally, with our algorithms trained, we were able to apply them to a
          randomly generated data set of potential steels and select the
          strongest steels, with the least amount of Co and Ni in their
          compositions.
        </p>
        <img src="image1" alt="image1" />
        <img src="./public/image2.png" alt="image2" />
        <img src="/public/image3.png" alt="image3" />
      </div> */}
    </div>
  );
}

export default App;
