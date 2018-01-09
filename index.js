const express = require("express")
const app = express()

app.use(express.static("public"))

app.set('view engine', 'pug')


app.get("/", (req,res) => {
	res.render("index")
})

app.listen("3000", function(){
	console.log("3k bby")
})