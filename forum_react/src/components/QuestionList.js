import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios'
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

export default class QuestionList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      stateQuestionId: "",
      questionId: ""

    };

    this.upvoteQuestion = this.upvoteQuestion.bind(this);
    this.downvoteQuestion = this.downvoteQuestion.bind(this);

  }

  upvoteQuestion(id) {
    this.setState({
      stateQuestionId: id
    });
    fetch(`http://localhost:9090/upvoteQuestion/${id}`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log("Upvoted");
        console.log(json);

      })
  }

  downvoteQuestion(id) {
    this.setState({
      stateQuestionId: id
    });
    fetch(`http://localhost:9090/downvoteQuestion/${id}`, {
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log("Downvoted");
        console.log(json);

      })
  }

  render() {

    // Check if the list is empty or not
    if (this.props.questions.length > 0) {
      let list = []
      this.props.questions.forEach((elm) => {
        list.push(<React.Fragment>
          <div className="col-md-12 col-centered" style={{ textAlign: "center" }}>
            <div className="card">
              <div className="card-body">
                <h3><Link to={{ pathname: `/question/${elm._id}`, state: { qid: `${elm._id}` } }}
                  style={{ textDecoration: "none", color: "black" }}>
                  {elm.title}</Link></h3>
                <hr></hr>
                <p>Add text to db schema</p>
                <div className="voteDiv" style={{ textAlign: "left" }}>
                  <form>
                    <button type="submit" onClick={() => this.upvoteQuestion(elm._id)} value={elm._id} className="btn btn-info"><IoIosArrowUp /> </button>
                  </form>
                  <h4>{elm.votes}</h4>
                  <form>
                    <button type="submit" onClick={() => this.downvoteQuestion(elm._id)} value={elm._id} className="btn btn-info"><IoIosArrowDown /> </button>
                  </form>
                </div>
                <h4> tags: {elm.tags} </h4>
              </div> </div> </div>
          <br></br>
        </React.Fragment>);
      });
      return (
        <div>
          <br></br>
          <h3>{this.props.header}</h3>
          {list}
        </div>

      )
    }
    return <div><h1>No data found</h1></div>
  }
}
