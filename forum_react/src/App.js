import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import QuestionList from './components/QuestionList';
import Question from './components/Question';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import NewQuestion from './components/NewQuestion';
import NewComment from './components/NewComment';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      comments: [],
    };
  }
  componentDidMount() {
    fetch('http://localhost:9090/questions')
      .then(response => response.json())
      .then(data => this.setState({ questions: data }))
  }

  getQuestionFromId(id) {
    return this.state.questions.find((elm) => elm._id === id);
  }

  addQuestion(question) {
    fetch('http://localhost:9090/newQuestion', {
      method: 'POST',
      body: JSON.stringify({
        title: question
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log("Result of posting a new recipe:");
        console.log(json);
      });
  }

  addComment(comment, questionId) {
    fetch(`http://localhost:9090/newComment/${questionId}`, {
      method: 'POST',
      body: JSON.stringify({
        comments: {
        title: comment
      }
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log("Result of posting a new recipe:");
        console.log(json);
      });
  }


  render() {

    return (
      <React.Fragment>
        <Router>
          <div className="container">
            <br></br>
            <h1 style={{ textAlign: "center" }}>The Future Forum</h1>
            <br></br>
            <Switch>
              <Route exact path={"/"}
                render={(props) =>
                  <React.Fragment>
                    <QuestionList {...props}
                      questions={this.state.questions}
                      header={"All Questions"}
                      upvoteQuestion={this.upvoteQuestion}
                    />
                    <NewQuestion {...props} addQuestion={this.addQuestion}></NewQuestion>
                  </React.Fragment>}
              />

              <Route exact path={'/question/:id'}
                render={(props) =>
                  <React.Fragment>
                    <Question {...props}
                      question={this.getQuestionFromId(props.match.params.id)} />
                    <NewComment {...props}
                      questionId={this.getQuestionFromId(props.match.params.id)} addComment={this.addComment}></NewComment>
                  </React.Fragment>}
              />
            </Switch>
          </div>
        </Router>

      </React.Fragment>
    );
  }
}

export default App;
