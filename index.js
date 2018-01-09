const express = require("express")
const app = express()
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({ extended:true }))
app.use(express.static("public"))

app.set('view engine', 'pug')

app.post("/Search", (req,results) =>{
	
	var word = req.body.name
	console.log(word)
	var replaced = word.split(' ').join('%20');
	console.log(`https://api.themoviedb.org/3/search/movie?api_key=ef3c702b020d9110c4259e6b862555f7&language=en-US&query=${replaced}&page=1&include_adult=false`)
	results.render("compare")
	
})



app.get("/", (req,res) => {
	res.render("index")
})

app.listen("3000", function(){
	console.log("3k bby")
})