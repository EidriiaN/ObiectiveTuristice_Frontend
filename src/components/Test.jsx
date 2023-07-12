import React, { useState, useEffect } from "react";
import TestCard from "./TestCard";
import Axios from 'axios';


export default function Test(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [dbList, setdbList] = useState([]);

    const addToDB = () => {
        Axios.post("http://localhost:3001/create", {
            name: name,
            email: email,
            password: password
        }).then(() =>{
            console.log("succes");
        });
    };

    useEffect(() => {
        getFromDB(); // Apelul inițial pentru a obține datele de la server
      }, []);


    const getFromDB = () => {
        Axios.get("http://localhost:3001/getFromDB").then((response) =>{
            setdbList(response.data)
        });
    };

    const cards = dbList.map(item=>{

        return(
            <TestCard

                key={item.id} 
                item={item}
            />
        )
    })


    return(

        <div className="test">
            <form>
                <label>Nume</label>
                <input
                    type="text"
                    onChange={(Event) => {
                        setName(Event.target.value);
                    }}
                />
                <label>Email</label>
                <input 
                    type="text"
                    onChange={(Event) => {
                        setEmail(Event.target.value);
                    }} 
                />
                <label>Password</label>
                <input 
                    type="text"
                    onChange={(Event) => {
                        setPassword(Event.target.value);
                    }} 
                />
                <button onClick={addToDB}> SendData </button>
            </form>
            <button onClick={getFromDB}> GetData  </button>
            <section className="card-list">
                {cards}
            </section>

        </div>
    )
}