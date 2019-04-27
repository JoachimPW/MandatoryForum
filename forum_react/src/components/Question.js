import React, { Component } from 'react'
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        this.upvoteComment = this.upvoteComment.bind(this);
        this.downvoteComment = this.downvoteComment.bind(this);
    }

    upvoteComment(id) {
        fetch(`http://localhost:9090/upvoteComment/${id}`, {
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

    downvoteComment(id) {
        fetch(`http://localhost:9090/downvoteComment/${id}`, {
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

        let question = this.props.question;
       
        let list = []

        if (this.props.question) {
            question.comments.forEach((elm) => {
                list.push(<React.Fragment>
                    <div className="row justify-content-md-center">
                        <div className="col-md-8 col-centered" style={{ textAlign: "center" }}>
                            <div className="card">
                                <div className="card-body">
                                    <p style={{ textAlign: "center" }}>{elm.title}</p>
                                    <div className="voteDiv" style={{ textAlign: "left" }}>
                                        <form>
                                            <button type="submit" onClick={() => this.upvoteComment(elm._id)} value={elm._id} className="btn btn-info"><IoIosArrowUp /> </button>
                                        </form>
                                        <h4>{elm.votes}</h4>
                                        <form>
                                            <button type="submit" onClick={() => this.downvoteComment(elm._id)} value={elm._id} className="btn btn-info"><IoIosArrowDown /> </button>
                                        </form>
                                    </div>
                                    <h4> tags: {elm.tags} </h4>
                                    <p>Asked by: {elm.user}</p>
                                </div> </div> </div></div>
                    <br></br>
                </React.Fragment>
                );
            })
        }
        else {
            return (
                <h1> Ingen data </h1 >
            )
        }
        return (
            <div>
                <h1>{question.title}</h1>
                <p>Posted by: {question.user}</p>
                <br></br>
                <h2 style={{ textAlign: "center" }}>Answers</h2>
                <br></br>
                {list}
            </div >
        )
    }
}
