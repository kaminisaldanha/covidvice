import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import "../css/Home.css";

export function PrivateRoute({ children, ...rest }) {
    console.log(children);
    console.log(...rest);
  
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated? (
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