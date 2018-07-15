import { Component } from 'inferno';
import './registerServiceWorker';
import './css/App.css';
import SearchPane from './components/SearchPane'

class App extends Component {
  render() {
    return (
      <div className="background-wrapper">
        <SearchPane/>
      </div>
    );
  }
}

export default App;
