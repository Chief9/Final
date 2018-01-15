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
	function count(sentence) {
	  var list = sentence.toLowerCase().split(' ');
	  var words = {};
		for (var i = 0; i < list.length; i++) {

	  		if (!(words.hasOwnProperty(list[i])) && ( list[i]!== "the" || list[i]!== "be" || list[i]!== "to" || list[i]!== "of" || list[i]!== "and" || 
	  			list[i]!== "a" || list[i]!== "in" || list[i]!== "that" || list[i]!== "have" || list[i]!== "i" || 
	  			list[i]!== "it" || list[i]!== "for" || list[i]!== "not" || list[i]!== "on" || list[i]!== "with" ||
	  			list[i]!== "he" || list[i]!== "as" || list[i]!== "you" || list[i]!== "do" || list[i]!== "at" ||
	  			list[i]!== "this" || list[i]!== "but" || list[i]!== "his" || list[i]!== "by" || list[i]!== "from" ||
	  			list[i]!== "they" || list[i]!== "we" || list[i]!== "say" || list[i]!== "her" || list[i]!== "she" ||
	  			list[i]!== "or" || list[i]!== "an" || list[i]!== "will" || list[i]!== "my" || list[i]!== "one" ||
	  			list[i]!== "all" || list[i]!== "would" || list[i]!== "there" || list[i]!== "thier" || list[i]!== "what" ||
	  			list[i]!== "so" || list[i]!== "up" || list[i]!== "out" || list[i]!== "if" || list[i]!== "about" ||
	  			list[i]!== "who" || list[i]!== "get" || list[i]!== "which" || list[i]!== "go" || list[i]!== "me" ||
	  			list[i]!== "when" || list[i]!== "make" || list[i]!== "can" || list[i]!== "like" || list[i]!== "no" ||
	  			list[i]!== "just" || list[i]!== "him" || list[i]!== "know" || list[i]!== "take" || list[i]!== "into" ||
	  			list[i]!== "your" || list[i]!== "good" || list[i]!== "some" || list[i]!== "could" || list[i]!== "them" ||
	  			list[i]!== "see" || list[i]!== "other" || list[i]!== "than" || list[i]!== "then" || list[i]!== "now" || 
	  			list[i]!== "look" || list[i]!== "only" || list[i]!== "come" || list[i]!== "its" || list[i]!== "over" ||
	  			list[i]!== "also" || list[i]!== "back" || list[i]!== "after" || list[i]!== "use" || list[i]!== "two" ||
	  			list[i]!== "how" || list[i]!== "our" || list[i]!== "first" || list[i]!== "even" || list[i]!== "new" ||
	  			list[i]!== "want" || list[i]!== "because" || list[i]!== "any" || list[i]!== "these" || list[i]!== "give" ||
	  			list[i]!== "day" || list[i]!== "most" || list[i]!== "us" || typeof list[i]!== 'string' )){
			    
			    		words[list[i]] = 0;
			    }
				    	++words[list[i]];
		}
	  console.log( "inside", words)
	}


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
			console.log("woorden teller", Boldreviews.length)
			var display = count(Boldreviews);
			
			/*console.log("function test",display);*/
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