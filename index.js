const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const MovieDB = require('moviedb')('ef3c702b020d9110c4259e6b862555f7');
const session = require('express-session')

app.use(bodyParser.urlencoded({ extended:true }))
app.use(express.static("public"))

app.use(session({
	secret:"secreto",
	resave: true,
	saveUninitialized: false

}))

app.set('view engine', 'pug')

app.post("/Search", (req,results) =>{
	
	var word = req.body.name
	MovieDB.searchMovie({ query: word, page:"1"}, (err, res) => {
 	var movies = res.results
 	for (var i = 0; i < 1; i++) {
 		if(movies!=0){ 
 		var movies1= movies[0]
 		var ssn = req.session
 		ssn.movieIDS= movies1.genre_ids
 		console.log(ssn.movieIDS)
 		}else{
 		
 		var movies1= { 
 			title : 'not found',
 			original_title : 'not found',
 			overview : 'please try again',
 			poster_path : "/e9QDfK4ChiUa8gekyg54cMqA3Uo.jpg"
 		}	
 		}

 		}
	console.log(movies1)
 	results.render("compare", {movies:movies1})
})

})

app.post("/back", (req,results) =>{
	results.render("index")
})

app.post("/go", (req,results) =>{

	console.log(movies1)

/*	results.render("filter")*/
})



app.get("/", (req,res) => {
	res.render("index")
})

app.listen("3000", function(){
	console.log("3k bby")
})