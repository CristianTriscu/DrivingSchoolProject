import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import WelcomePage from './Components/WelcomePage/WelcomePage';
import Navbar from './Components/Navbar/Navbar';
import Profile from "./Components/Profile/Profile";
import Register from './Components/Register/Register';
import Login from './Components/LogIn/Login';
import Dashboard from './Components/DashBoard/DashBoard';
import NewClientForm from './Components/newClientForm/NewClientForm';
import Footer from './Components/Footer/Footer';
import ParcAuto from './Components/ParcAuto/ParcAuto';
import ClientReservation from './Components/Reservation/ClientReservation';
import MsgInbox from './Components/Messages/MsgInbox';
import GenerateDocuments from './Components/Documents/GenerateDocuments';
export const clientDetails = JSON.parse(localStorage.getItem("client"));

class App extends Component {

  render() {

    const clientInfo = JSON.parse(localStorage.getItem("clientInfo"));
   // console.log(clientRole.result.role)

    return (
      <BrowserRouter >
        <Switch>


          <Route path="/" exact={true} component={() => {
            return (<div className="App"> <Navbar /><WelcomePage /><Footer/></div>)
          }} />

          <Route path="/auth" exact={true} component={() => {
            return (<div className="App"> <Navbar  isAuth={true}/><WelcomePage /> <Footer/></div>)
          }} />

          <Route path="/Reservation" exact={true} component={() => {
            return <div className="App"> <Navbar  isAuth={true}/><ClientReservation/><Footer/></div>
          }} />
         
          <Route path="/Documents" exact={true} component={()=>{
            return <div className="App"><Navbar  isAuth={true}/><GenerateDocuments/><Footer/></div>
          }}/>
           
          
        

          
         

          <Route path="/Register" exact={true} component={() => {
            return (<div className="App"> <Navbar /><Register /><Footer/></div>)
          }} />

          <Route path="/SignIn" exact={true} component={() => {
            return (<div className="App"> <Navbar /><Login /><Footer/></div>)
          }} />

          <Route path="/DashboardAuth" exact={true} component={() => {
            return (<div className="App"> <Navbar isAuth={true} /><Dashboard /><Footer/></div>)
          }} />

          <Route path="/DashboardNotAuth" exact={true} component={() => {
            return (<div className="App"> <Navbar isAuth={false} /><WelcomePage /></div>)
          }} />

          <Route path="/newClientForm" exact={true} component={() => {
            return (<div className="App"> <Navbar isAuth={true} /><NewClientForm /><Footer/></div>)
          }} />


          <Route path="/Profile" exact={true} component={() => {
            return (<div className="App"> <Navbar isAuth={true} /><Profile/><Footer/></div>)
          }} />

          <Route path="/ParcAuto" exact={true} component={() => {
            return (<div className="App"> <Navbar isAuth={true} /><ParcAuto /><Footer/></div>)
          }} />

          <Route path="/Messages" exact={true} component={() => {
            return (<div className="App"> <Navbar isAuth={true} /><MsgInbox/><Footer/></div>)
          }} />

        </Switch>
      </BrowserRouter>)
  }
}

export default App;
