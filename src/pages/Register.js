import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { handleUserIDChange, handleUserNameChange, handleUserSurnameChange } from "../redux/actions";

const Register = () => {
    const config = require('../config.json');
    const [name, setName] = useState();
    const [surname, setSurname] = useState();
    const disptach = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('QuizAppUserID')!=null && localStorage.getItem('QuizAppUserID')>0){
            disptach(handleUserIDChange(localStorage.getItem('QuizAppUserID')));
            disptach(handleUserNameChange(localStorage.getItem('QuizAppUserName')));
            disptach(handleUserSurnameChange(localStorage.getItem('QuizAppUserSurname')));

            console.log("setting");
            console.log(localStorage.getItem('QuizAppUserID'));
            history.push("/browse");
        }
    }, []);

    const registerUser = async event => {
        event.preventDefault();
        
        const res = await axios.post("https://pure-caverns-82881.herokuapp.com/api/v54/users",  
        {
            "data": {
                "name": name,
                "surname": surname
            }
        }, 
        { headers: { 
            "X-Access-Token": config.token},
        });
    
        const result = await res;
        disptach(handleUserIDChange(result.data.id));
        disptach(handleUserNameChange(result.data.name));
        disptach(handleUserSurnameChange(result.data.surname));

        localStorage.setItem('QuizAppUserID', result.data.id);
        localStorage.setItem('QuizAppUserName', result.data.name);
        localStorage.setItem('QuizAppUserSurname', result.data.surname);

        history.push("/browse");
    };

    const handleNameInput = event => {
        setName(event.target.value);
    };

    const handleSurnameInput = event => {
        setSurname(event.target.value);
    };

    return (
        <form onSubmit={registerUser} className="main">
            <div className="needSpace">
            <label htmlFor="name">Name</label>
            <input className="mediumInput marginLeft" id="name" name="name" type="text" autoComplete="name" required onChange={handleNameInput}/>
            <br/>
            </div>
            <div>
            <label htmlFor="surname">Surname</label>
            <input  className="mediumInput marginLeft" id="surname" name="surname" type="text" autoComplete="surname" required onChange={handleSurnameInput}/>
            </div>
            
            <button  className="btnStylish backYellow needSpace" type="submit">Register</button>
        </form>
    )
};

export default Register;
