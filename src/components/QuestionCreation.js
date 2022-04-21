const QuestionCreation = (props) => {
  const { data } = props;
  const correct_answer = data.correct_answer;

  return (
    <div>
      <p>Question: {data.question}</p>
      <div><p>Answers:</p>
      <ul>
        {data.answers.map(answ => {return <li className={correct_answer==answ?"answCorrect":"answWrong"} key={answ}>{answ}</li>})}
      </ul>
      </div>
    </div>
  );
};

export default QuestionCreation;
