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

var Schema = mongoose.Schema;

var Comment = new Schema({
    title: String,
    votes: Number,
    user: String,
})

var Question = new Schema({
    title: String,
    votes: Number,
    comments: [Comment],
    user: String,
    tags: Array
})

var Questions = mongoose.model('Question', Question)


// https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0
app.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            console.log(err)
        }
        res.send(users)
    })
})

//Embeded
app.post("/newQuestion", (req, res, next) => {
    var newQuestion = new Questions(req.body, req.body.votes = 0)
    newQuestion.save(function (err, newQuestion) {
        if (err) {
            return next(err)
        }
        res.json(201, newQuestion);
        console.log("New Question has been added" + newQuestion);
    })
})

// ref
app.get('/questions', (req, res) => {
    Questions.find({}, (err, questions) => {
        if (err) {
            console.log(err)
        }
        res.send(questions)
    })
})
// {$inc: {"votes": 1}},
// Upvote Spørgsmål
app.put("/upvoteQuestion", (req, res, next) => {
    Questions.findOne({
            "_id": mongoose.Types.ObjectId("5cc179181a3cf6f64833ad01")
        },
        async (err, question) => {
            if (err) {
                console.log(err)
                console.log("fejl")
            }

            //{comment.votes = comment.votes + req.body.value}
            console.log(req.body.value)
            question.votes = question.votes + 1
            await question.save()
            res.send(question)
        })
})
// {$inc: {"votes": -1}}
// Downvote Spørgsmål
app.put("/downvoteQuestion", (req, res, next) => {
    Questions.findOne({
            "_id": mongoose.Types.ObjectId("5cc179181a3cf6f64833ad01")
        },
        async (err, question) => {
            if (err) {
                console.log(err)
                console.log("fejl")
            }
            //{comment.votes = comment.votes + req.body.value}


            question.votes = question.votes - 1
            await question.save()
            res.send(question)
        })
})

// Embeded
app.post("/newComment", (req, res, next) => {
    const newComment = {
        "title": req.body.comments.title,
        "votes": req.body.comments.votes,
        "user": req.body.comments.user
    }

    Questions.findOneAndUpdate({
        _id: "5cc179f81a3cf6f64833ad03"
    }, {
        $push: {}
    }, (err, comment) => {
        if (err) {
            console.log(err)
        }
        console.log(comment)
        comment.comments.push(newComment)
        res.send(comment)
    })
})
// Upvote comment by grabbing the id
app.post("/upvoteComment", (req, res) => {

    Questions.findOne({
            "comments._id": "5cc179181a3cf6f64833ad02"
        }, {
            comments: {
                $elemMatch: {
                    _id: "5cc179181a3cf6f64833ad02"
                }
            }
        },
        (err, qComment) => {
            if (err) {
                console.log(err)
                console.log("fejl")
            }
            console.log(qComment)
            qComment.comments[0].votes = qComment.comments[0].votes + 1
            qComment.save()

            res.send(qComment)
        })
})

// Downvote comment by grabbing the id
app.post("/downvoteComment", (req, res) => {

    Questions.findOne({
            "comments._id": "5cbf023bc04f2f8fecb9ddc4"
        }, {
            comments: {
                $elemMatch: {
                    _id: "5cbf023bc04f2f8fecb9ddc4"
                }
            }
        },
        (err, qComment) => {
            if (err) {
                console.log(err)
                console.log("fejl")
            }
            console.log(qComment)
            qComment.comments[0].votes = qComment.comments[0].votes - 1
            qComment.save()

            res.send(qComment)
        })
})

// Add tag to already existing tag
app.post("/addTag", (req, res, next) => {
    //const newTags = [...req.body.tags]
    Questions.findOneAndUpdate({
        _id: "5cc179181a3cf6f64833ad01"
    }, {
        $push: {}
    }, (err, question) => {
        if (err) {
            console.log(err)
        }
        console.log(question)
        question.tags = [...question.tags, ...req.body.tags]
        question.save()
        res.send(question)
    })
})


//ref
/*app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err)
        }
        res.send(comments)
    }).populate("user").populate("question")

}) */



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

app.listen(port, () => console.log(`Forum API running on port ${port}!`));