import { Component } from 'inferno';
import './registerServiceWorker';
import './css/App.css';
import SearchPane from './components/SearchPane'
import DataPusher from './components/DataPusher'

class App extends Component {
  render() {
    return (
      <div className="background-wrapper">
        <DataPusher/>
        <SearchPane/>
      </div>
    );
  }
}

export default App;
