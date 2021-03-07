import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
import UserDashboard from "./pages/User/UserDashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={UserDashboard} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

        {/* Private Routes */}
        <Route path="/admin">
          <PrivateRoute component={AdminDashboard} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
