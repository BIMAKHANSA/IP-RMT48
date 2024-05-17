import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { auth } from './firebase';
import Books from './components/Books';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import Recommendations from './components/Recommendations';
import SearchBooks from './components/SearchBooks';
import SignIn from './components/SignIn';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div>
        {user ? (
          <>
            <Switch>
              <ProtectedRoute path="/" exact component={Books} user={user} />
              <ProtectedRoute path="/add" component={AddBook} user={user} />
              <ProtectedRoute path="/edit/:id" component={EditBook} user={user} />
              <ProtectedRoute path="/search" component={SearchBooks} user={user} />
            </Switch>
            <Recommendations />
            <button onClick={() => auth.signOut()}>Sign Out</button>
          </>
        ) : (
          <SignIn />
        )}
      </div>
    </Router>
  );
};

export default App;