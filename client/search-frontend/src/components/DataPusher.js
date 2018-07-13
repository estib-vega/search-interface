import { linkEvent, Component } from 'inferno';
import { nextPage } from '../model/search_model'
import '../css/DataPusher.css'
import '../css/Animations.css'

// custom button component
const PageButton = ({cl, label, data}) => (
  <button onClick={ linkEvent(data, nextPage) } className={ cl }>{label}</button>
)


class DataPusher extends Component {
    render() {
      return (
        <div className="data-pusher">
          <div className="card" id="step_0">
            <h2>1. Please enter your credentials for Algolia</h2>
            <input type="text" name="app_id" id="app_id" placeholder="App Id"/>
            <input type="text" name="api_key" id="api_key" placeholder="API Key"/>
            <input type="text" name="index_name" id="index_name" placeholder="Index Name"/>
            <PageButton cl="next" label="Next" data={{thispage: 0, nextpage: 1}}/>
          </div>

          <div className="card" id="step_1">
            <h2>2. Push data to the Algolia Index</h2>
            <p>This step is optional, if the records have been previously pushed to the index.</p>
            <div className="input-container">
              <input type="file" name="input_file" id="input_file" className="inputfile" accept=".json"/>
              <label id="file_label" for="input_file" className="blue">Choose a file</label>
            </div>
            <div className="button-container">
              <PageButton cl="next" label="Next" data={{thispage: 1, nextpage: 2}}/>
              <PageButton cl="back" label="Back" data={{thispage: 1, nextpage: 0}}/>
            </div>
          </div>

          <div className="card" id="step_2">
            <h2>3. Start demo</h2>
            <p>The setup should be done by now. Have fun searching!</p>
            <div class="input-container">
              <PageButton cl="back" label="Back" data={{thispage: 2, nextpage: 1}}/>
              <button className="blue">Start</button>
            </div>
          </div>

        </div>
      );
    }
  }
  
  export default DataPusher;