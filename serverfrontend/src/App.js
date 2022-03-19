import { Switch, Route, } from "react-router";
import Dashboard from "./components/Dashboard";
import Attendance from "./components/Attendance";
import Login from "./components/Login";


function App() {


  return (
    <>
    <Switch>
      <Route exact path="/login" component={Login}></Route>
    <Route exact path="/" component={Dashboard}></Route>
    <Route exact path="/attendance" component={Attendance}></Route>
    </Switch>
  </>
  );
}

export default App;
