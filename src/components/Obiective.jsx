import React,{useState,useEffect} from "react";
import Axios from "axios";
import Card from "./Card";


export default function Obiective(){

    const [dbList, setdbList] = useState([]);

    useEffect(() => {
        getFromDB(); // Apelul inițial pentru a obține datele de la server\
      }, []);


    const getFromDB = () => {
        Axios.get(window.location.href.replace(":3000",":3001")).then((response) =>{
            setdbList(response.data)
        });
    };


    const cards = dbList.map(item=>{
        // console.log(Object.keys(item))
        return(
            
            <Card
                
                key={item.id} 
                item={item}
            />
        )
    })

    return(

        <div className="obiective">
           <div className="cards">
                {cards}
            </div>

        </div>
    )
}