import { linkEvent, Component } from 'inferno'
import { dropDown } from '../../model/APIModel'
import '../../css/SideBar.css'

class SingleCategory extends Component {
    constructor(props){
        super(props)

        this.state = {
            se: this.props.selected,
        }
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
    constructor(props){
        super(props)
        this.selectCategory = this.selectCategory.bind(this)
    }

    selectCategory(category) {
        // display the selected category
        // --> toggled
        const newSelectedState = !category.state.se
        category.setState({
            se: newSelectedState
        })

        const val = category.props.value
        this.props.onChangedCategory(newSelectedState, val)
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
                    this.props.hardFacets.map((facet) => {
                        const facetObj = this.props.facets.filter(val => val.name === facet.name)
                        const count = facetObj && facetObj.length === 1 ? facetObj[0].count : 0

                        return <SingleCategory value={facet.name} count={count} onSelect={this.selectCategory}/>
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
                <button onClick={this.props.onAdd}>Add App</button>
                <Categories facets={this.props.facets} hardFacets={this.props.hardFacets}onChangedCategory={this.props.onChangedCategory}/>
            </div>
        )
    }
}


export default SideBar