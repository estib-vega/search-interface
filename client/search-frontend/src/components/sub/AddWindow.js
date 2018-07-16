import {Component} from 'inferno'
import '../../css/AddWindow.css'

class AddWindow extends Component {
    constructor(){
        super()
        this.parseData = this.parseData.bind(this)
    }

    parseData() {
        // get all the data and store it in an object
        const appName = document.getElementById('app_name').value
        const appImg = document.getElementById('app_image').value
        const appLink = document.getElementById('app_link').value
        const appCat = document.getElementById('app_categ').value
        const appRank = document.getElementById('app_rank').value

        const data = {
            name: appName,
            image: appImg,
            link: appLink,
            category: appCat,
            rank: appRank
        }

        this.props.onPost(data)
        // should display a message
        // should check if all fields are filled
        this.props.onClose()
    }

    render() {
        return (
            <div className={this.props.show ? "window-container fade-in-up-window" : "window-container"}>
                <h3 onClick={this.props.onClose}>CLOSE</h3>
                <h2> Please fill the information about the App </h2>
                <div className="window-input-container">
                    <input type="text" name="app_name" id="app_name" placeholder="Name"/>
                    <input type="text" name="app_image" id="app_image" placeholder="Image URL"/>
                    <input type="text" name="app_link" id="app_link" placeholder="Link"/>
                    <input type="text" name="app_categ" id="app_categ" placeholder="Category"/>
                    <input type="text" name="app_rank" id="app_rank" placeholder="Rank"/>
                </div>
                <button onClick={this.parseData}>Add</button>
            </div>
        )
    }
}

export default AddWindow