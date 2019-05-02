import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios'
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdArrowForward } from "react-icons/io";

export default class QuestionList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      stateQuestionId: "",
      questionId: "",
      user: "",
      loggedIn: true


    };

    this.upvoteQuestion = this.upvoteQuestion.bind(this);
    this.downvoteQuestion = this.downvoteQuestion.bind(this);

  }

  upvoteQuestion(id, event) {
    event.preventDefault()
    this.setState({
      stateQuestionId: id
    });
    fetch(`https://wiberg-forum.herokuapp.com/upvoteQuestion/${id}`, {
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
    fetch(`https://wiberg-forum.herokuapp.com/downvoteQuestion/${id}`, {
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
          <div className="row justify-content-md-center">
            <div className="col-md-10 col-centered" style={{ textAlign: "center" }}>
              <div className="card">
                <div className="card-body">
                  <h3><Link to={{ pathname: `/question/${elm._id}`, state: { qid: `${elm._id}` } }}
                    style={{ textDecoration: "none", color: "black" }}>
                    {elm.title}<IoMdArrowForward></IoMdArrowForward></Link></h3>
                  <hr></hr>
                  <div className="gridContainer">
                    <div className="voteDiv" style={{ textAlign: "left" }}>
                      <form>
                        <button type="submit" onClick={() => this.upvoteQuestion(elm._id)} value={elm._id} className="btn btn-info"><IoIosArrowUp /> </button>
                      </form>
                      <h4>{elm.votes}</h4>
                      <form>
                        <button type="submit" onClick={() => this.downvoteQuestion(elm._id)} value={elm._id} className="btn btn-info"><IoIosArrowDown /> </button>
                      </form>
                    </div>
                    <div className="textBlock">
                      <p>{elm.text}</p>
                    </div>
                  </div>


                  <h4> tags: {elm.tags} </h4>
                  <p>Asked by: {elm.user}</p>
                </div> </div> </div> </div>
          <br></br>
        </React.Fragment>);
      });
      return (
        <div>
          <br></br>
          <h3 style={{ textAlign: "center" }}>{this.props.header}</h3>
          <br></br>
          {list}
        </div>

      )
    }
  
    return <div><h1>No data found</h1></div>
  }
}
