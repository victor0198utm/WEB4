import { decode } from "html-entities";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import useAxios from "../hooks/useAxios";
import { handleScoreChange } from "../redux/actions";
import axios from "axios";

const Questions = () => {
  const {
    score,
    quiz_ID,
    user_ID
  } = useSelector((state) => state);

  const config = require('../config.json');

  const history = useHistory();
  const dispatch = useDispatch();

  let apiUrl = "/quizzes/"+quiz_ID;

  const { response, loading } = useAxios({ url: apiUrl, p:{"user_id": user_ID} });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (response?.questions.length) {
      setOptions(response.questions[questionIndex].answers);
    }

    if(response?.questions[questionIndex].submitted_answer){
      if (response.questions[questionIndex].answered_correctly) {
        dispatch(handleScoreChange(score + 1));
      }
      setQuestionIndex(questionIndex + 1);
      if (questionIndex + 1 < response.questions.length) {
        setQuestionIndex(questionIndex + 1);
      } else {
        history.push("/score");
      }
    }
  }, [response, questionIndex]);


  useEffect(() => {
    if (!loading) {
      console.log(response);
    }
  }, [loading]);

  if (loading) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }

  const handleClickAnswer = (e) => {
    axios.post("https://pure-caverns-82881.herokuapp.com/api/v54/quizzes/"+quiz_ID+"/submit",  
    {
      "data": {
        "question_id": response.questions[questionIndex].id,
        "answer": e.target.textContent,
        "user_id": user_ID
      }
    }, 
    { headers: { 
        "X-Access-Token": config.token},
    })
    .then(result => {
      console.log(result);
      if (result.data.correct) {
        dispatch(handleScoreChange(score + 1));
      }
    });

    if (questionIndex + 1 < response.questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      history.push("/score");
    }
  };

  const handlerToQuizzes = event => {
    history.push("/browse");
  };

  return (
    <div className="main wide">
      <h3>Quiz: {response.title}</h3>
      <p>Question {questionIndex + 1}</p>
      <div className="main">
        <h2>
          {response.questions[questionIndex].question}
        </h2>
        <div>
        {options.map((data) => (
            <button key={data} className="btnStylish needSomeSpace" onClick={handleClickAnswer}>
              {decode(data)}
            </button>
        ))}
        </div>
      </div>
      <div className="needSpace">
        Score: {score} / {response.questions.length}
      </div>
      <button onClick={handlerToQuizzes} className="btnStylish backRed">Back to quizzes</button>
    </div>
  );
};

export default Questions;
