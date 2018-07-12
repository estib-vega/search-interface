function dropDown (menu) {
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

function nextPage (thispage, nextpage) {
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

function startSearch(){
    // hide the pusher
    let pusher = document.getElementById('data-pusher')
    pusher.style.opacity  = "0";
    pusher.style.pointerEvents = "none";

    // show the search ui
    let search = document.getElementById("main-container")
    search.style.opacity  = "1";
    search.style.pointerEvents = "all";

    // focus search bar
    let searchbar = document.getElementById("search_bar")
    searchbar.focus()
    // fade in
    searchbar.style.opacity = "0";
    searchbar.classList.add("fade-in-down")

    // fade in side bar
    let sidebar = document.getElementById("side_bar")
    sidebar.style.opacity = "0";
    sidebar.classList.add("fade-in-right")

    // fade in main pane
    let main = document.getElementById("main_pane")
    main.style.opacity = "0";
    main.classList.add("fade-in-up")
}