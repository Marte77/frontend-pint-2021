import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Admin from "./layouts/Admin";
import Login from "./view/login";
import SignUp from "./view/registar";
import AdminLayout from "layouts/Admin.js";
import addAlerta from "./views/adicionarAlerta";
function App() {
  return (<Router>

          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/registar" component={SignUp} />
            <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
            <Route path="/adicionarAlerta" component={addAlerta} />  
            //após o login, entra na aba
          </Switch>

    
    </Router>
  );
}
export default App;
