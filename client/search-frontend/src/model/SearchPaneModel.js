import { handleQuery, rankIn } from '../model/APIModel'

const testdata = [
    {
    "name": "No results",
    "image": "https://i.pinimg.com/736x/f4/3e/63/f43e630bbce1710655b30fdac7c3c9a4--philadelphia-reflection-photography.jpg",
    "link": "/",
    "category": "404",
    "rank": 1
  }
]

// delete an app
export function handleDelete(data) {
    const id = data.id
    const name = data.name
    // show the warning window
    // set the id to delete
    this.setState({showWindowDel: true, idToDelete: id, nameToDelete: name})
}

export function switchRanking(asc, call){
    this.setState({rank: asc})
    rankIn(asc, json => {
        if(call){
            this.refresh()
        }
    })
}

export function parseFilters(raw){
    return raw.join('|').split(" ").join("_")
}


export function updateHitsFilter(filters){
    // parse filters
    const fil = this.parseFilters(filters)
    const qry = this.state.lastQry
    this.updateHits(qry, 0, fil)
}

export function initialHits(){
    // always start in desc
    this.switchRanking(false, false)
    handleQuery("", 0, "-")
    .then(result => {
        if(result){
            this.setState({ 
                hits: result.hits,
                hardFacets: result.facet,
                facet: result.facet,
                pages: result.pages,
                numHits: result.results,
                main_pane_style: "pointer-events: all; filter: none;"
            })
        }
    })
    .catch(() => {
        this.setState({
            hits: testdata,
            facet: [],
            hardFacets: [],
            pages: 1,
            numHits: 0,
            main_pane_style: "pointer-events: all; filter: none;"
        })
    })
}

export function updateHits(qry, page, filters){
    if(!filters){
        filters = this.parseFilters(this.state.selectedCats)
    }

    // remember last query for pagination
    this.setState({
        lastQry: qry,
        currPage: page ? page : 0,
        main_pane_style: "pointer-events: none; filter: blur(1.5px); overflow: hidden;"
    })

    handleQuery(qry, page, filters)
    .then(result => {
        if(result){
            this.setState({ 
                hits: result.hits,
                facet: result.facet,
                pages: result.pages,
                numHits: result.results,
                main_pane_style: "pointer-events: all; filter: none;"
            })
        }
    })
    .catch(() => {
        this.setState({
            hits: testdata,
            facet: [],
            pages: 1,
            numHits: 0,
            main_pane_style: "pointer-events: all; filter: none;"
        })
    })
}

// when a category is selected, call this function to manage the query params
export function handleCategoryChange (sel, val){
    // determine if the value is in the
    // array
    let newCategories = this.state.selectedCats
    let index = -1

    let isInArray = false
    for(let i = 0; i < newCategories.length; i++){
        if(newCategories[i] === val){
            // found
            isInArray = true
            index = i
            break
        }
    }
    // if sel is true,
    // add the value else remove it
    if(sel){
        if(!isInArray){
            newCategories.push(val)
        }
    }
    else{
        if(isInArray){
            newCategories.splice(index, 1)
        }
    }

    this.setState({selectedCats: newCategories})
    this.updateHitsFilter(newCategories)
}

export async function refresh() {
    const qry = this.state.lastQry
    const filters = this.parseFilters(this.state.selectedCats)
    // this.updateHits(qry, 0)

    const result = await handleQuery(qry, 0, filters)
    
    if(result){
        this.setState({ 
            hits: result.hits,
            facet: result.facet,
            pages: result.pages,
            numHits: result.results,
        })
    }
    else{
        this.setState({
            hits: testdata,
            facet: [],
            pages: 1,
            numHits: 0,
        })
    }

}