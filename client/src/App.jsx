import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './src/LoginForm';
import Books from './components/Books';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import Recommendations from './components/Recommendations';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Books} />
          <Route path="/add" component={AddBook} />
          <Route path="/edit/:id" component={EditBook} />
          <Route path="/login" component={LoginForm} />
          <Route path="/home" component={Books} /> {/* Assuming Books is your home page */}
        </Switch>
        <Recommendations />
      </div>
    </Router>
  );
};

export default App;