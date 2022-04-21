import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { handleScoreChange } from "../redux/actions";

const Score = () => {
  const disptach = useDispatch();
  const history = useHistory();
  const { score } = useSelector((state) => state);

  const handleBackToSettings = () => {
    disptach(handleScoreChange(0));
    history.push("/browse");
  };

  return (
    <div className="main">
      <h3>
        Score: {score}p
      </h3>
      <button onClick={handleBackToSettings} className="btnStylish">
        back to quizzes
      </button>
    </div>
  );
};

export default Score;
