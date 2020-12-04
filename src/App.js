import React, { Component } from "react";

import AuthLayout from "layouts/Auth/Auth.js";
import AdminLayout from "layouts/Admin/Admin.js";

import { Route, Switch, Redirect } from "react-router-dom";

import { auth, createUserProfileDocument } from "firebase/firebase.utils";

import CurrentUserContext from "./contexts/current-user/current-user.context";

class App extends Component {
  state = {
    currentUser: null,
  };

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapShot) => {
          this.setState(
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data(),
              },
            },
            () => console.log(this.state)
          );
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Switch>
          <CurrentUserContext.Provider value={this.state.currentUser}>
            <Route
              path="/admin"
              render={(props) => <AdminLayout {...props} />}
            />
            <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
            <Redirect from="/" to="/admin/dashboard" />
          </CurrentUserContext.Provider>
        </Switch>
      </div>
    );
  }
}

export default App;
