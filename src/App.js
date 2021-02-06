import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { store } from "./redux";
import { Register } from "./components/Register";
import { Messenger } from "./components/Messenger";

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/chat">
          <Messenger></Messenger>
        </Route>
        <Route path="/" exact>
          <Register></Register>
        </Route>
      </Switch>
    </Router>
  </Provider>
);

export default App;
