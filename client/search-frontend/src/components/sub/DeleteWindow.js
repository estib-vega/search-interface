import {Component} from 'inferno'
import '../../css/DeleteWindow.css'

class DeleteWindow extends Component {

    render() {
        return (
            <div className={this.props.show ? "del-window-container fade-in-up-window" : "del-window-container"}>
                <h2>Are you sure you want to delete '{this.props.appName}'?</h2>
                <div className="del-button-container">
                    <button className="cancel" onClick={this.props.onCancel}>Cancel</button>
                    <button className="accept" onClick={this.props.onAccept}>Yes</button>
                </div>
            </div>
        )
    }
}

export default DeleteWindow