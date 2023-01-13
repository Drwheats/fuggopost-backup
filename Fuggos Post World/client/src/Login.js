import {useState} from "react";

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onChangeUser = (e) =>{
        setUsername(e.target.value)
        console.log(e.target.value)
    }
    const onChangePassword = (e) =>{
        setPassword(e.target.value)
        console.log(e.target.value)
    }

    return (
        <div>

            <div className="content">
                <h1>Coming Soon to Fuggo's Post World Premium®</h1>
                <p>No worries - you can practice logging in using the console below!</p>
                <br/>
                <div className="loginButton">
                    <span>
                    <label>Username</label><input onChange={onChangeUser}/>
                        </span>
                    <span>
                    <label>Password </label><input type="password" onChange={onChangePassword}/>
                        </span>

                    <button className="gobutton" style={{marginRight: 100 + 'rem'}} onClick={()=>{
                        if (password !== "" && username !== ""){
                            alert("Great Job! You signed in properly!")}
                        else {alert("Uh oh! You didn't sign in properly - Try again!" +
                            "\n\n" +
                            "HINT: Make sure that you enter both your username and password!")}

                    }}>Go!</button>
                </div>
            </div>
        </div>

    )
}