
const algoliasearch = require('algoliasearch');
const algoliasearchHelper = require('algoliasearch-helper');

class AlgoliaModel {
    constructor(){
        this.ranking = true // descending
        
        // algolia credentials
        const APP_ID = '3ACEVDOML5'
        const API_KEY = 'aab86189caae9cb23fd8db8cf7f9667a'
        const INDEX_NAME_DES = 'App_Store'
        const INDEX_NAME_ASC = 'App_Store_Asc'

        // for object addition
        const client = algoliasearch(APP_ID, API_KEY);

        this.index = client.initIndex(INDEX_NAME_DES)

        this.helperDes = algoliasearchHelper(client, INDEX_NAME_DES, {
            facets: ['category']
        });

        this.helperAsc = algoliasearchHelper(client, INDEX_NAME_ASC, {
            facets: ['category']
        });
    }

    // add app to the index
    addObject(obj, callback){
        this.index.addObject(obj, (err, content) => {
            if(err){
                console.log(err);
                return
            }
            callback({id: content.objectID})
        })
    }

    // delete app from index
    deleteObject(id, callback){
        this.index.deleteObject(id, (err, content) => {
            if(err){
                console.log(err);
                return
            }
            callback({msg: "deleted id:" + id, id: content.objectID})
        })
    }
   
    // change the ranking
    setRanking(rank, callback) {
        let newRank
        if(rank === "asc"){
            this.ranking = false
            newRank = "asc(rank)"
        }
        else {
            this.ranking = true
            newRank = "desc(rank)"
        }
        callback({msg: "done", rank: newRank})
    }

    parseFilters(filters) {
        let filterArray = filters.split('_').join(" ").split("|")
        return filterArray.map( fil => {
            return "category:" + fil
        })
    }

    // do search given the parameters
    search(qry, page, filters, callback) {
        // parse filters

        filters = filters.length === 0 ? filters : this.parseFilters(filters)

        // depending of the ranking, use different
        // helpers
        if(this.ranking){
            this.helperDes.setQuery(qry).search()
    
            this.helperDes.searchOnce({hitsPerPage: 10, page: page, facetFilters: [filters]})
            .then((response) => {
                callback({
                    hits: response.content.hits, 
                    pages: response.content.nbPages, 
                    results: response.content.nbHits, 
                    facet: response.content.getFacetValues('category')
                })
            })
            .catch(er => console.log(er))
        }
        else {
            this.helperAsc.setQuery(qry).search()
    
            this.helperAsc.searchOnce({hitsPerPage: 10, page: page, facetFilters: [filters]})
            .then((response) => {
                callback({
                    hits: response.content.hits, 
                    pages: response.content.nbPages, 
                    results: response.content.nbHits, 
                    facet: response.content.getFacetValues('category')
                })
            })
            .catch(er => console.log(er))
        }
    }

}

module.exports = AlgoliaModel