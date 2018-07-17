import { linkEvent, Component } from 'inferno'
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
        this.state = {
            arrowState: true // open
        }
        this.selectCategory = this.selectCategory.bind(this)
        this.dropDown = this.dropDown.bind(this)
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

    dropDown(){
        const next = !this.state.arrowState
        this.setState({arrowState: next})
    }

  

    render(){
        return (
            <div className="faceter" style={this.state.arrowState ? "" : "height: 0px;"}>
                <h1 className="close-menu" onClick={this.props.onClose}>x</h1>
                <div className="faceter-header">
                    <h4>CATEGORY</h4>
                    <h4 
                        className="arrow"
                        style={this.state.arrowState ? "": "transform: rotate(-90deg);"}
                        onClick={ this.dropDown }
                    >></h4>
                </div>
                <div className="facets" style={this.state.arrowState ? "" : "height: 0px;"}>
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
            <div className="side-bar fade-in-right" id="side_bar" style={this.props.menu ? "left:0;" : ""}>
                <button onClick={this.props.onAdd}>Add App</button>
                <Categories 
                    facets={this.props.facets} 
                    hardFacets={this.props.hardFacets}
                    onChangedCategory={this.props.onChangedCategory}
                    onClose={this.props.onClose}
                />
            </div>
        )
    }
}


export default SideBar