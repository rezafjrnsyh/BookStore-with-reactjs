import React, {useState} from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import Login from "./components/Login/Login";
import useToken from "./components/useToken";
import Header from './components/header'
import Books from "./books/Books";

function App() {
    const { token, setToken } = useToken();
    const [ valid, setValid ] = useState(false)

    if (!valid) {
        return <Login setValid={setValid} setToken={setToken} />
    }
    return (
        <div className="App">
            <Header/>
            <Switch>
                <Route exact path="/" component={Dashboard}/>
                <Route path="/books" component={Books}/>
            </Switch>
        </div>
      );
}

export default App;
