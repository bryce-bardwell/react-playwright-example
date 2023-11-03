import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [colour, setColour] = useState("");

  useEffect(() => { document.body.style.backgroundColor = colour }, [colour])

  const handleClick = () => {
    let hex_string = (Math.random() * 0xfffff * 1000000).toString(16);
    let colour_hex = '#' + hex_string.slice(0, 6);

    setColour(colour_hex);
  };

  return (
    <div className="App">
      <h1 className="page-header"> Insanely Creative React App </h1>
      <img src={logo} className="App-logo" alt="logo" />
      <p className="description"> Click the button to change the background colour. </p>
      <button className="bg-button" id="bg-button" onClick={handleClick}> Change background colour </button>
    </div>
  );
}

export default App;
