import 'bootstrap/dist/css/bootstrap.min.css';

import Parse from 'parse'
import {environment} from './environment'
import Objects from './components/Objects'


Parse.initialize(environment.APPLICATION_ID, environment.JAVASCRIPT_KEY);
Parse.serverURL = environment.SERVER_URL
Parse.liveQueryServerURL = environment.liveQueryServerURL

function App() {
  return (
    <div className='container'>
      <div className='display-4 text-secondary mb-4'>Test Web Editor</div>
      <Objects />
    </div>
  );
}

export default App;
