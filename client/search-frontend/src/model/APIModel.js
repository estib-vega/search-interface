
function getFromQry (qry, page, filters) {

    qry = qry === "" ? "-" : qry
    page = !page ? "-" : page
    filters = !filters ? "-" : filters

    const url = "/api/query/" + qry + "&" + page  + "&" + filters
    
    const response = fetch(url)
    .then(response => 
        response.json()
    ).then(json => json
    ).catch(() => {
        return []
    })
    return response
}
// handle the search queries
export function handleQuery (qry, page=0, filters="-") {
    
    return getFromQry(qry, page, filters)
}

// post data for adding app
export async function postData(data, callback){
    const url = "/api/1/apps"
    await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    })
    .then( response => response.json())
    .then(json => callback(json))
    .catch(e => console.log(e))
}

// delete app, given an id
export async function deleteId(id, callback){
    const url = "/api/1/apps/" + id
    await fetch(url, {
        method: "DELETE",
    })
    .then( response => response.json())
    .then(json => callback(json))
    .catch(e => console.log(e))
}

export async function rankIn(asc, callback){
    const rank = asc ? "asc" : "desc" 
    const url = "/api/rank/" + rank
    await fetch(url)
    .then( response => response.json())
    .then(json => callback(json))
    .catch(e => console.log(e))
}