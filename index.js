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
	MovieDB.genreMovies({id:req.body.movieID }, (err, res) => {
		 IDlist = [] //list of movie ids
		 displaylist= [] // all reviews should go here so they can be counted
		 Boldreviews= "" // the reviews of all movies without indication for word counting
		 /*console.log("doei",res.results[0].genre_ids[0]);*/
		for (var i = 0; i < res.results.length; i++) {
		  var movieReviewID = res.results[i].id
		  IDlist.push(movieReviewID)

		  MovieDB.movieReviews({id:res.results[i].id},  (err, res) => {
		  var Reviewobjects = res.results
		  if(res.results != 0){
		  	
		  	var Boldreviews = Reviewobjects[0].content 
			var display = count(Boldreviews)
			
			}else{
			var Boldreviews = "empty"

			}
			displaylist.push(Boldreviews)
			/*console.log("woorden teller", Boldreviews.length)*/
			/*console.log("displaylist", displaylist)*/
			})	
			console.log("listlength", displaylist)
	  }
		console.log("Boldreviews",Boldreviews)
		/*console.log("display", display)*/
		console.log( "final", IDlist) 

	}) ///scope probleem oplossen>> woorden samenvoegen en woorden met ids koppelen
	function count(sentence) {
		var list = sentence.replace(/[^a-zA-Z ]/g, "").toLowerCase().split(' ')
	 	var words = []
	 	for (var i = 0; i < list.length; i++) {
	    	if (!(words.hasOwnProperty(list[i]))&& list[i]!=="the"){
	    	words[list[i]] = 0;
	   		}
	    	++words[list[i]];
	 	}
	  	return words
	}

})



//reviews ophalen met loop
//reviews koppelen aan id

app.get("/", (req,res) => {
	res.render("index")
})

app.listen("3000", function(){
	console.log("3k bby")
})

/*
 && !(words.hasOwnProperty(list[i])) && list[i]!=="and" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="a" && !(words.hasOwnProperty(list[i])) && list[i]!=="that" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="i" && !(words.hasOwnProperty(list[i])) && list[i]!=="it" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="not" && !(words.hasOwnProperty(list[i])) && list[i]!=="he" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="as" && !(words.hasOwnProperty(list[i])) && list[i]!=="you" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="this" && !(words.hasOwnProperty(list[i])) && list[i]!=="but" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="his" && !(words.hasOwnProperty(list[i])) && list[i]!=="they" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="or" && !(words.hasOwnProperty(list[i])) && list[i]!=="an" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="will" && !(words.hasOwnProperty(list[i])) && list[i]!=="he" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="one" && !(words.hasOwnProperty(list[i])) && list[i]!=="my" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="all" && !(words.hasOwnProperty(list[i])) && list[i]!=="would" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="there" && !(words.hasOwnProperty(list[i])) && list[i]!=="their" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="to" && !(words.hasOwnProperty(list[i])) && list[i]!=="of" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="in" && !(words.hasOwnProperty(list[i])) && list[i]!=="for" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="on" && !(words.hasOwnProperty(list[i])) && list[i]!=="with" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="at" && !(words.hasOwnProperty(list[i])) && list[i]!=="early" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="from" && !(words.hasOwnProperty(list[i])) && list[i]!=="by" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="up" && !(words.hasOwnProperty(list[i])) && list[i]!=="about" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="into" && !(words.hasOwnProperty(list[i])) && list[i]!=="" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="after" && !(words.hasOwnProperty(list[i])) && list[i]!=="over" &&
     			!(words.hasOwnProperty(list[i]))&& list[i]!=="new" && !(words.hasOwnProperty(list[i])) && list[i]!=="good" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="last" && !(words.hasOwnProperty(list[i])) && list[i]!=="first" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="great" && !(words.hasOwnProperty(list[i])) && list[i]!=="long" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="own" && !(words.hasOwnProperty(list[i])) && list[i]!=="little" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="old" && !(words.hasOwnProperty(list[i])) && list[i]!=="other" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="big" && !(words.hasOwnProperty(list[i])) && list[i]!=="right" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="high" && !(words.hasOwnProperty(list[i])) && list[i]!=="small" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="be" && !(words.hasOwnProperty(list[i])) && list[i]!=="have" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="do" && !(words.hasOwnProperty(list[i])) && list[i]!=="we" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="say" && !(words.hasOwnProperty(list[i])) && list[i]!=="she" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="her" && !(words.hasOwnProperty(list[i])) && list[i]!=="what" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="so" && !(words.hasOwnProperty(list[i])) && list[i]!=="out" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="if" && !(words.hasOwnProperty(list[i])) && list[i]!=="who" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="get" && !(words.hasOwnProperty(list[i])) && list[i]!=="which" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="go" && !(words.hasOwnProperty(list[i])) && list[i]!=="me" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="when" && !(words.hasOwnProperty(list[i])) && list[i]!=="make" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="can" && !(words.hasOwnProperty(list[i])) && list[i]!=="like" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="no" && !(words.hasOwnProperty(list[i])) && list[i]!=="just" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="him" && !(words.hasOwnProperty(list[i])) && list[i]!=="know" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="take" && !(words.hasOwnProperty(list[i])) && list[i]!=="year" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="your" && !(words.hasOwnProperty(list[i])) && list[i]!=="some" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="could" && !(words.hasOwnProperty(list[i])) && list[i]!=="see" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="them" && !(words.hasOwnProperty(list[i])) && list[i]!=="than" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="then" && !(words.hasOwnProperty(list[i])) && list[i]!=="now" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="look" && !(words.hasOwnProperty(list[i])) && list[i]!=="only" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="come" && !(words.hasOwnProperty(list[i])) && list[i]!=="any" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="think" && !(words.hasOwnProperty(list[i])) && list[i]!=="its" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="also" && !(words.hasOwnProperty(list[i])) && list[i]!=="back" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="use" && !(words.hasOwnProperty(list[i])) && list[i]!=="two" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="how" && !(words.hasOwnProperty(list[i])) && list[i]!=="our" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="even" && !(words.hasOwnProperty(list[i])) && list[i]!=="want" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="because" && !(words.hasOwnProperty(list[i])) && list[i]!=="these" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="give" && !(words.hasOwnProperty(list[i])) && list[i]!=="most" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="us" && !(words.hasOwnProperty(list[i])) && list[i]!=="ask" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="try" && !(words.hasOwnProperty(list[i])) && list[i]!=="few" &&
    			!(words.hasOwnProperty(list[i]))&& list[i]!=="large" && !(words.hasOwnProperty(list[i])) && list[i]!=="next")*/