import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const Profile = () => {
  const history = useHistory();
  const { user_ID, name, surname } = useSelector((state) => state);
  const config = require('../config.json');

  const handlerRedirect = event => {
    history.push("/browse");
  };

  const handlerProfileDeletition = event => {
    localStorage.setItem('QuizAppUserID', 0);
    localStorage.setItem('QuizAppUserName', "");
    localStorage.setItem('QuizAppUserSurname', "");
    const res = axios.delete("https://pure-caverns-82881.herokuapp.com/api/v54/users/"+user_ID,  
    { headers: { 
        "X-Access-Token": config.token},
    });
    
    console.log("deleted");
    history.push("/");
  };

  return (
    <div className="main">
        <h3>My profile</h3>
        <div className="needSpace">

        <p>Name: {name}</p>
        <p>Surname: {surname}</p>
        </div>

        <button className="btnStylish backRed needSomeSpace" onClick={handlerProfileDeletition}>Delete profile</button>

        <button className="btnStylish needSomeSpace" onClick={handlerRedirect}>Back to quizzes</button>
    </div>
          
  );
};

export default Profile;
