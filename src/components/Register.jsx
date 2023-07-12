import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [checkPassLengh, setPassLength] = useState(true);

    const [checkEmail, setCheckEmail] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [checkInputErr, setCheckInputErr] = useState(false);

    const navigate = useNavigate();
    

    const handlePasswordChange = (event) => {
        const trimmedPassword = event.target.value.trim();
        setPassword(trimmedPassword);
        console.log(trimmedPassword)

        if (trimmedPassword.length < 8 && trimmedPassword.length !== 0) {
            setPassLength(false);
        } else {
            setPassLength(true);
        }
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (username.trim() && email.trim() && password.trim() && confirmPassword.trim()) {
            // Toate câmpurile sunt completate
            if (password === confirmPassword && checkPassLengh) {
                // Parolele coincid
                setPasswordsMatch(true);
                // Execută acțiunile corespunzătoare
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const day = String(currentDate.getDate()).padStart(2, '0');

                const formattedDate = `${year}-${month}-${day}`;

                Axios.post("http://localhost:3001/register2", {
                    name: username,
                    email: email,
                    password: password,
                    date: formattedDate
                })
                    .then((res) => {
                        if (res.status === 200) {
                            console.log("succes registration");
                            setShowConfirmation(true);
                            setCountdown(5);
                            setCheckInputErr(false);
                            setCheckEmail(true);
                            setUsername("");
                            setEmail("");
                            setPassword("");
                            setConfirmPassword("");
                            // Redirecționează către o altă rută după 3 secunde
                            setTimeout(() => {
                                navigate("/login");
                            }, 5000);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        if (err.response.status === 409) {
                            console.log("email taken");
                            setCheckEmail(false);
                            setCheckInputErr(false);
                        }
                    });
            } else {
                // Parolele nu coincid
                setPasswordsMatch(false);
                setCheckInputErr(false);
                // Execută acțiunile corespunzătoare
            }
        } else {
            // Unul sau mai multe câmpuri sunt goale
            console.log("Completați toate câmpurile.");
            setCheckInputErr(true);
            setShowConfirmation(false);
            setCheckEmail(true);
        }
    };

    useEffect(() => {
        let timer;
        if (showConfirmation && countdown > 0) {
          timer = setTimeout(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
          }, 1000);
        }
    
        return () => {
          clearTimeout(timer);
        };
      }, [showConfirmation, countdown]);


    return (
        <div className="loginDiv">
            <div className="formLogin">
                <h4>Register</h4>
                {checkInputErr && <p className="register-error">Completați toate câmpurile.</p>}
                <form>
                    <div className="input-container">
                        <label>Username </label>
                        <input
                            type="text"
                            name="uname"
                            value={username}
                            maxLength="25"
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label>Email </label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            maxLength="25"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {!checkEmail && <p className="register-error">Adresa de email este deja folosita.</p>}
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input
                            type="password"
                            name="pass"
                            value={password}
                            maxLength="25"
                            onChange={handlePasswordChange}
                            required
                        />
                        {!checkPassLengh && <p className="register-error">Parola trebuie sa contina mai mult de 8 caractere.</p>}
                    </div>
                    <div className="input-container">
                        <label>Re-Password </label>
                        <input
                            type="password"
                            name="pass"
                            value={confirmPassword}
                            maxLength="25"
                            onChange={handleConfirmPasswordChange}
                            required
                        />
                        {!passwordsMatch && <p className="register-error">Parolele nu coincid.</p>}

                    </div>
                    <div className="button-container">
                        <input type="submit" onClick={handleSubmit} />
                        {showConfirmation && <p className="register-confirm">Te-ai inregistrat cu succes!</p>}
                    </div>
                </form>
                        {showConfirmation && <p className="register-confirm">Redirecționare către pagina acasa în {countdown} secunde. </p>}
            </div>
        </div>
    );
}
