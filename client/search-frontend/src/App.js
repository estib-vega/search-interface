import {Component } from 'inferno';
import './registerServiceWorker';
import './css/App.css';
import DataPusher from './components/DataPusher'

class App extends Component {
  render() {
    return (
      <div className="background-wrapper">
        <DataPusher/>
      </div>
    );
  }
}

export default App;
