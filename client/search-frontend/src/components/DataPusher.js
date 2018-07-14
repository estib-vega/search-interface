import { linkEvent, Component } from 'inferno';
import { nextPage, startSearch } from '../model/search_model'
import '../css/DataPusher.css'
import '../css/Animations.css'


// custom button component
const PageButton = ({cl, label, data}) => (
  <button onClick={ linkEvent(data, nextPage) } className={ cl }>{label}</button>
)

// card component
const Card = (props) => {
  return (
    <div className="card" id={ props.cardId }>
      <h2>{ props.title }</h2>
      { props.children }
    </div>
  )
}

// the three cards that collect the credentials and file to 
// push to the algolia index for later searchability
class DataPusher extends Component {
    render() {
      return (
        <div className="data-pusher" id="data_pusher">

          <Card cardId="step_0" title="1. Please enter your credentials for Algolia">
            <h5 onClick={ startSearch }>SKIP</h5>
            <input type="text" name="app_id" id="app_id" placeholder="App Id"/>
            <input type="text" name="api_key" id="api_key" placeholder="API Key"/>
            <input type="text" name="index_name" id="index_name" placeholder="Index Name"/>
            <PageButton cl="next" label="Next" data={{thispage: 0, nextpage: 1}}/>
          </Card>

          <Card cardId="step_1" title="2. Push data to the Algolia Index">
            <p>This step is optional, if the records have been previously pushed to the index.</p>
            <div className="input-container">
              <input type="file" name="input_file" id="input_file" className="inputfile" accept=".json"/>
              <label id="file_label" for="input_file" className="blue">Choose a file</label>
            </div>
            <div className="button-container">
              <PageButton cl="next" label="Next" data={ {thispage: 1, nextpage: 2} }/>
              <PageButton cl="back" label="Back" data={ {thispage: 1, nextpage: 0} }/>
            </div>
          </Card>

          <Card cardId="step_2" title="3. Start demo">
            <p>The setup should be done by now. Have fun searching!</p>
            <div class="input-container">
              <PageButton cl="back" label="Back" data={ {thispage: 2, nextpage: 1} }/>
              <button className="blue" onClick={ startSearch }>Start</button>
            </div>
          </Card>

        </div>
      );
    }
  }
  
  export default DataPusher;