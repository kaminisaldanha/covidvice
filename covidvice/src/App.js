import React, { Component } from "react";
import Create from "./components/Create";
import Post from "./components/Post";
import fire from "./fire";
import "./Imports";

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Home from "./components/Home";
import { Account } from "./components/Account";
import Comment from "./components/Comment";
import Login_Signup from "./components/Login_Signup";
// import { PrivateRoute } from "./components/PrivateRoute";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFilter: "",
      posts: [],
      messages: []
    };
  }

  componentDidMount() { }

  handleSearch() { }

  handleFilter() { }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="header">
            <div className="headerContent">
              <h1>
                <Link className="HomeBtn" to="/">
                  covidvice
                </Link>
              </h1>
              <div className="searchbar">
                <input
                  type="text"
                  className="searchInput"
                  placeholder="Search..."
                />
              </div>
              <Link className="account" to="/account">
                <div>profile</div>
              </Link>
            </div>
          </header>
          <div className="appBody">
            <Route exact path="/">
              <Home />
            </Route>
            <PrivateRoute path="/create">
              <Create />
            </PrivateRoute>
            {/* <Route path="/create">
              <Create />
            </Route> */}
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/comment">
              <Comment />
            </Route>
            <Route path="/login_signup">
              <Login_Signup />
            </Route>
            <Route path={`/post/:postId`} component={Post}></Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

function authCheck() {
  var user = fire.auth().currentUser;
  console.log(user);
  if (!user) {
    console.log("returning false");
    return false;
  } else {
    console.log("returning true");
    return true;
  }
  // fire.auth().currentUser(function (user) {
  //     if (!user) {
  //         console.log("returning false");
  //         return false;
  //     }else{
  //         console.log("returning true");
  //         return true;
  //     }
  // });
};
function auth() {
  var user = fire.auth().currentUser;
  if (user) {
    return true;
  } else {
    return false;
  }
}
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth() ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login_signup",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}