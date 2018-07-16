import { Component } from 'inferno'
import { postData, deleteId } from '../model/APIModel'
import { 
    updateHits, 
    switchRanking, 
    handleCategoryChange, 
    handleDelete, 
    parseFilters, 
    updateHitsFilter ,
    initialHits
} from '../model/SearchPaneModel'
import SideBar from './sub/SideBar'
import StatusBar from './sub/StatusBar'
import AddWindow from './sub/AddWindow'
import DeleteWindow from './sub/DeleteWindow'
import MainPane from './sub/MainPane'
import '../css/SearchMainPane.css'
import '../css/Animations.css'
const gitImg = require('../img/git.png')

// https://www.picgifs.com/reaction-gifs/reaction-gifs/deal-with-it/picgifs-deal-with-it-1528635.gif

// search bar 
const SearchBar = ({onTextChange}) => {
    return (
        <div className="search-bar">
            <input className="fade-in-down" type="text" name="search_bar" id="search_bar" placeholder="Search..." onKeyUp={ event => {onTextChange(event.target.value)} } autofocus autoComplete="off"/>
        </div>
    )
}


// search bar and main results pane 
class SearchMainPane extends Component {
    render () {
        return (
            <div className="search-pane-wrapper">
                <SearchBar onTextChange={ (qry) => { this.props.updateHits(qry) } }/>
                <StatusBar 
                    switchRanking={this.props.switchRanking}
                    numHits={this.props.numHits} 
                    currPage={ this.props.currPage } 
                    pages={ this.props.pages } 
                    onPagination={ (page) => { this.props.updateHits(this.props.lastQry, page) } }
                />
                <MainPane 
                    hits={this.props.hits} 
                    op={ this.props.main_pane_style }
                    onDelete={this.props.onDelete}    
                />
            </div>
        )
    }
}

// footer
const Footer = () => {
    return (
        <div className="footer">
            <p>Coded by J. Esteban Vega</p>
            <a href="https://github.com/estib-vega/search-interface">
                <img src={ gitImg } alt="git"/>
            </a>
        </div>
    )
}

class SearchPane extends Component {
    constructor(){
        super();
        this.state = {
            hits: [],
            facet: [],
            hardFacets: [], // won't change after first query
            imageDict: {},
            lastQry: "",
            pages: 0,
            currPage: 0,
            numHits: 0,
            main_pane_style: "",
            selectedCats: [],
            rank: false, // desc
            showWindowAdd: false,
            showWindowDel: false,
            idToDelete: "",
            nameToDelete: "-",

        }

        this.updateHits = updateHits.bind(this)
        this.switchRanking = switchRanking.bind(this)
        this.handleCategoryChange = handleCategoryChange.bind(this)
        this.updateHitsFilter = updateHitsFilter.bind(this)
        this.parseFilters = parseFilters.bind(this)
        this.handleDelete = handleDelete.bind(this)
        this.initialHits = initialHits.bind(this)
    }

    componentWillMount() {
        this.initialHits()
    }


    render () {
        return (
            <div className="main-container" id="main_container">
                <DeleteWindow 
                    appName={this.state.nameToDelete}
                    show={this.state.showWindowDel}
                    onCancel={
                        () => {
                            // set the id and name
                            // to delete to empty string
                            // and close window
                            this.setState({
                                nameToDelete: "", 
                                idToDelete: "", 
                                showWindowDel: false
                            })
                        }
                    }
                    onAccept={
                        () => {
                            // delete the stored id
                            const id = this.state.idToDelete
                            if(id !== ""){
                                deleteId(id, json => {
                                    setTimeout(() => {
                                        console.log(json);
                                    
                                        const qry = this.state.lastQry
                                        const rank = this.state.rank
                                        this.updateHits(qry, 0, rank)
                                    }, 500)
                                    
                                })
                                
                            }
                            // close window
                            this.setState({showWindowDel: false})                            
                        }
                    }
                />
                <AddWindow 
                    show={this.state.showWindowAdd} 
                    onClose={ () => {this.setState({showWindowAdd: false})} }
                    onPost={ 
                                (data) => {
                                    postData(data, json => {
                                        setTimeout(() => {
                                            console.log(json);
                                        
                                            const qry = this.state.lastQry
                                            const rank = this.state.rank
                                            this.updateHits(qry, 0, rank)
                                        }, 500)
                                    })
                                } 
                            }
                />
                <SideBar 
                    facets={this.state.facet} 
                    hardFacets={this.state.hardFacets}
                    onChangedCategory={this.handleCategoryChange}
                    onAdd={ () => {this.setState({showWindowAdd: true})} }
                />
                <SearchMainPane
                    hits={this.state.hits}
                    imageDict={this.state.imageDict}
                    lastQry={this.state.lastQry}
                    pages={this.state.pages}
                    currPage={this.state.currPage}
                    numHits={this.state.numHits}
                    main_pane_style={this.state.main_pane_style}
                    updateHits={this.updateHits}
                    switchRanking={this.switchRanking}
                    onDelete={this.handleDelete}
                />
                <Footer/>
            </div>
        );
    }
}

export default SearchPane;