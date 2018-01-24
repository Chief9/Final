const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const MovieDB = require('moviedb')('ef3c702b020d9110c4259e6b862555f7');
const session = require('express-session')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.use(session({
    secret: "secreto",
    resave: true,
    saveUninitialized: false

}))

app.set('view engine', 'pug')

app.post("/Search", (req, results) => {

    var word = req.body.name
    MovieDB.searchMovie({ query: word, page: "1" }, (err, res) => {
        var movies = res.results
        for (var i = 0; i < 1; i++) {
            if (movies != 0) {
                var movies1 = movies[0]
            } else {
                var movies1 = {
                    title: 'not found',
                    original_title: 'not found',
                    overview: 'please try again',
                    poster_path: "/e9QDfK4ChiUa8gekyg54cMqA3Uo.jpg"
                }
            }

        }
        results.render("compare", { movies: movies1 })
    })

})

app.post("/back", (req, results) => {
    results.render("index")
})

app.post("/go", (req, results) => {
    MovieDB.genreMovies({ id: req.body.movieID }, (err, res) => {
        let movieDbCallsArray = []
        for (var i = 0; i < res.results.length; i++) {

            movieDbCallsArray.push(movieDbReviewPromise(res.results[i].id))
        }
        Promise.all(movieDbCallsArray).then((allTheResults) => {
                var commentsID = []
                var comments
                for (var j = 0; j < allTheResults.length; j++) {
                    comments += allTheResults[j].content
                    commentsID.push([allTheResults[j].content, allTheResults[j].id])

                }
                var display = count(comments)
                var sortable = [];
                for (var words in display) {
                    sortable.push([words, display[words]]);
                }

                sortable.sort(function(a, b) {
                    return b[1] - a[1];
                });
                console.log("backend", sortable)
                var leftButton = sortable[0].splice(0, 1)
                var rightButton = sortable[1].splice(0, 1)
                req.session.data = res.results
                req.session.CID = commentsID
                results.render("filter", {
                    sortable: sortable,
                    all: res.results,
                    commentsID: commentsID,
                    leftButton: leftButton,
                    rightButton: rightButton
                })
            })
            .catch((e) => {
                throw e
            })

        function movieDbReviewPromise(id) {

            return new Promise(function(resolve, reject) {
                MovieDB.movieReviews({ id: id }, (err, res) => {
                    if (err) reject(err)
                    if (res.results != 0) {
                        resolve({ content: res.results[0].content, id: id })
                    } else {
                        resolve({ content: "", id: id })
                    }
                })
            })
        }

        function count(sentence) {
            var list = sentence.replace(/[^a-zA-Z ]/g, "").toLowerCase().split(' ')
            var words = {}
        for (var i = 0; i < list.length; i++) {
            if (!(words.hasOwnProperty(list[i])) && list[i] !== "the" && !(words.hasOwnProperty(list[i])) && list[i] !== "and" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "a" && !(words.hasOwnProperty(list[i])) && list[i] !== "that" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "i" && !(words.hasOwnProperty(list[i])) && list[i] !== "it" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "not" && !(words.hasOwnProperty(list[i])) && list[i] !== "he" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "as" && !(words.hasOwnProperty(list[i])) && list[i] !== "you" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "this" && !(words.hasOwnProperty(list[i])) && list[i] !== "but" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "his" && !(words.hasOwnProperty(list[i])) && list[i] !== "they" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "or" && !(words.hasOwnProperty(list[i])) && list[i] !== "an" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "will" && !(words.hasOwnProperty(list[i])) && list[i] !== "he" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "one" && !(words.hasOwnProperty(list[i])) && list[i] !== "my" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "all" && !(words.hasOwnProperty(list[i])) && list[i] !== "would" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "there" && !(words.hasOwnProperty(list[i])) && list[i] !== "their" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "to" && !(words.hasOwnProperty(list[i])) && list[i] !== "of" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "in" && !(words.hasOwnProperty(list[i])) && list[i] !== "for" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "on" && !(words.hasOwnProperty(list[i])) && list[i] !== "with" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "at" && !(words.hasOwnProperty(list[i])) && list[i] !== "early" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "from" && !(words.hasOwnProperty(list[i])) && list[i] !== "by" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "up" && !(words.hasOwnProperty(list[i])) && list[i] !== "about" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "into" && !(words.hasOwnProperty(list[i])) && list[i] !== "" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "after" && !(words.hasOwnProperty(list[i])) && list[i] !== "over" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "new" && !(words.hasOwnProperty(list[i])) && list[i] !== "good" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "last" && !(words.hasOwnProperty(list[i])) && list[i] !== "first" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "great" && !(words.hasOwnProperty(list[i])) && list[i] !== "long" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "own" && !(words.hasOwnProperty(list[i])) && list[i] !== "little" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "old" && !(words.hasOwnProperty(list[i])) && list[i] !== "other" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "big" && !(words.hasOwnProperty(list[i])) && list[i] !== "right" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "high" && !(words.hasOwnProperty(list[i])) && list[i] !== "small" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "be" && !(words.hasOwnProperty(list[i])) && list[i] !== "have" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "do" && !(words.hasOwnProperty(list[i])) && list[i] !== "we" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "say" && !(words.hasOwnProperty(list[i])) && list[i] !== "she" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "her" && !(words.hasOwnProperty(list[i])) && list[i] !== "what" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "so" && !(words.hasOwnProperty(list[i])) && list[i] !== "out" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "if" && !(words.hasOwnProperty(list[i])) && list[i] !== "who" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "get" && !(words.hasOwnProperty(list[i])) && list[i] !== "which" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "go" && !(words.hasOwnProperty(list[i])) && list[i] !== "me" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "when" && !(words.hasOwnProperty(list[i])) && list[i] !== "make" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "can" && !(words.hasOwnProperty(list[i])) && list[i] !== "like" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "no" && !(words.hasOwnProperty(list[i])) && list[i] !== "just" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "him" && !(words.hasOwnProperty(list[i])) && list[i] !== "know" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "take" && !(words.hasOwnProperty(list[i])) && list[i] !== "year" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "your" && !(words.hasOwnProperty(list[i])) && list[i] !== "some" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "could" && !(words.hasOwnProperty(list[i])) && list[i] !== "see" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "them" && !(words.hasOwnProperty(list[i])) && list[i] !== "than" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "then" && !(words.hasOwnProperty(list[i])) && list[i] !== "now" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "look" && !(words.hasOwnProperty(list[i])) && list[i] !== "only" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "come" && !(words.hasOwnProperty(list[i])) && list[i] !== "any" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "think" && !(words.hasOwnProperty(list[i])) && list[i] !== "its" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "also" && !(words.hasOwnProperty(list[i])) && list[i] !== "back" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "use" && !(words.hasOwnProperty(list[i])) && list[i] !== "two" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "how" && !(words.hasOwnProperty(list[i])) && list[i] !== "our" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "even" && !(words.hasOwnProperty(list[i])) && list[i] !== "want" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "because" && !(words.hasOwnProperty(list[i])) && list[i] !== "these" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "give" && !(words.hasOwnProperty(list[i])) && list[i] !== "most" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "us" && !(words.hasOwnProperty(list[i])) && list[i] !== "ask" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "try" && !(words.hasOwnProperty(list[i])) && list[i] !== "few" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "is" && !(words.hasOwnProperty(list[i])) && list[i] !== "was" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "film" && !(words.hasOwnProperty(list[i])) && list[i] !== "movie" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "more" && !(words.hasOwnProperty(list[i])) && list[i] !== "has" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "watch" && !(words.hasOwnProperty(list[i])) && list[i] !== "are" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "were" && !(words.hasOwnProperty(list[i])) && list[i] !== "had" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "never" && !(words.hasOwnProperty(list[i])) && list[i] !== "theres" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "kind" && !(words.hasOwnProperty(list[i])) && list[i] !== "really" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "such" && !(words.hasOwnProperty(list[i])) && list[i] !== "while" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "story" && !(words.hasOwnProperty(list[i])) && list[i] !== "lead" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "strong" && !(words.hasOwnProperty(list[i])) && list[i] !== "everyone" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "particulary" && !(words.hasOwnProperty(list[i])) && list[i] !== "those" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "very" && !(words.hasOwnProperty(list[i])) && list[i] !== "surely" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "both" && !(words.hasOwnProperty(list[i])) && list[i] !== "scenes" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "theme" && !(words.hasOwnProperty(list[i])) && list[i] !== "fifty" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "watching" && !(words.hasOwnProperty(list[i])) && list[i] !== "shades" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "been" && !(words.hasOwnProperty(list[i])) && list[i] !== "watched" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "thats" && !(words.hasOwnProperty(list[i])) && list[i] !== "another" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "wont" && !(words.hasOwnProperty(list[i])) && list[i] !== "average" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "large" && !(words.hasOwnProperty(list[i])) && list[i] !== "next") {
                words[list[i]] = 0;
            }
            ++words[list[i]];
        }
            return words;
        }


    })

})



app.post("/PostLeft", (req, results) => {

    console.log("left", req.body.leftB)
    var left = req.body.leftB
    var bannedW = []
    bannedW.push(req.body.leftB)
    bannedW.push(req.body.removedID)
    var commentsID = req.session.CID
    var Data = req.session.data
    var removedID = []
    var comments = ""
    /*    console.log(Data[0].id ,"data")*/
    /*    console.log(commentsID, "data", commentsID.length)*/

    for (var i = 0; i < bannedW.length; i++) {
        for (var j = 0; j < commentsID.length; j++) {
            if (!(commentsID[j][0].match(bannedW[i]))) {
                removedID.push(commentsID[j][1])
                console.log("check", commentsID[j][1], bannedW[i])
                commentsID.splice(j, j)

            } else {
                comments += commentsID[j][0]
            }
        }
    }
    for (var i = 0; i < removedID.length; i++) {
        for (var j = 0; j < Data.length; j++) {
            if (removedID[i] == Data[j].id) {
                Data[j].poster_path = ""


            }

        }
    }

    function count(sentence) {
        var list = sentence.replace(/[^a-zA-Z ]/g, "").toLowerCase().split(' ')
        var words = {}
        for (var i = 0; i < list.length; i++) {
            if (!(words.hasOwnProperty(list[i])) && list[i] !== "the" && !(words.hasOwnProperty(list[i])) && list[i] !== "and" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "a" && !(words.hasOwnProperty(list[i])) && list[i] !== "that" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "i" && !(words.hasOwnProperty(list[i])) && list[i] !== "it" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "not" && !(words.hasOwnProperty(list[i])) && list[i] !== "he" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "as" && !(words.hasOwnProperty(list[i])) && list[i] !== "you" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "this" && !(words.hasOwnProperty(list[i])) && list[i] !== "but" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "his" && !(words.hasOwnProperty(list[i])) && list[i] !== "they" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "or" && !(words.hasOwnProperty(list[i])) && list[i] !== "an" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "will" && !(words.hasOwnProperty(list[i])) && list[i] !== "he" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "one" && !(words.hasOwnProperty(list[i])) && list[i] !== "my" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "all" && !(words.hasOwnProperty(list[i])) && list[i] !== "would" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "there" && !(words.hasOwnProperty(list[i])) && list[i] !== "their" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "to" && !(words.hasOwnProperty(list[i])) && list[i] !== "of" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "in" && !(words.hasOwnProperty(list[i])) && list[i] !== "for" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "on" && !(words.hasOwnProperty(list[i])) && list[i] !== "with" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "at" && !(words.hasOwnProperty(list[i])) && list[i] !== "early" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "from" && !(words.hasOwnProperty(list[i])) && list[i] !== "by" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "up" && !(words.hasOwnProperty(list[i])) && list[i] !== "about" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "into" && !(words.hasOwnProperty(list[i])) && list[i] !== "" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "after" && !(words.hasOwnProperty(list[i])) && list[i] !== "over" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "new" && !(words.hasOwnProperty(list[i])) && list[i] !== "good" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "last" && !(words.hasOwnProperty(list[i])) && list[i] !== "first" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "great" && !(words.hasOwnProperty(list[i])) && list[i] !== "long" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "own" && !(words.hasOwnProperty(list[i])) && list[i] !== "little" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "old" && !(words.hasOwnProperty(list[i])) && list[i] !== "other" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "big" && !(words.hasOwnProperty(list[i])) && list[i] !== "right" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "high" && !(words.hasOwnProperty(list[i])) && list[i] !== "small" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "be" && !(words.hasOwnProperty(list[i])) && list[i] !== "have" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "do" && !(words.hasOwnProperty(list[i])) && list[i] !== "we" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "say" && !(words.hasOwnProperty(list[i])) && list[i] !== "she" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "her" && !(words.hasOwnProperty(list[i])) && list[i] !== "what" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "so" && !(words.hasOwnProperty(list[i])) && list[i] !== "out" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "if" && !(words.hasOwnProperty(list[i])) && list[i] !== "who" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "get" && !(words.hasOwnProperty(list[i])) && list[i] !== "which" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "go" && !(words.hasOwnProperty(list[i])) && list[i] !== "me" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "when" && !(words.hasOwnProperty(list[i])) && list[i] !== "make" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "can" && !(words.hasOwnProperty(list[i])) && list[i] !== "like" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "no" && !(words.hasOwnProperty(list[i])) && list[i] !== "just" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "him" && !(words.hasOwnProperty(list[i])) && list[i] !== "know" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "take" && !(words.hasOwnProperty(list[i])) && list[i] !== "year" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "your" && !(words.hasOwnProperty(list[i])) && list[i] !== "some" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "could" && !(words.hasOwnProperty(list[i])) && list[i] !== "see" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "them" && !(words.hasOwnProperty(list[i])) && list[i] !== "than" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "then" && !(words.hasOwnProperty(list[i])) && list[i] !== "now" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "look" && !(words.hasOwnProperty(list[i])) && list[i] !== "only" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "come" && !(words.hasOwnProperty(list[i])) && list[i] !== "any" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "think" && !(words.hasOwnProperty(list[i])) && list[i] !== "its" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "also" && !(words.hasOwnProperty(list[i])) && list[i] !== "back" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "use" && !(words.hasOwnProperty(list[i])) && list[i] !== "two" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "how" && !(words.hasOwnProperty(list[i])) && list[i] !== "our" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "even" && !(words.hasOwnProperty(list[i])) && list[i] !== "want" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "because" && !(words.hasOwnProperty(list[i])) && list[i] !== "these" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "give" && !(words.hasOwnProperty(list[i])) && list[i] !== "most" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "us" && !(words.hasOwnProperty(list[i])) && list[i] !== "ask" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "try" && !(words.hasOwnProperty(list[i])) && list[i] !== "few" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "is" && !(words.hasOwnProperty(list[i])) && list[i] !== "was" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "film" && !(words.hasOwnProperty(list[i])) && list[i] !== "movie" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "more" && !(words.hasOwnProperty(list[i])) && list[i] !== "has" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "watch" && !(words.hasOwnProperty(list[i])) && list[i] !== "are" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "were" && !(words.hasOwnProperty(list[i])) && list[i] !== "had" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "never" && !(words.hasOwnProperty(list[i])) && list[i] !== "theres" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "kind" && !(words.hasOwnProperty(list[i])) && list[i] !== "really" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "such" && !(words.hasOwnProperty(list[i])) && list[i] !== "while" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "story" && !(words.hasOwnProperty(list[i])) && list[i] !== "lead" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "strong" && !(words.hasOwnProperty(list[i])) && list[i] !== "everyone" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "particulary" && !(words.hasOwnProperty(list[i])) && list[i] !== "those" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "very" && !(words.hasOwnProperty(list[i])) && list[i] !== "surely" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "both" && !(words.hasOwnProperty(list[i])) && list[i] !== "scenes" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "theme" && !(words.hasOwnProperty(list[i])) && list[i] !== "fifty" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "watching" && !(words.hasOwnProperty(list[i])) && list[i] !== "shades" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "been" && !(words.hasOwnProperty(list[i])) && list[i] !== "watched" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "thats" && !(words.hasOwnProperty(list[i])) && list[i] !== "another" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "wont" && !(words.hasOwnProperty(list[i])) && list[i] !== "average" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "large" && !(words.hasOwnProperty(list[i])) && list[i] !== "next") {
                words[list[i]] = 0;
            }
            ++words[list[i]];
        }
        return words;
    }

    var display = count(comments)
    var sortable = [];
    for (var words in display) {
        sortable.push([words, display[words]]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    for (var i = 0; i < sortable.length; i++) {
        if (sortable[i][1] === NaN) {
            console.log(sortable[i])
            sortable.splice(i, i)
        }
    }

    var leftButton = sortable[0].splice(0, 1)
    var rightButton = sortable[1].splice(0, 1)

    console.log(removedID)
    console.log("backend", sortable)
    if (leftButton == 0 || rightButton == 0) {
        results.redirect("final")
    } else {
        results.render("filter2", { sortable: sortable, removedID: removedID, Data: Data, commentsID: commentsID, leftButton: leftButton, rightButton: rightButton })

    }
})


app.post("/PostRight", (req, results) => {

    console.log("left", req.body.rightB)
    var left = req.body.rightB
    var bannedW = []
    bannedW.push(req.body.rightB)
    bannedW.push(req.body.removedID)
    var commentsID = req.session.CID
    var Data = req.session.data
    var removedID = []
    var comments = ""
    /*    console.log(Data[0].id ,"data")*/
    /*    console.log(commentsID, "data", commentsID.length)*/

    for (var i = 0; i < bannedW.length; i++) {
        for (var j = 0; j < commentsID.length; j++) {
            if (!(commentsID[j][0].match(bannedW[i]))) {
                removedID.push(commentsID[j][1])
                commentsID.splice(j, j)

            } else {
                comments += commentsID[j][0]
            }
        }
    }
    for (var i = 0; i < removedID.length; i++) {
        for (var j = 0; j < Data.length; j++) {
            if (removedID[i] == Data[j].id) {
                Data[j].poster_path = ""
            }

        }
    }

    function count(sentence) {
        var list = sentence.replace(/[^a-zA-Z ]/g, "").toLowerCase().split(' ')
        var words = {}
        for (var i = 0; i < list.length; i++) {
            if (!(words.hasOwnProperty(list[i])) && list[i] !== "the" && !(words.hasOwnProperty(list[i])) && list[i] !== "and" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "a" && !(words.hasOwnProperty(list[i])) && list[i] !== "that" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "i" && !(words.hasOwnProperty(list[i])) && list[i] !== "it" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "not" && !(words.hasOwnProperty(list[i])) && list[i] !== "he" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "as" && !(words.hasOwnProperty(list[i])) && list[i] !== "you" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "this" && !(words.hasOwnProperty(list[i])) && list[i] !== "but" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "his" && !(words.hasOwnProperty(list[i])) && list[i] !== "they" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "or" && !(words.hasOwnProperty(list[i])) && list[i] !== "an" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "will" && !(words.hasOwnProperty(list[i])) && list[i] !== "he" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "one" && !(words.hasOwnProperty(list[i])) && list[i] !== "my" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "all" && !(words.hasOwnProperty(list[i])) && list[i] !== "would" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "there" && !(words.hasOwnProperty(list[i])) && list[i] !== "their" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "to" && !(words.hasOwnProperty(list[i])) && list[i] !== "of" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "in" && !(words.hasOwnProperty(list[i])) && list[i] !== "for" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "on" && !(words.hasOwnProperty(list[i])) && list[i] !== "with" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "at" && !(words.hasOwnProperty(list[i])) && list[i] !== "early" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "from" && !(words.hasOwnProperty(list[i])) && list[i] !== "by" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "up" && !(words.hasOwnProperty(list[i])) && list[i] !== "about" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "into" && !(words.hasOwnProperty(list[i])) && list[i] !== "" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "after" && !(words.hasOwnProperty(list[i])) && list[i] !== "over" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "new" && !(words.hasOwnProperty(list[i])) && list[i] !== "good" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "last" && !(words.hasOwnProperty(list[i])) && list[i] !== "first" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "great" && !(words.hasOwnProperty(list[i])) && list[i] !== "long" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "own" && !(words.hasOwnProperty(list[i])) && list[i] !== "little" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "old" && !(words.hasOwnProperty(list[i])) && list[i] !== "other" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "big" && !(words.hasOwnProperty(list[i])) && list[i] !== "right" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "high" && !(words.hasOwnProperty(list[i])) && list[i] !== "small" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "be" && !(words.hasOwnProperty(list[i])) && list[i] !== "have" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "do" && !(words.hasOwnProperty(list[i])) && list[i] !== "we" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "say" && !(words.hasOwnProperty(list[i])) && list[i] !== "she" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "her" && !(words.hasOwnProperty(list[i])) && list[i] !== "what" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "so" && !(words.hasOwnProperty(list[i])) && list[i] !== "out" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "if" && !(words.hasOwnProperty(list[i])) && list[i] !== "who" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "get" && !(words.hasOwnProperty(list[i])) && list[i] !== "which" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "go" && !(words.hasOwnProperty(list[i])) && list[i] !== "me" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "when" && !(words.hasOwnProperty(list[i])) && list[i] !== "make" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "can" && !(words.hasOwnProperty(list[i])) && list[i] !== "like" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "no" && !(words.hasOwnProperty(list[i])) && list[i] !== "just" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "him" && !(words.hasOwnProperty(list[i])) && list[i] !== "know" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "take" && !(words.hasOwnProperty(list[i])) && list[i] !== "year" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "your" && !(words.hasOwnProperty(list[i])) && list[i] !== "some" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "could" && !(words.hasOwnProperty(list[i])) && list[i] !== "see" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "them" && !(words.hasOwnProperty(list[i])) && list[i] !== "than" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "then" && !(words.hasOwnProperty(list[i])) && list[i] !== "now" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "look" && !(words.hasOwnProperty(list[i])) && list[i] !== "only" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "come" && !(words.hasOwnProperty(list[i])) && list[i] !== "any" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "think" && !(words.hasOwnProperty(list[i])) && list[i] !== "its" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "also" && !(words.hasOwnProperty(list[i])) && list[i] !== "back" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "use" && !(words.hasOwnProperty(list[i])) && list[i] !== "two" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "how" && !(words.hasOwnProperty(list[i])) && list[i] !== "our" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "even" && !(words.hasOwnProperty(list[i])) && list[i] !== "want" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "because" && !(words.hasOwnProperty(list[i])) && list[i] !== "these" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "give" && !(words.hasOwnProperty(list[i])) && list[i] !== "most" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "us" && !(words.hasOwnProperty(list[i])) && list[i] !== "ask" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "try" && !(words.hasOwnProperty(list[i])) && list[i] !== "few" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "is" && !(words.hasOwnProperty(list[i])) && list[i] !== "was" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "film" && !(words.hasOwnProperty(list[i])) && list[i] !== "movie" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "more" && !(words.hasOwnProperty(list[i])) && list[i] !== "has" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "watch" && !(words.hasOwnProperty(list[i])) && list[i] !== "are" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "were" && !(words.hasOwnProperty(list[i])) && list[i] !== "had" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "never" && !(words.hasOwnProperty(list[i])) && list[i] !== "theres" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "kind" && !(words.hasOwnProperty(list[i])) && list[i] !== "really" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "such" && !(words.hasOwnProperty(list[i])) && list[i] !== "while" &&
                !(words.hasOwnProperty(list[i])) && list[i] !== "large" && !(words.hasOwnProperty(list[i])) && list[i] !== "next") {
                words[list[i]] = 0;
            }
            ++words[list[i]];
        }
        return words;
    }

    var display = count(comments)
    var sortable = [];
    for (var words in display) {
        sortable.push([words, display[words]]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    for (var i = 0; i < sortable.length; i++) {
        if (sortable[i][1] === NaN) {
            sortable.splice(i, i)
        }
    }

    var leftButton = sortable[0].splice(0, 1)
    var rightButton = sortable[1].splice(0, 1)
    console.log("backend", sortable)

    if (leftButton == 0 || rightButton == 0) {
        results.redirect("final")
    } else {

        results.render("filter2", { sortable: sortable, removedID: removedID, Data: Data, commentsID: commentsID, leftButton: leftButton, rightButton: rightButton })
    }
})


//reviews ophalen met loop
//reviews koppelen aan id

app.get("/final", (req, res) => {
    res.render("final")
})


app.get("/", (req, res) => {
    res.render("index")
})

app.listen("80", function() {
    console.log("3k bby")
})