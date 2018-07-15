function getFromQry (qry, page, rank) {

    qry = qry === "" ? "-" : qry
    page = !page ? "-" : page
    rank = !rank ? "-" : "+"
    const url = "/api/query/" + qry + "&" + page + "&" + rank
    
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
export function handleQuery (qry, page, rank) {
    
    return getFromQry(qry, page, rank)
}

// get the face info
export const getFacets = () => {
    const facetUrl = "/api/facet"

    return fetch(facetUrl)
    .then((response) => response.json())
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

