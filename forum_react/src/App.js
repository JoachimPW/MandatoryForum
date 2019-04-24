import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      comments: []
    };

  }

  componentDidMount() {
    fetch('http://localhost:9090/questions')
        .then(response => response.json())
        .then(data => this.setState({ questions: data }))

   
    //this.getData();
}



  render() {
    let list = []
    this.state.questions.forEach((elm) => {
      list.push(<li>
         <h3> {elm.title}</h3> votes:<h4>{elm.votes}</h4>
      </li>)
  });
    return (
      <div>
      <h1> Forum </h1>      
        {list}
      </div> 
    );
  }
}

export default App;
