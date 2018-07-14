const express = require('express')
const app = express()
const algoliasearch = require('algoliasearch');

// algolia credentials
const client = algoliasearch('3ACEVDOML5', 'aab86189caae9cb23fd8db8cf7f9667a');
const index = client.initIndex('App_Store');
index.setSettings({
    attributesForFaceting : ['searchable(category)'],
    maxValuesPerFacet: 1000,
    searchableAttributes: [
        'name',
      ]
})

// serve built inferno files
app.use(express.static('./client/search-frontend/build'))
// app.use(express.static('./public'))

// get from algolia api
app.get("/api/query/:qry", (req, res) => {
    var qry = req.params.qry

    if(qry === "-"){
        qry = ""
    }

    index.search({
        query: qry,
        hitsPerPage: 4
        
    },
    (err, content) => {
        if(err){
            console.log(err);
        }
        
        res.json({hits: content.hits})
    })
    
})

// get the values of the different facets
app.get("/api/facet", (req, res) => {
    index.searchForFacetValues({
        facetName: 'category',
        facetQuery: ""
    }, (err, content) => {
        if (err){
            console.log(err);
            
        }

        res.json({facet: content.facetHits})
    })
})

app.listen(8080, () => {
    console.log('listening in port 8080');
})