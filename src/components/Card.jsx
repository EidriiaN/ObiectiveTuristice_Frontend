import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import img from "../images/sphinx-bucegi-romania.jpg"
export default function Card(props) {

    var imgs;
    try {
        imgs = require("../images/" + props.item.id + ".jpg")

    }
    catch (err) {
        imgs = img;
    }

    const [dbList, setdbList] = useState({});

        const navigate = useNavigate();

    const handleClick = () => {
        Axios.post("http://localhost:3001/obiectiveC", { id: props.item.id, tip: props.item.tip_obiectiv }).then((response) => {
            const dataWithId = {data: {...response.data[0], id: props.item.id} };
            setdbList(dataWithId);
            navigate(`/obiectivC`, { state: { ...dataWithId } });
        });
    }

    return (
        <Link className="card" to={{
            pathname: "/obiectivC",
            state: { data: dbList }
        }}
            onClick={() => handleClick()} >

            <div className="img">

                <img src={imgs} alt="img" />

            </div>
            <div className="description">
                <h3>{props.item.nume}</h3>
                <p>{props.item.descriere}</p>

            </div>
        </Link>
    )
}