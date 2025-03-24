import React, { useState, useEffect } from "react";
import "./App.css"; // Import CSS for styling

const Calculator = () => {
  const [display, setDisplay] = useState("0");

  // Load last displayed number on page reload
  useEffect(() => {
    const savedValue = localStorage.getItem("calculatorDisplay");
    if (savedValue) {
      setDisplay(savedValue);
    }
  }, []);

  // Save the current display value to localStorage
  useEffect(() => {
    localStorage.setItem("calculatorDisplay", display);
  }, [display]);

  // Handle button clicks
  const handleClick = (value) => {
    if (value === "C") {
      setDisplay("0");
    } else if (value === "=") {
      try {
        setDisplay(eval(display).toString()); // Evaluate the expression
      } catch {
        setDisplay("Error");
      }
    } else {
      setDisplay(display === "0" ? value : display + value);
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        {[
          "7", "8", "9", "/", 
          "4", "5", "6", "x", 
          "1", "2", "3", "-", 
          "0", ".", "=", "+", 
          "C"
        ].map((key) => (
          <button
            key={key}
            className={`btn ${
              key.match(/[0-9.]/) ? "number" :
              key.match(/[+\-x/=]/) ? "operator" : "other"
            }`}
            onClick={() => handleClick(key.replace("x", "*"))} // Replace 'x' with '*' for eval()
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
