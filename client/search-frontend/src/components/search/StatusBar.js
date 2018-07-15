import { linkEvent, Component } from 'inferno'

// ascending descending switch
const Switch = ({ switchRanking }) => {
    return (
        <div className="complete-switch">
            <h3>DESC</h3>
            <label class="switch">
            <input type="checkbox" onChange={ e => { switchRanking(e.target.checked)} }/>
            <span class="slider round"></span>
            </label>
            <h3>ASC</h3>
        </div>
    )
}

// status bar
class StatusBar extends Component {
    constructor(){
        super()

        this.paginate = this.paginate.bind(this)
    }

    paginate (next) {
        let nextPage = this.props.currPage
        
        if (next) {
            if ((nextPage + 1) !== this.props.pages){
                // go forward
                nextPage++
                this.props.onPagination(nextPage)
            }

        } else if (nextPage > 0) {
            // go bakc
            nextPage--
            this.props.onPagination(nextPage)
        }
    }
    

    render(){
        return (
            <div className="status-bar fade-in-left" id="status_bar">
            <div className="status-button-container">
                <button onClick={ linkEvent(false, this.paginate) }>-</button>
                <h3>{ this.props.currPage + 1 } - { this.props.pages }</h3>
                <button onClick={ linkEvent(true, this.paginate) }>+</button>
            </div>
            <Switch switchRanking={ this.props.switchRanking }/>
            <div className="total-hits-container">
                <h3>total results: { this.props.numHits }</h3>
            </div>
        </div>
        )
    }
}

export default StatusBar