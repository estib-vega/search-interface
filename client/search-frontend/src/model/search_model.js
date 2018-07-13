function getFromQry (qry) {
    if(qry === ""){
        qry = "-"
    }
    const url = "/api/query/" + qry
    
    const response = fetch(url)
    .then(response => {
        return response.json()
    }).then(json => {
        // console.log(json);
        return json
    }).catch(error => {
        // console.log(error)
        return []
    })

    return response
}

export function initialGet () {
    return getFromQry ("")
}


// handle the search queries
export function handleQuery (id) {
    const qry = document.getElementById(id).value
    return getFromQry(qry)
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

// page controller
// depending if the cards are going forwards 
// or backwards, the cards will fade or scroll accordingly
export function nextPage (data) {
    const thispage = data.thispage
    const nextpage = data.nextpage
    
    if(thispage < nextpage){
        // fade out this page upwards
        let currpage = document.getElementById("step_" + thispage)
        currpage.classList.remove("scroll-up")        
        currpage.classList.remove("scroll-down")        
        currpage.classList.remove("fade-out-down")        
        currpage.classList.add("fade-out-up")
        // fade in next page from bottom
        let followingpage = document.getElementById("step_" + nextpage)
        followingpage.style.top = "-" + (nextpage * 360) + "px"
        followingpage.classList.add("scroll-up")
    }
    else if(thispage > nextpage){
        // fade out this page downwards
        let currpage = document.getElementById("step_" + thispage)
        currpage.classList.remove("scroll-up") 
        currpage.classList.remove("scroll-down")  
        currpage.classList.remove("fade-out-up")       
        currpage.classList.add("fade-out-down")
        // fade in next page from top
        let followingpage = document.getElementById("step_" + nextpage)
        followingpage.style.top = "-" + (nextpage * 360) + "px"
        followingpage.classList.add("scroll-down")
    }
  }