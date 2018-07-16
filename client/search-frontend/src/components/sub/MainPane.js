import {Component, linkEvent} from 'inferno'
const notfound = require('../../img/error.jpg')


// test hit
const SingleHit = ({data, onDelete}) => {
    return (
        <div className="single-hit">
            <a href={ data.link } className="single-link">
                <img 
                    onError={ (e) => {e.target.src = notfound} } 
                    src={ data.image === "" ? notfound : data.image } 
                    alt="img"
                />
                <div className="single-hit-text">
                    <h2 dangerouslySetInnerHTML={{__html: data._highlightResult ? data._highlightResult.name.value : data.name}}></h2>
                    <h3>{ data.category }</h3>
                </div>
            </a>
            <button onClick={linkEvent({id: data.objectID, name: data.name}, onDelete)}>x</button>
        </div>
    )
}

// main results pane
class MainPane extends Component {
    render (){
        return (
            <div className="main-pane fade-in-up" id="main_pane" style={ this.props.op }>
                {
                    this.props.hits.map((hit) => {
                        return <SingleHit data={ hit } onDelete={this.props.onDelete}/>
                    })
                }
            </div>
        )
    }
}

export default MainPane