import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CandidateFeed from './components/CandidateFeed'
import Controller from './controller'
import Header from './components/Header'


class App extends Component {
  state = {
    candidates: [],
  }
  async componentDidMount() {
    let all_candidates = await Controller.getCandidates();
    this.setState({
      candidates: all_candidates
    })
  }
  render() {
    return (
      <main className="App">
          <Header/>
          <CandidateFeed candidates={this.state.candidates}/>
      </main>
    );
  }
}

export default App;
