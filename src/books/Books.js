import React from 'react';
import {Route, Switch} from "react-router-dom";
import List from "./List";
import AddEdit from "./AddEdit";

function Books({ match }) {
    const { path } = match;
    console.log(path)
    return (
        <Switch>
            <Route exact path={path} component={List}/>
            <Route path={`${path}/add`} component={AddEdit} />
            <Route path={`${path}/edit/:id`} component={AddEdit} />
        </Switch>
    );
}

export default Books;
