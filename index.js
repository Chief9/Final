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
 		console.log(movies1)
 		}else{
 		
 		var movies1= { 
 			title : 'not found',
 			original_title : 'not found',
 			overview : 'please try again',
 			poster_path : "/e9QDfK4ChiUa8gekyg54cMqA3Uo.jpg"
 		}	
 		}

 		}
	results.render("compare", {movies:movies1})
})

})

app.post("/back", (req,results) =>{
	results.render("index")
})

app.post("/go", (req,results) =>{
	var IDlist = [] 
	MovieDB.genreMovies({id:req.body.movieID }, (err, res) => {
	  console.log("doei",res.results[0].genre_ids[0]);
	  /*console.log("hoi",res.results.length) 20*/ 
		  for (var i = 0; i < res.results.length; i++) {
		  var movieReviewID = res.results[i].id
		  IDlist.push(movieReviewID)

		  MovieDB.movieReviews({id:res.results[i].id},  (err, res) => {
		  var Reviewobjects = res.results
		  if(res.results != 0){
		  	
		  	var Boldreviews = Reviewobjects[0].content 
			}else{
			var Boldreviews = "empty"

			}
		  console.log(Boldreviews)
		  })	
	  }
		  /*console.log(movieReviewID)*/
		  console.log( "final", IDlist) //pushed into array 
		  // change loop res.results.length en id res.results[i].id
})
/*	MovieDB.genreMovies({id:req.body.movieID, page:"2" }, (err, res) => {
	  console.log(res);
	  console.log(req.body.movieID)

	})*/
})

//reviews ophalen met loop
//reviews koppelen aan id

app.get("/", (req,res) => {
	res.render("index")
})

app.listen("3000", function(){
	console.log("3k bby")
})