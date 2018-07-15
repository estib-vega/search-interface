import { linkEvent, Component } from 'inferno'
import { dropDown, getFacets } from '../../model/search_model'


// single category
// const SingleCategory = ({value, count, selected, onSelect}) => {
//     return (
//         <div className={ selected ? "single-category selected" : "single-category" } 
//         onClick={ (e) => {onSelect(e.target)} }>
//             <h4>{value}</h4>
//             <h4>{count}</h4>
//         </div>
//     )
// }

class SingleCategory extends Component {
    constructor(props){
        super(props)

        this.state = {
            se: this.props.selected,
        }
        console.log(this.props.selected);
        
    }

    render() {
    return (
        <div className={ this.state.se ? "single-category selected" : "single-category" } 
        onClick={linkEvent(this, this.props.onSelect)}>
            <h4>{this.props.value}</h4>
            <h4>{this.props.count}</h4>
        </div>
    )
    }
}

// category facets
class Categories extends Component {
    constructor(){
        super()
        // this.state = {
        //     facets: []
        // }

        this.selectCategory = this.selectCategory.bind(this)
    }

    componentDidMount(){
        // // get the counts
        // getFacets()
        // .then((json) => {
        //     this.setState({
        //         facets: json.facet
        //     })
        // })
        // .catch(() => {
        //     console.warn('- Unable to retrieve facets');
        // })
    }

    selectCategory(category) {
        const lastSelectedState = category.state.se
        category.setState({
            se: !lastSelectedState
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
                    this.props.facets.map((facet) => {
                        return <SingleCategory value={facet.name} count={facet.count} onSelect={this.selectCategory}/>
                    })
                }
            </div>
        </div>
        )
    }
}

// side bar
class SideBar extends Component {
    render() {
        return (
            <div className="side-bar fade-in-right" id="side_bar">
                <Categories facets={this.props.facets}/>
            </div>
        )
    }
}


export default SideBar