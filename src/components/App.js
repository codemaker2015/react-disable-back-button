import React from "react";
import { Redirect, Switch, Route, withRouter } from "react-router";

import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";

class App extends React.Component {
  constructor(props) {
    super(props);

    // Store the previous pathname and search strings
    this.currentPathname = null;
    this.currentSearch = null;
  }

  componentDidMount() {
    const { history } = this.props;

    history.listen((newLocation, action) => {
      if (action === "PUSH") {
        if (
          newLocation.pathname !== this.currentPathname ||
          newLocation.search !== this.currentSearch
        ) {
          this.currentPathname = newLocation.pathname;
          this.currentSearch = newLocation.search;

          history.push({
            pathname: newLocation.pathname,
            search: newLocation.search
          });
        }
      } else {
        history.go(1);
      }
    });
  }

  componentWillUnmount() {
    window.onpopstate = null;
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/page1" />} />
        <Route path="/page1" component={Page1} />
        <Route path="/page2" component={Page2} />
        <Route path="/page3" component={Page3} />
      </Switch>
    );
  }
}

export default withRouter(App);
