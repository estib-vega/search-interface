import { Component } from 'inferno'
import { handleQuery } from '../model/search_model'
import SideBar from './search/SideBar'
import StatusBar from './search/StatusBar'
import '../css/SideBar.css'
import '../css/SearchMainPane.css'
import '../css/Animations.css'
import '../css/StatusBar.css'
const gitImg = require('../img/git.png')
const notfound = require('../img/error.jpg')

const testdata = [
    {
    "name": "No results",
    "image": "https://i.pinimg.com/736x/f4/3e/63/f43e630bbce1710655b30fdac7c3c9a4--philadelphia-reflection-photography.jpg",
    "link": "/",
    "category": "404",
    "rank": 1
  }
]

// search bar 
const SearchBar = ({onTextChange}) => {
    return (
        <div className="search-bar">
            <input className="fade-in-down" type="text" name="search_bar" id="search_bar" placeholder="Search..." onKeyUp={ event => {onTextChange(event.target.value)} } autofocus autoComplete="off"/>
        </div>
    )
}



// test hit
const SingleHit = ({data}) => {
    return (
        <a href={ data.link } className="single-link">
            <div className="single-hit">
                <img src={ data.image || data.image === "" ? notfound : data.image } alt="img"/>
                <div className="single-hit-text">
                    <h2 dangerouslySetInnerHTML={{__html: data._highlightResult ? data._highlightResult.name.value : data.name}}></h2>
                    <h3>{ data.category }</h3>
                </div>
            </div>
        </a>
    )
}

// main results pane
class MainPane extends Component {
    render (){
        return (
            <div className="main-pane fade-in-up" id="main_pane" style={ this.props.op }>
                {
                    this.props.hits.map((hit) => {
                        return <SingleHit data={ hit }/>
                    })
                }
            </div>
        )
    }
}




// search bar and main results pane 
class SearchMainPane extends Component {
    // constructor(){
    //     super();
    //     this.state = {
    //         hits: [],
    //         imageDict: {},
    //         lastQry: "",
    //         pages: 0,
    //         currPage: 0,
    //         numHits: 0,
    //         main_pane_style: ""
    //     }

    //     this.updateHits = this.updateHits.bind(this)
    //     this.switchRanking = this.switchRanking.bind(this)
    // }

    // switchRanking(asc){
    //     let qry = this.state.lastQry
    //     let page = this.state.currPage
    //     if(asc){
    //         // console.log('ascending');
    //         this.updateHits(qry, page, "+")
    //     } else {
    //         // console.log('descending');
    //         this.updateHits(qry, page)

    //     }
    // }

    // updateHits(qry, page, rank){
    //     // remember last query for pagination
    //     this.setState({
    //         lastQry: qry,
    //         currPage: page ? page : 0,
    //         main_pane_style: "pointer-events: none; filter: blur(1.5px);"
    //     })

    //     handleQuery(qry, page, rank)
    //     .then(result => {
    //         console.log(result.facet);
            
    //         if(result){
    //             this.setState({ 
    //                 hits: result.hits,
    //                 pages: result.pages,
    //                 numHits: result.results,
    //                 main_pane_style: "pointer-events: all; filter: none;"
    //             })
    //         }
    //     })
    //     .catch(() => {
    //         this.setState({
    //             hits: testdata,
    //             pages: 1,
    //             numHits: 0,
    //             main_pane_style: "pointer-events: all; filter: none;"
    //         })
    //     })
    // }

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
                <MainPane hits={this.props.hits} op={ this.props.main_pane_style }/>
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
            imageDict: {},
            lastQry: "",
            pages: 0,
            currPage: 0,
            numHits: 0,
            main_pane_style: ""
        }

        this.updateHits = this.updateHits.bind(this)
        this.switchRanking = this.switchRanking.bind(this)
    }

    switchRanking(asc){
        let qry = this.state.lastQry
        let page = this.state.currPage
        if(asc){
            // console.log('ascending');
            this.updateHits(qry, page, "+")
        } else {
            // console.log('descending');
            this.updateHits(qry, page)

        }
    }

    updateHits(qry, page, rank){
        // remember last query for pagination
        this.setState({
            lastQry: qry,
            currPage: page ? page : 0,
            main_pane_style: "pointer-events: none; filter: blur(1.5px);"
        })

        handleQuery(qry, page, rank)
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

    render () {
        return (
            <div className="main-container" id="main_container">
                <SideBar facets={this.state.facet}/>
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
                />
                <Footer/>
            </div>
        );
    }
}

export default SearchPane;