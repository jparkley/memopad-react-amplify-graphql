import { useState, useEffect } from 'react'
import { Auth, Hub } from 'aws-amplify'
// import { Greetings } from 'aws-amplify-react' -> Custom Sign Out implemented instead

import { withAuthenticator } from '@aws-amplify/ui-react'
import { API, graphqlOperation} from 'aws-amplify'

import { listMemos } from './graphql/queries'
import CustomSignOutButton from './components/layout/CustomSignOutButton'
import AddMemo from './components/AddMemo'
import ListMemos from './components/ListMemos'
import './App.css';

function App() {

  const [memos, setMemos] = useState([])

  useEffect(() => {
    const getMemos = async () => {
      const res = await API.graphql(graphqlOperation(listMemos))
      setMemos(res.data.listMemos.items)
    }
    getMemos()
  }, [])

  /* Custom sign out button */
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
          <img src="./memo.png" alt="Logo" />
          <h2>Memopad RA</h2>
        </div>
        <div className="">     
          <CustomSignOutButton handleSignOut={handleSignOut} />
          {/* <Greetings />  */}
        </div>
      </div>
      <div className="container">
        <AddMemo memos={memos} setMemos={setMemos} />
        <ListMemos memos={memos} setMemos={setMemos} />
      </div>
    </>
  );
}

export default withAuthenticator(App);
