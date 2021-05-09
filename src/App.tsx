import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
import UserDashboard from "./pages/User/UserDashboard";
import CreateAccount from "./pages/CreateAccount";
import NotFound from "./pages/NotFound";
import { Monitoring } from "./pages/Monitoring";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={UserDashboard} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/create-account" component={CreateAccount} />
        <Route path="/monitoring">
          <PrivateRoute component={Monitoring} />
        </Route>

        {/* Private Routes */}
        <Route path="/admin">
          <PrivateRoute component={AdminDashboard} />
        </Route>

        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
