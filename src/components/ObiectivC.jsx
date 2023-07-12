import React, { useState, useEffect } from "react"
import { useParams, useLocation } from "react-router-dom";
import img from "../images/sphinx-bucegi-romania.jpg"


export default function ObiectivC(props) {

    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
            const fetchedData = location.state && location.state.data && location.state.data;
            setData(fetchedData)
            
            
    }, [location.state]);

    useEffect(() => {

        setLoading(data !== null? false:true)
        console.log(data)

    }, [data])

    var imgs;
    try {
        imgs = require("../images/" + data.id + ".jpg")

    }
    catch (err) {
        imgs = img;
    }

    if (loading) {
        // return <div className="loading">Loading...</div>;
        return <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    }

    if (!data) {
        return <div>No data available.</div>;
    }


    return (

        <div className="obiectivC">

            <div className="obiectivC_content">

                <h2>{data.nume}</h2>
                <p>{data.descriere}</p>
                {data.varf_maxim &&<p>{data.varf_maxim} kilopuli</p>}

            </div>

            <div className="obiectivC_img">
                <img src={imgs} alt="img" />
            </div>

        </div>
    )
}