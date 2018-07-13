const express = require('express')
const app = express()
const algoliasearch = require('algoliasearch');

// algolia credentials
const client = algoliasearch('3ACEVDOML5', 'aab86189caae9cb23fd8db8cf7f9667a');
const index = client.initIndex('App_Store');

// serve built inferno files
app.use(express.static('./client/search-frontend/build'))

// get from algolia api
app.get("/api/query/:qry", (req, res) => {
    var qry = req.params.qry
    if(qry === "-"){
        qry = ""
    }
    index.search({
        query: qry,
        hitsPerPage: 5
    },
    (err, content) => {
        if(err){
            console.log(err);
        }
        
        res.json({hits: content.hits})
        
    })
    
})

app.listen(8080, () => {
    console.log('listening in port 8080');
})