import { useState } from 'react';
import './App.css';
import LoginOrCreate from './components/LogInOrCreate';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Addnew from './components/Addnew';
import CreateAcc from './components/CreateAcc';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  const [user,setUser] = useState(null)
  const [notes,setNotes] = useState(null)
  return (
    <Router>
      <div className="App h-screen ">
      <Navbar/>
      <Switch>
        <Route path="/" exact >
            {!user && <LoginOrCreate/>}
            {user && <Home user = {user} notes={notes} setNotes={setNotes}/> }
        </Route>
        <Route path="/login">
            <Login setUser ={setUser} />
        </Route>
        <Route path="/addnew">
            <Addnew user={user} notes = {notes} setNotes ={setNotes} />
        </Route>
        <Route path="/createAcc">
            <CreateAcc setUser = {setUser} />
        </Route>
        
      </Switch>
    </div>
    </Router>
  );
}

export default App;
