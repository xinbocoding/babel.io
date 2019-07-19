import React from 'react';
import SignIn from './components/auth/SignIn';
import { FirebaseContext } from './components/firebase';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FirebaseContext.Consumer>
          {firebase => <SignIn firebase={firebase} />}
        </FirebaseContext.Consumer>
      </header>
    </div>
  );
}

export default App;
