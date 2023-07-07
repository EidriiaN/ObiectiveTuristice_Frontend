import React, {useState, useEffect } from "react";
import { Link } from "react-router-dom";
import cascade from "../images/cascade.jpg"
import lacuri from "../images/lacuri.jpg"
import peisaje from "../images/peisaje.jpg"
import pesteri from "../images/pesteri.jpg"
import munti from "../images/munti.jpg"
import saline from "../images/saline.jpg"


export default function Tipes() {


    return (


        <div className="tipes">

            <div className="tipes_objective">

                <Link className="tipes_card" to="/obiective?tip=cascadele">
                    <p>Cascade</p>
                    <img src={cascade} alt="cascade" />
                </Link>
 
                <Link className="tipes_card" to="/obiective?tip=lacuri">
                    <p>Lacuri</p>
                    <img src={lacuri} alt="lacuri" />
                </Link>

                <Link className="tipes_card" to="/obiective?tip=peisaje">
                    <p>Peisaje</p>
                    <img src={peisaje} alt="peisaje" />
                </Link>

                <Link className="tipes_card" to="/obiective?tip=pesteri">
                    <p>Pesteri</p>
                    <img src={pesteri} alt="pesteri" />
                </Link>

                <Link className="tipes_card" to="/obiective?tip=munti">
                    <p>Munti</p>
                    <img src={munti} alt="munti" />
                </Link>

                <Link className="tipes_card" to="/obiective?tip=saline">
                    <p>Saline</p>
                    <img src={saline} alt="saline"/>
                </Link>

            </div>

        </div>
    )
}