const express = require('express')
const app = express()
const bodyparser = require('body-parser') // post
const AlgoliaModel = require('./model/algolia-model')

// setting port
app.set('port', (process.env.PORT || 8080))

// decode post form
// it returns the information as json
app.use(bodyparser.urlencoded({
    extended: true
}))
app.use(bodyparser.json())

// instance of model 
const algolia = new AlgoliaModel()

// serve built inferno files
app.use(express.static(__dirname + '/public'))

// get from algolia api
app.get("/api/query/:qry&:page&:filters", (req, res) => {
    const qry = req.params.qry === "-" ? "" : req.params.qry
    const page = req.params.page === "-" ? "" : req.params.page
    const filters = req.params.filters === "-" ? [] : req.params.filters

    algolia.search(qry, page, filters, json => {
        res.json(json)
    })
    
})

// switch between descending and ascending
app.get("/api/rank/:rank", (req, res) => {
    const rank = req.params.rank
    
    algolia.setRanking(rank, json => {
        res.json(json)
    })

})


// add application
app.post("/api/1/apps", (req, res) => {
    const obj = req.body

    algolia.addObject(obj, json => {
        res.json(json)
    })
})


// delete application given an id
app.delete("/api/1/apps/:id", (req, res) => {
    const id = req.params.id

    algolia.deleteObject(id, json => {
        res.json(json)
    })
})

app.listen(app.get('port'), () => {
    console.log('listening in port 8080');
})