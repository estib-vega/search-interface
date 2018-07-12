import { linkEvent, Component } from 'inferno'
import '../css/SideBar.css'
import '../css/SearchMainPane.css'
const testimg = require('../img/iphone.jpg')

// open or close the the facet menu
const dropDown = (data) => {
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

// test facet
const Facet = () => {
    return ( 
        <div className="faceter">
            <div className="faceter-header">
                <h4>CATEGORY</h4>
                <h4 className="arrow" id="facets_0_arrow" onClick={ linkEvent({menu: 'facets_0'}, dropDown) } state="open">></h4>
            </div>
            <div className="facets" id="facets_0">
                <h4>Category 1</h4>
                <h4>Category 2</h4>
                <h4>Category 3</h4>
                <h4>Category 4</h4>
                <h4>Category 5</h4>
            </div>
        </div>
    )
}

// side bar
const SideBar = () => {
    return (
        <div className="side-bar" id="side_bar">
            <Facet/>
        </div>
    )
}

// search bar 
const SearchBar = () => {
    return (
        <div className="search-bar">
            <input type="text" name="search_bar" id="search_bar" placeholder="Search..."/>
        </div>
    )
}

// test hit
const SingleHit = () => {
    return (
        <div className="single-hit">
            <img src={ testimg } alt="example"/>
            <div className="single-hit-text">
                <h2>Name - Title</h2>
                <h3>Subtitle</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Harum corporis nobis obcaecati facilis eaque, a voluptates 
                    magnam iure eveniet tempora deserunt sequi earum porro molestias 
                    recusandae iusto excepturi atque non!</p>
            </div>
        </div>
    )
}

// main results pane
const MainPane = () => {
    return (
        <div className="main-pane">
            <SingleHit/>
            <SingleHit/>
            <SingleHit/>
            <SingleHit/>
        </div>
    )
}

// search bar and main results pane 
class SearchMainPane extends Component {
    render () {
        return (
            <div className="search-pane-wrapper">
                <SearchBar/>
                <MainPane/>
            </div>
        )
    }
}

class SearchPane extends Component {
    render () {
        return (
            <div className="main-container">
                <SideBar/>
                <SearchMainPane/>
            </div>
        );
    }
}

export default SearchPane