import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import WelcomePage from './Components/WelcomePage/WelcomePage'
import Navbar from './Components/Navbar/Navbar'
import Profile from "./Components/Profile/Profile"
import Register from './Components/Register/Register';
import Login from './Components/LogIn/Login'
import Dashboard from './Components/DashBoard/DashBoard';
import NewClientForm from './Components/newClientForm/NewClientForm'

class App extends Component {

  render() {


    return (
      <BrowserRouter >
        <Switch>


          <Route path="/" exact={true} component={() => {
            return (<div className="App"> <Navbar /><WelcomePage /></div>)
          }} />

          <Route path="/auth" exact={true} component={() => {
            return (<div className="App"> <Navbar  isAuth={true}/><WelcomePage /></div>)
          }} />



          <Route path="/Register" exact={true} component={() => {
            return (<div className="App"> <Navbar /><Register /></div>)
          }} />

          <Route path="/SignIn" exact={true} component={() => {
            return (<div className="App"> <Navbar /><Login /></div>)
          }} />

          <Route path="/DashboardAuth" exact={true} component={() => {
            return (<div className="App"> <Navbar isAuth={true} /><Dashboard /></div>)
          }} />

          <Route path="/DashboardNotAuth" exact={true} component={() => {
            return (<div className="App"> <Navbar isAuth={false} /><WelcomePage /></div>)
          }} />

          <Route path="/newClientForm" exact={true} component={() => {
            return (<div className="App"> <Navbar isAuth={true} /><NewClientForm /></div>)
          }} />


          <Route path="/Profile" exact={true} component={() => {
            return (<div className="App"> <Navbar isAuth={true} /><Profile/></div>)
          }} />


        </Switch>
      </BrowserRouter>)
  }
}

export default App;
