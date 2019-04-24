const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()
const app = express();
app.use(bodyParser.json());
var mongoose = require('mongoose')
const checkJwt = require('express-jwt'); // Check for access tokens automatically
const morgan = require('morgan'); // Log all HTTP requests to the console
const bcrypt = require('bcrypt'); // Used for hashing passwords!

/****** Configuration *****/
const port = (process.env.PORT || 9090);
if (!process.env.JWT_SECRET) {
    console.error('You need to put a secret in the JWT_SECRET env variable!');
    process.exit(1);
}

// Additional headers to avoid triggering CORS security errors in the browser
// Read more: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        // respond with 200
        console.log("Allowing OPTIONS");
        res.sendStatus(200);
    } else {
        // move on
        next();
    }
});

// dbUrl i .env fil
mongoose.connect(process.env.dbUrl, (err) => {
    console.log('mongo db connection status: ', err)
})

// Opretter alle modeller til databasen

var User = mongoose.model("User", {
    username: String,
    password: String
})

var Comment = mongoose.model("Comment", {
    title: String,
    commentVotes: Number,
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

var Question = mongoose.model("Question", {
    title: String,
    votes: Number,
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})
var Schema = mongoose.Schema;

var Kommentar = new Schema({
    title: String,
    votes: Number,
    user: String
})

var QuestionComment2 = new Schema({
    title: String,
    votes: Number,
    comments: [Kommentar],
    user: String
})

var QuestionComment = mongoose.model('QQuestion', QuestionComment2)


// https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0
app.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            console.log(err)
        }
        res.send(users)
    })
})

// ref
app.get('/questions', (req, res) => {
    Question.find({}, (err, questions) => {
        if (err) {
            console.log(err)
        }
        res.send(questions)
    }).populate("users");

})

// Embeded
app.post("/newcomment", (req, res, next) => {
    const nyComment = {"title": req.body.comments.title, "votes": req.body.comments.votes, "user": req.body.comments.user}
    
    QuestionComment.findOneAndUpdate({_id: "5cbf023bc04f2f8fecb9ddc2"}, 
    {$push: {}}, (err, comment) => {
        if (err) {
        console.log(err) }
        console.log(comment)
        comment.comments.push(nyComment)
        res.send(comment)
    })       
})

app.post("/deleteComment", (req, res, next) => {
    QuestionComment.findByIdAndDelete({_id: { $in: comments} 
})

//ref
app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err)
        }
        res.send(comments)
    }).populate("user").populate("question")

})

//Embeded
app.post("/newQuestionComment", (req, res, next) => {
    var newQuestionComment = new QuestionComment(req.body)
    newQuestionComment.save(function (err, newQuestionComment) {
        if (err) {
            return next(err)
        }
        res.json(201, newQuestionComment);
        console.log("Ny QuestionComment er tilføjet" + newQuestionComment);
    })
})


// post ny user
app.post('/newUser', (req, res, next) => {
    var newUser = new User(req.body)
    newUser.save(function (err, newUser) {
        if (err) {
            return next(err)
        }
        res.json(201, newUser);
        console.log("Ny User er tilføjet:" + newUser);
    })
})

app.post('/newComment', (req, res, next) => {
    var newComment = new Comment(req.body)
    newComment.commentVotes = 0;
    newComment.user = "5cab205ff9fdc7aa4cbdecb8"
    newComment.question = "5cab267c2e0372a57407338e"

    newComment.save(function (err, newComment) {
        if (err) {
            return next(err)
        }
        Comment.find({})
            .populate("user").populate("question")
            .exec(function (err, users) {
                if (err) console.log(err);
                else console.log(users);
            })
        res.json(201, newComment);
        console.log("Ny kommentar er tilføjet: " + newComment);
    })
})

app.post('/newQuestion', (req, res, next) => {
    var newQuestion = new Question(req.body)
    newQuestion.votes = 0;
    newQuestion.save(function (err, newQuestion) {
        if (err) {
            return next(err)
        }
        res.json(201, newQuestion);
        console.log("Nyt spørgsmål er tilføjet: " + newQuestion);
    })
})


app.listen(port, () => console.log(`Cooking API running on port ${port}!`));