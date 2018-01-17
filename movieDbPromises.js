function movieDbReviewPromise = function(id) {
    return new Promise(function(resolve, reject) {
                MovieDB.movieReviews({ id: id }, (err, res) => {
                    if (err) reject(err)
                    if (res.results != 0) {
                        resolve(res.results[0].content)
                    } else {
                        resolve()
                    }
                })
            })
}

var aMovieDbcall = movieDbReviewPromise(2)

aMovieDbcall.then((result)=> {

})



let movieDbCallsArray = []
for(let i = 1; i <= 10 ; i++) {
	movieDbCallsArray.push(movieDbReviewPromise(i))
}
Promise.all(movieDbCallsArray).then((allTheResults)=> {
})
.catch((e)=> {
	throw e
})