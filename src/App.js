import React, { Component } from 'react';
import './App.css';
import Header from './components/common/Header';
import List from './components/list/List';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <List />
      </div>
    );
  }
}

export default App;
