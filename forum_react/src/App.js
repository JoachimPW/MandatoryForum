import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import QuestionList from './components/QuestionList';

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
   
    return (
      <Router>
        <div className ="container">
          <h1>The future forum</h1>

          <Switch>
              <Route exact path={"/"}
                render={(props) => 
                <React.Fragment>
                  <QuestionList {...props}
                  questions={this.state.questions} 
                  header= {"All Questions"} />
                </React.Fragment>}  
                />
          </Switch>
          </div>
      </Router>     
      
    );
  }
}

export default App;
