import React, { Component } from 'react'
import NewComment from './NewComment';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleUpvoteComment(e, id) {
        e.preventDefault()
        this.props.upvoteComment(id)
    }

    handleDownvoteComment(e, id) {
        e.preventDefault()
        this.props.downvoteComment(id)
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
                                    <div className="gridContainer">
                                        <div className="voteDiv" style={{ textAlign: "left" }}>
                                            <form>
                                                <button onClick={ e => this.handleUpvoteComment(e, elm._id)} value={elm._id} className="btn btn-info"><IoIosArrowUp /> </button>
                                            </form>
                                            <h4>{elm.votes}</h4>
                                            <form>
                                                <button onClick={ e => this.handleDownvoteComment(e, elm._id)} value={elm._id} className="btn btn-info"><IoIosArrowDown /> </button>
                                            </form>
                                        </div>
                                        <div className="textBlock">
                                            <p style={{ textAlign: "center" }}>{elm.title}</p>                                            
                                        </div>

                                    </div>
                                    <p style={{ textAlign: "center" }}>Answered by: {elm.user}</p>

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
            <React.Fragment>
                <div className="row justify-content-md-center">
                    <div className="col-md-10 col-centered" style={{ textAlign: "center" }}>
                        <div className="card" style={{ padding: "25px" }}>
                            <div className="card-body">
                                <h3>{question.title}</h3>                                
                                <hr></hr>
                                <p style={{ paddingLeft: "75px", paddingRight: "75px" }}>{question.text}</p>
                            </div></div></div></div>
                <div>
                    <br></br>
                    <h2 style={{ textAlign: "center" }}>Answers</h2>
                    {list}
                </div >                
            </React.Fragment>
        )

    }
}
