import './index.css';
import HomePage from './Pages/homepage'
import SignInOutContainer from './Containers/index'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import voterverifyPage from './Pages/voteridver';
import contactsPage from './Pages/contacts';
import VotedayPage from './Pages/votingday';
import Notfound from './Pages/notfound';
import DisplayResult from './Pages/displayresults';


export default function App() {


  return (
    <Router>
      <Switch>
      <Route path ="/" component ={SignInOutContainer} exact = {true}/>
      <Route path="/home" component = {DisplayResult} />
      <Route path ="/homepage" component ={HomePage}/>
      <Route path ="/voterver" component ={voterverifyPage}/>
      <Route path ="/about" component ={contactsPage}/>
      <Route path ="/voteday" component ={VotedayPage}/>
      <Route path ="*" component ={Notfound}/>
      </Switch>
    </Router>
  );
}

 