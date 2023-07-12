import React from "react";

export default function TestCard(props){

    return(

        <div className="test-card">

            <p>Nume: {props.item.name} </p>
            <p>Email: {props.item.email}</p>
            <p>Parola: {props.item.password}</p>

        </div>
    )
}