const express = require('express')
const app = express()
const algoliasearch = require('algoliasearch');
const algoliasearchHelper = require('algoliasearch-helper');
const bodyparser = require('body-parser') // post

// decode post form
// it returns the information as json
app.use(bodyparser.urlencoded({
    extended: true
}))
app.use(bodyparser.json())


// algolia credentials
const APP_ID = '3ACEVDOML5'
const API_KEY = 'aab86189caae9cb23fd8db8cf7f9667a'
const INDEX_NAME = 'App_Store'


const client = algoliasearch(APP_ID, API_KEY);
const helper = algoliasearchHelper(client, INDEX_NAME, {
    facets: ['category']
});

// serve built inferno files
app.use(express.static('./client/search-frontend/build'))

// get from algolia api
app.get("/api/query/:qry&:page&:rank&:filters", (req, res) => {
    let qry = req.params.qry === "-" ? "" : req.params.qry
    let page = req.params.page === "-" ? "" : req.params.page
    let rank = req.params.rank === "-" ? "desc(rank)" : "asc(rank)"
    let filters = req.params.filters === "-" ? null : req.params.filters

    let fFilters = []

    if(filters){
        let filterArray = filters.split('_').join(" ").split("|")
        let mapped = filterArray.map( fil => {
            return "category:" + fil
        })
        fFilters = mapped
        
    }

    // order descending or ascending
    // const index = client.initIndex(INDEX_NAME)

    // index.setSettings({
    //     customRanking: [
    //         rank
    //     ]
    // }, () =>{

       
        
    // })
    helper.setQuery(qry).search()
    
    helper.searchOnce({hitsPerPage: 10, page: page, facetFilters: [fFilters]})
    .then((response) => {
        res.json({
            hits: response.content.hits, 
            pages: response.content.nbPages, 
            results: response.content.nbHits, 
            facet: response.content.getFacetValues('category')})
    })
    .catch(er => console.log(er))
})


// add application
app.post("/api/1/apps", (req, res) => {
    console.log('handling post...');
    const bRes = req.body
    const index = client.initIndex(INDEX_NAME)

    const obj = {
        name: bRes.name,
        image: bRes.image,
        link: bRes.link,
        category: bRes.category,
        rank: bRes.rank
    }

    index.addObject(obj, (err, content) => {
        if(err){
            console.log(err);
            return
        }

        res.json({id: content.objectID})
    })
})

// delete application given an id
app.delete("/api/1/apps/:id", (req, res) => {
    const id = req.params.id

    const index = client.initIndex(INDEX_NAME)

    index.deleteObject(id, (err, content) => {
        if(err){
            console.log(err);
            return
        }
        res.json({msg: "deleted id:" + id, id: content.objectID})
    })
})

app.listen(8080, () => {
    console.log('listening in port 8080');
})