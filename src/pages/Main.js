import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleQuizIDChange, handleScoreChange } from "../redux/actions";

const Settings = () => {
  const { user_ID, name, surname } = useSelector((state) => state);
  const { response, error, loading } = useAxios({ url: "/quizzes" });
  const history = useHistory();
  const disptach = useDispatch();

  useEffect(() => {
    if(localStorage.getItem('QuizAppUserID') && !user_ID){
      history.push("/");
    }

  }, [user_ID, name, surname]);

  useEffect(() => {
    if (!loading){
      disptach(handleQuizIDChange(response[0].id));
    }

  }, [loading]);

  if (loading) {
    return (
      <div main>
        <h3>Loading...</h3>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    disptach(handleScoreChange(0));
    history.push("/questions");
  };

  const changeSelectedQuiz = t =>{
    disptach(handleQuizIDChange(response[t.target.selectedIndex].id));
  };

  const handleProfile = event => {
    history.push("/profile");
  };

  const handleNewQuiz = event => {
    history.push("/create");
  };

  return (
    <div className="main">
      <form onSubmit={handleSubmit} className="main">
        <h1>Choose a quiz</h1>
        <div>
          <select onChange={changeSelectedQuiz} className="quizSelect">
            {response.map(item => {
              return <option key={item.title}>{item.title}</option>
            })}
          </select>
          <button type="submit" className="btnStylish backGreen">
            Get Started
          </button>
        </div>
      </form>
      <br/>
      <div>
        <button onClick={handleNewQuiz} className="btnStylish backYellow needSpace">Create new quiz</button>
        <button onClick={handleProfile} className="btnStylish backBlue needSpace">My profile</button>
      </div>
      
    </div>
  );
};

export default Settings;
