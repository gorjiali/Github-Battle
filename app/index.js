import * as React from "react";
import * as ReactDOM from "react-dom";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./index.css";
import Nav from "./components/Nav";
import Loading from "./components/Loading";
import { ThemeProvider } from "./contexts/theme";
const Popular = React.lazy(() => import("./components/Popular"));
const Battle = React.lazy(() => import("./components/Battle"));
const Results = React.lazy(() => import("./components/Results"));

class App extends React.Component {
  state = {
    theme: "light",
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === "light" ? "dark" : "light",
      }));
    },
  };
  render() {
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={this.state.theme}>
            <div className="container">
              <Nav />

              <React.Suspense fallback={<Loading />}>
                <Switch>
                  <Route exact path="/" component={Popular}></Route>
                  <Route exact path="/battle" component={Battle}></Route>
                  <Route path="/battle/results" component={Results}></Route>
                  <Route render={() => <h1>404 - NOT FOUND 🥺</h1>}></Route>
                </Switch>
              </React.Suspense>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
