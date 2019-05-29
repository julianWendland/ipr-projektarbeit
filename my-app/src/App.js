import React from 'react';
import logo from './logo.svg';
import './App.css';


const numbers = [1, 2, 3, 4, 5];

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key = {number.toString()}>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <NumberList numbers= {numbers} />
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
