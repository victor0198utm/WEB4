import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./pages/Main";
import Questions from "./pages/Questions";
import Score from "./pages/Score";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NewQuiz from "./pages/NewQuiz";

function App() {
  return (
    <Router>
        <div className="main">
          <Switch>
            <Route path="/" exact>
              <Register/>
            </Route>
            <Route path="/browse" exact>
              <Main />
            </Route>
            <Route path="/profile" exact>
              <Profile />
            </Route>
            <Route path="/questions">
              <Questions />
            </Route>
            <Route path="/score">
              <Score />
            </Route>
            <Route path="/create">
              <NewQuiz />
            </Route>
          </Switch>
        </div>
    </Router>
  );
}

export default App;
