import { useHistory } from "react-router-dom";
import QuestionCreation from "../components/QuestionCreation";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";

const NewQuiz = () => {
  const history = useHistory();
//   const { user_ID, name, surname } = useSelector((state) => state);
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const config = require('../config.json');

  const handlerRedirect = event => {
    history.push("/browse");
  };

  const addQuestion = async event => {
    event.preventDefault();

    const question = document.getElementById("question").value;
    const answer1 = document.getElementById("answer1").value;
    const answer2 = document.getElementById("answer2").value;
    const answer3 = document.getElementById("answer3").value;
    const answer4 = document.getElementById("answer4").value;
    const correct = document.getElementById("correct").value;
    const correct_answer = correct<3?(correct==1?answer1:answer2):(correct==3?answer3:answer4);

    console.log(question);
    console.log(answer1);
    console.log(answer2);

    console.log(questions);
    const z = {
        "question": question,
        "answers": [answer1, answer2, answer3, answer4],
        "correct_answer": correct_answer,
    };

    setQuestions([...questions, z]);

    console.log(questions);

    console.log("added");
  }

  const handlerQuizCreation = event => {
    const res = axios.post("https://pure-caverns-82881.herokuapp.com/api/v54/quizzes",  
    {
        "data": {
            "title": quizTitle,
            "questions": questions,
        }
    },
    { headers: { 
        "X-Access-Token": config.token},
    });
    
    console.log("req exec");
    history.push("/browse");
  };

  const handlerTitle = event => {
    const theTitle = document.getElementById("title").value;
    setQuizTitle(theTitle);
  };

  const handleCorrectAnswer = e => {
    if(e.target.value > 4){
        e.target.value = 4;
    }
    if(e.target.value < 1){
        e.target.value = 1;
    }
  };

  return (
    <div>
        {!quizTitle? 
            (<>
                <label htmlFor="title" className="needSomeSpace">Quiz title</label>
                <input className="bigInput" id="title" name="title" type="text" required/>
                <button className="btnStylish backGreen needSomeSpace" onClick={handlerTitle} >Set title</button>
            </>):
            (<div className="main">
                <h2>Title: {quizTitle}</h2>
                {questions.map(q => {
                    return <QuestionCreation key={q.question} data={q}/>
                })}
                <form className="main needSpace" onSubmit={addQuestion}>
                    <label htmlFor="question">Question:</label>
                    <input className="mediumInput" id="question" name="question" type="text" required/>
                    <br/>
                    <label htmlFor="answer1">Answer 1</label>
                    <input className="mediumInput" id="answer1" name="answer1" type="text" required/>
                    <br/>
                    <label htmlFor="answer2">Answer 2</label>
                    <input className="mediumInput" id="answer2" name="answer2" type="text" required/>
                    <br/>
                    <label htmlFor="answer3">Answer 3</label>
                    <input className="mediumInput" id="answer3" name="answer3" type="text" required/>
                    <br/>
                    <label htmlFor="answer4">Answer 4</label>
                    <input className="mediumInput" id="answer4" name="answer4" type="text" required/>
                    <br/>
                    <label htmlFor="correct">Correct answer</label>
                    <input className="mediumInput" id="correct" name="correct" type="number" onChange={handleCorrectAnswer}/>
                    <br/>
                    <button className="btnStylish backGreen needSomeSpace" type="submit">Add</button>
                </form>
                <div >
                <button className="btnStylish needSomeSpace" onClick={handlerRedirect}>Back to quizzes</button>
                <button className="btnStylish backRed needSomeSpace" onClick={handlerQuizCreation}>Create</button>
                
                </div>
            </div>)
        }
    </div>
          
  );
};

export default NewQuiz;
