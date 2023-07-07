import Axios from "axios";
import React, { useState } from "react";
import { Link, resolvePath } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();


    const [email, setName] = useState("");
    const [password, setPassword] = useState("");

    const [checkAccount, setCheckAccount] = useState(true);

      
    const handleLogin = (event) => {
        event.preventDefault();
        const credentials = {
        email: email,
        password: password
        };
    
        Axios.post('http://localhost:3001/auth', credentials, {withCredentials: true})
        .then(response => {
            if (response.status === 200) {
            console.log('Autentificare reușită!');
            navigate("/home")
            // Executați acțiuni corespunzătoare pentru autentificarea reușită
            } else {
            console.log('Autentificare eșuată!');
            // Executați acțiuni corespunzătoare pentru autentificarea eșuată
            }
        })
        .catch(error => {
            console.error('Eroare:', error);
            if (error.response.status === 404) {
                setCheckAccount(false)
                setName("")
                setPassword("")
            }
        });
    };
      



    return (
        <div className="loginDiv">
            <div className="formLogin">
                <h4>Login</h4>
                <form>
                    <div className="input-container">
                        <label>Email </label>
                        <input
                            type="text"
                            name="uname"
                            value={email}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input
                            type="password"
                            name="pass"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="button-container">
                        <input type="submit" onClick={handleLogin}/>
                        {!checkAccount && <p className="register-error"> Nume sau parola incorecta.</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}
