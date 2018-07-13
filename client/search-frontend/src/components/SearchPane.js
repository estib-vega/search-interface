import { linkEvent, Component } from 'inferno'
import { handleQuery, dropDown } from '../model/search_model'
import { initialGet } from '../model/search_model'
import '../css/SideBar.css'
import '../css/SearchMainPane.css'
import '../css/Animations.css'

const testdata = [
    {
    "name": "iBooks",
    "image": "https://www.boostmobile.com/content/dam/boostmobile/en/products/phones/apple/iphone-6s/space-gray/device-front.png.transform/pdpCarousel/image.jpg",
    "link": "http://itunes.apple.com/us/app/ibooks/id364709193?mt=8",
    "category": "Books",
    "rank": 1
  },
  {
    "name": "Kindle – Read Books, Magazines &amp; More – Over 1 Million eBooks &amp; Newspapers",
    "image": "http://a4.mzstatic.com/us/r1000/080/Purple/v4/3f/6d/63/3f6d63e0-368d-c79d-c796-961db576d054/mza_1466682376824365277.175x175-75.jpg",
    "link": "http://itunes.apple.com/us/app/kindle-read-books-magazines/id302584613?mt=8",
    "category": "Books",
    "rank": 2
  },
]

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
const SearchBar = ({onTextChange}) => {
    return (
        <div className="search-bar">
            <input type="text" name="search_bar" id="search_bar" placeholder="Search..." onKeyUp={ event => { onTextChange(event.target.value)} } autoFocus autoComplete="off"/>
        </div>
    )
}

// test hit
const SingleHit = ({data}) => {
    return (
        <div className="single-hit">
            <img src={ data.image } alt="example"/>
            <div className="single-hit-text">
                <a href={ data.link }><h2>{ data.name }</h2></a>
                <h3>{ data.category }</h3>
            </div>
        </div>
    )
}

// main results pane
class MainPane extends Component {
    render (){
        return (
            <div className="main-pane">
                {
                    this.props.hits.map((hit) => {
                        return <SingleHit data={hit}/>
                    })
                }
            </div>
        )
    }
}

// search bar and main results pane 
class SearchMainPane extends Component {
    constructor(){
        super();
        this.state = {
            hits: []
        }
    }

    componentDidMount(){
        initialGet().then((result) => {
            this.setState({
                hits: result.hits
            })
        })
    }
    render () {
        return (
            <div className="search-pane-wrapper">
                <SearchBar onTextChange={ () => {
                    handleQuery('search_bar').then(result => this.setState({ hits: result.hits }))
                } }/>
                <MainPane hits={this.state.hits}/>
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