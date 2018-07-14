import { linkEvent, Component } from 'inferno'
import { handleQuery, dropDown, initialGet, getFacets } from '../model/search_model'
import '../css/SideBar.css'
import '../css/SearchMainPane.css'
import '../css/Animations.css'
import '../css/StatusBar.css'

const testdata = [
    {
    "name": "iBooks",
    "image": "https://i.pinimg.com/736x/f4/3e/63/f43e630bbce1710655b30fdac7c3c9a4--philadelphia-reflection-photography.jpg",
    "link": "http://itunes.apple.com/us/app/ibooks/id364709193?mt=8",
    "category": "Books",
    "rank": 1
  },
  {
    "name": "Kindle – Read Books, Magazines &amp; More – Over 1 Million eBooks &amp; Newspapers",
    "image": "https://i.pinimg.com/736x/f4/3e/63/f43e630bbce1710655b30fdac7c3c9a4--philadelphia-reflection-photography.jpg",
    "link": "http://itunes.apple.com/us/app/kindle-read-books-magazines/id302584613?mt=8",
    "category": "Books",
    "rank": 2
  },
]

// single category
const SingleCategory = ({value, count}) => {
    return (
        <div className="single-category">
            <h4>{value}</h4>
            <h4>{count}</h4>
        </div>
    )
}

// category facets
class Categories extends Component {
    constructor(){
        super()
        this.state = {
            facets: []
        }
    }

    componentDidMount(){
        // get the counts
        getFacets()
        .then((json) => {
            this.setState({
                facets: json.facet
            })
        })
        .catch(() => {
            console.warn('- Unable to retrieve facets');
        })
    }

    render(){
        return (
            <div className="faceter">
            <div className="faceter-header">
                <h4>CATEGORY</h4>
                <h4 className="arrow" id="facets_0_arrow" onClick={ linkEvent({menu: 'facets_0'}, dropDown) } state="open">></h4>
            </div>
            <div className="facets" id="facets_0">
                {
                    this.state.facets.map((facet) => {
                        return <SingleCategory value={facet.value} count={facet.count}/>
                    })
                }
            </div>
        </div>
        )
    }
}

// side bar
const SideBar = () => {
    return (
        <div className="side-bar" id="side_bar">
            {/* <Facet/> */}
            <Categories/>
        </div>
    )
}

// search bar 
const SearchBar = ({onTextChange}) => {
    return (
        <div className="search-bar">
            <input type="text" name="search_bar" id="search_bar" placeholder="Search..." onKeyUp={ event => {onTextChange(event.target.value)} } autoComplete="off"/>
        </div>
    )
}

// test hit
const SingleHit = ({data}) => {
    return (
        <div className="single-hit">
            <img src={ data.image } alt="example"/>
            <div className="single-hit-text">
                <a href={ data.link }><h2 dangerouslySetInnerHTML={{__html: data._highlightResult ? data._highlightResult.name.value : data.name}}></h2></a>
                <h3>{ data.category }</h3>
            </div>
        </div>
    )
}

// main results pane
class MainPane extends Component {
    render (){
        return (
            <div className="main-pane" id="main_pane">
                {
                    this.props.hits.map((hit) => {
                        return <SingleHit data={hit}/>
                    })
                }
            </div>
        )
    }
}

// ascending descending switch
const Switch = () => {
    return (
        <div className="complete-switch">
            <h3>ASC</h3>
            <label class="switch">
            <input type="checkbox"/>
            <span class="slider round"></span>
            </label>
            <h3>DESC</h3>
        </div>
    )
}

// status bar
const StatusBar = () => {
    return (
        <div className="status-bar" id="status_bar">
            <div className="status-button-container">
                <button>-</button>
                <button>+</button>
            </div>
            <Switch/>
        </div>
    )
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
        initialGet()
        .then((result) => {
            this.setState({
                hits: result.hits
            })
        })
        .catch(() => {
            this.setState({
                hits: testdata
            })
        })
    }

    render () {
        return (
            <div className="search-pane-wrapper">
                <SearchBar onTextChange={ (qry) => {
                    
                    handleQuery(qry)
                    .then(result => {
                        if(result){
                            this.setState({ hits: result.hits})
                        }
                    })
                    .catch(() => {
                        this.setState({
                            hits: testdata
                        })
                    })
                } }/>
                <StatusBar/>
                <MainPane hits={this.state.hits}/>
            </div>
        )
    }
}

class SearchPane extends Component {
    render () {
        return (
            <div className="main-container" id="main_container">
                <SideBar/>
                <SearchMainPane/>
            </div>
        );
    }
}

export default SearchPane