import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import SlideShow from "./components/SlideShow";
import Example from "./components/Example";
import SlideShow2 from "./components/SlideShow2";
import Test from "./components/Test";
import Home from "./components/Home";
import Obiective from "./components/Obiective";
import Tipes from "./components/Tipes";
import Obiectiv from "./components/ObiectivC";
import Login from "./components/Login";
import Register from "./components/Register";
import Axios from "axios";
import Header_logged from "./components/Header_logged";
import ObiectivC from "./components/ObiectivC";

export default function App() {

    const [isLogged, setIsLogged] = useState(0)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkIfIsLogged();
    }, []);


    const checkIfIsLogged = () => {

        Axios.get('http://localhost:3001/session', {withCredentials:true}).then((response) => {

            setIsLogged(response.status);
            console.log(response.status);
            console.log(isLogged);
            setIsLoading(false);
        })
    }

    if (isLoading) {
        // Afișează un component de încărcare sau altă indicație vizuală în timp ce se așteaptă răspunsul
        return <div>Loading...</div>;
      }

    if (isLogged === 200) {
        return (
            <>
                <Header_logged />
                <div className="container">

                    {/* <SlideShow /> */}
                    {/* <Example /> */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/obiective" element={<Obiective />} />
                        <Route path="/tipes" element={<Tipes />} />
                        <Route path="/test" element={<Test />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/obiectivC" element={<ObiectivC />} />
                    </Routes>

                </div>
            </>
        )
    }
    else {

        return (
            <>
                <Header />
                <div className="container">

                    {/* <SlideShow /> */}
                    {/* <Example /> */}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/obiective" element={<Obiective />} />
                        <Route path="/tipes" element={<Tipes />} />
                        <Route path="/test" element={<Test />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/obiectivC" element={<Obiectiv />} />
                    </Routes>

                </div>
                
            </>
        )
    }

}