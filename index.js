const express = require('express')
const app = express()
const algoliasearch = require('algoliasearch');
const algoliasearchHelper = require('algoliasearch-helper');



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
app.get("/api/query/:qry&:page&:rank", (req, res) => {
    let qry = req.params.qry === "-" ? "" : req.params.qry
    let page = req.params.page === "-" ? "" : req.params.page
    let rank = req.params.rank === "-" ? "desc(rank)" : "asc(rank)"

    // console.log(rank);

    // order descending or ascending
    const index = client.initIndex(INDEX_NAME)

    index.setSettings({
        customRanking: [
            rank
        ]
    }, () =>{
        setTimeout(() => {
            index.getSettings().then( result => {
                console.log(result.customRanking, rank);
                
            })
           
        }, 1000)
        
        helper.setQuery(qry).search()
    
        helper.searchOnce({hitsPerPage: 10, page: page})
        .then((response) => {
            res.json({hits: response.content.hits, pages: response.content.nbPages, results: response.content.nbHits, facet: response.content.getFacetValues('category')})
        })
        .catch(er => console.log(er))
    })

   
})

// get the values of the different facets
app.get("/api/facet", (req, res) => {

    helper.searchOnce()
    .then((response) => {
        res.json({facet: response.content.getFacetValues('category')})
    })
    .catch(er => console.log(er))

})


app.listen(8080, () => {
    console.log('listening in port 8080');
})