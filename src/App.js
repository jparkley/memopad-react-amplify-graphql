import { useState } from 'react'
import { Auth, Hub } from 'aws-amplify'
// import { Greetings } from 'aws-amplify-react' -> Custom Sign Out
import { withAuthenticator } from '@aws-amplify/ui-react'

import CustomSignOutButton from './components/layout/CustomSignOutButton'
import AddMemo from './components/AddMemo'
import './App.css';

function App() {

  const [memos, setMemos] = useState([])

  /* Custom sign out for custom button */
  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      Hub.dispatch('UI Auth', {   // channel: 'UI Auth'
          event: 'AuthStateChange',
          message: 'signedout'
      });
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }

  return (
    <>
    <div className="navbar">
      <div className="navbar-brand">
        <img src="./memo.png" alt="" />
        <h2>Memopad RA</h2> 
      </div>
      <div className="greetings">        
        <CustomSignOutButton handleSignOut={handleSignOut} />        
        {/* <Greetings />  */}
      </div>      
    </div>
    <div className="container">
      <AddMemo />
    </div>
    </>
  );
}

export default withAuthenticator(App);
