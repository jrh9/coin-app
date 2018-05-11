import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/common/Header';
import List from './components/list/List';
import NotFound from './components/notfound/NotFound';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />

          <Switch>
            <Route path="/" component={List} exact />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
