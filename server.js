// Here, I am using the library sugarjs
// it seems to be a nice library

var express = require('express')
require('sugar')

var app = express()

app.use(function(req, res){
    var query = decodeURIComponent(req.url.toString().slice(1))
    var date,
        unix,
        natural
    if (Boolean(query)) {
        if (!isNaN(query)) {
            date = Date.create(parseInt(query)*1000)
        } else {
            date = Date.create(query)
        }
        
        if (date=="Invalid Date") {
            unix = null
            natural = null
        } else {
            unix = Math.round(date.getTime()/1000)
            natural = date.format('{Weekday} {d} {Month}, {yyyy}')
        }
        
        res.send({"unix": unix, "natural": natural})
    } else {
        res.send('<h1> Timestamp service </h1><h3> Try, for instance, the path "/home/123" and watch the world burn </h3><h3>Then again, you can try "/a second ago" instead</h3><h4>Also, I am using sugarjs (and its .create parser) here </h4>')
    }
})

app.listen(8080)