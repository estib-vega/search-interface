function getFromQry (qry, page, rank, filters) {

    qry = qry === "" ? "-" : qry
    page = !page ? "-" : page
    rank = !rank ? "-" : "+"
    filters = !filters ? "-" : filters

    const url = "/api/query/" + qry + "&" + page + "&" + rank + "&" + filters
    
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
export function handleQuery (qry, page=0, rank="-", filters="-") {
    
    return getFromQry(qry, page, rank, filters)
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

// open or close the the facet menu
export function dropDown (data) {
    const menu = data.menu

    // arrow button
    let arrow = document.getElementById(menu + "_arrow")
    // menu items
    let menuitems = document.getElementById(menu)


    const state = arrow.getAttribute("state")

    if(state === "open"){
        arrow.style.transform = "rotate(-90deg)"
        arrow.setAttribute("state", "closed");
        menuitems.style.height = "0px"
    }
    else if(state === "closed"){
        arrow.style.transform = "rotate(90deg)"
        arrow.setAttribute("state", "open");
        menuitems.style.height = "auto"
    }
}

