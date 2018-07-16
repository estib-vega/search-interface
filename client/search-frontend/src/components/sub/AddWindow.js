import {Component} from 'inferno'
import '../../css/AddWindow.css'


class AddWindow extends Component {
    constructor(){
        super()
        this.state = {
            canAdd: false
        }
        this.parseData = this.parseData.bind(this)
        this.checkValues = this.checkValues.bind(this)
        this.close = this.close.bind(this)
    }

    checkValues(){
        // get all the data and store it in an object
        const appName = document.getElementById('app_name').value
        const appImg = document.getElementById('app_image').value
        const appLink = document.getElementById('app_link').value
        const appRank = document.getElementById('app_rank').value
        
        // check if all fields are filled
        if(appName !== "" && appImg !== "" && appLink !== "" && appRank !== ""){
            this.setState({canAdd: true})
        }
        else{
            this.setState({canAdd: false})
        }
    }

    close(){
        document.getElementById('app_name').value = ""
        document.getElementById('app_image').value = ""
        document.getElementById('app_link').value = ""
        document.getElementById('app_categ').value = "Books"
        document.getElementById('app_rank').value = ""
        this.props.onClose()
    }


    parseData() {
        // get all the data and store it in an object
        let appName = document.getElementById('app_name').value
        let appImg = document.getElementById('app_image').value
        let appLink = document.getElementById('app_link').value
        let appCat = document.getElementById('app_categ').value
        let appRank = document.getElementById('app_rank').value

        const data = {
            name: appName,
            image: appImg,
            link: appLink,
            category: appCat,
            rank: appRank
        }
        


        this.props.onPost(data)
        this.close()
        this.setState({canAdd: false})
    }

    render() {
        return (
            <div className={this.props.show ? "window-container fade-in-up-window" : "window-container"}>
                <h3 onClick={this.close}>CLOSE</h3>
                <h2> Please fill the information about the App </h2>
                <div className="window-input-container">
                    <input type="text" name="app_name" id="app_name" placeholder="Name" onKeyUp={this.checkValues}/>
                    <input type="text" name="app_image" id="app_image" placeholder="Image URL"onKeyUp={this.checkValues}/>
                    <input type="text" name="app_link" id="app_link" placeholder="Link"onKeyUp={this.checkValues}/>
                    <select id="app_categ">
                        {
                            this.props.hardFacets.map(cat => {
                                return <option value={cat.name}>{cat.name}</option>
                            })
                        }
                    </select>
                    <input 
                        onKeyPress={
                            e => {
                                // only allow numbers
                                if(!(e.charCode >= 48 && e.charCode <= 57)){
                                    e.preventDefault()
                                }
                            }
                        }
                        onKeyUp={this.checkValues}
                        className="number" 
                        type="text" 
                        name="app_rank" 
                        id="app_rank" 
                        placeholder="Rank"
                        maxlength="4"
                        />
                </div>
                <button onClick={this.parseData} style={this.state.canAdd ? "" : "pointer-events: none; opacity: 0.25;"}>Add</button>
            </div>
        )
    }
}

export default AddWindow