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
import { IoIosArrowRoundBack } from "react-icons/io";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      comments: [],
      user: "",
      authErr: "",
      loggedIn: false
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }
  componentDidMount() {
    if (!localStorage.getItem("user")) {
      localStorage.setItem("user", "")
      let loggedInStorage = localStorage.getItem("user")
    }


    fetch('https://wiberg-forum.herokuapp.com/express/questions')
      .then(response => response.json())
      .then(data => this.setState({ questions: data }))
  }

  getQuestionFromId(id) {
    return this.state.questions.find((elm) => elm._id === id);
  }

  addQuestion(question, text) {
    fetch('http://localhost:9090/newQuestion', {
      method: 'POST',
      body: JSON.stringify({
        title: question,
        text: text,
        user: localStorage.getItem("user")
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

  handleLogin(event) {
    if (this.state.user.length === 0) {
      event.preventDefault()
      this.setState({
        authErr: "Fill in a username to continue"
      })
    }
    else {
      localStorage.setItem("user", this.state.user)
      this.setState({
        loggedIn: true
      })
    }
  }

  handleLogout(event) {
    if(localStorage.getItem("user").length > 0) {      
      this.setState ({
        loggedIn: false
      })
      localStorage.setItem("user", "")
    }
  }

  onChangeUser(event) {
    this.setState({
      user: event.target.value
    });
  }

  render() {

    if (!localStorage.getItem("user")) {
      return (
        <div className="wrapper">
          <form className="form-singin">
            <h2 className="form-signin-heading">Login</h2>
            <input type="text" onChange={this.onChangeUser} className="form-control loginInput" placeholder="Username"></input>
            <p style={{ color: "red" }}>{this.state.authErr}</p>
            <button onClick={this.handleLogin} className="btn btn-lg btn-primary btn-block">Login</button>
          </form>
        </div>
      )
    }

    return (
      <React.Fragment>
        <div>
          <a href="/"><IoIosArrowRoundBack style={{fontSize:"36px"}}></IoIosArrowRoundBack>Back</a>
        </div>
        <div style={{textAlign:"right"}}>
          <h4>Logged in as {localStorage.getItem("user")}</h4>
          <a href="/"><button onClick={this.handleLogout} className ="btn btn-primary">Logout</button></a>
        </div>
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
