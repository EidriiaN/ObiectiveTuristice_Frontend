import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useMatch, useResolvedPath, useNavigate, Navigate } from "react-router-dom";

export default function Header() {

    const [searchData, setSearchData] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        if (searchData === null) {

            Axios.get("http://localhost:3001/searchData", { withCredentials: true })
                .then((result) => {
                    setSearchData(result.data);
                    console.log("Respons", result)
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    }, [searchData])


    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchValue(value);

    };

    const onSearch = (searchTerm) => {
        setSearchValue(searchTerm)
    }

    const handeSearchButton = () => {

        const foundItem = searchData.find((item) => item.nume === searchValue);

        if (foundItem) {
            
            Axios.post("http://localhost:3001/obiectiveC", { id: foundItem.id, tip: foundItem.tip_obiectiv }).then((response) => {
                const dataWithId = { data: { ...response.data[0], id: foundItem.id } };
                setSearchValue("");
                navigate(`/obiectivC`, { state: { ...dataWithId } });
            });
        }

    }    

    const useHandleRegisterClick = () => {
            // Executați acțiunile necesare pentru înregistrare
            const navigate = useNavigate();

            // Redirecționați către ruta "Register" pentru a reseta starea componentei
            navigate("/register");
        };

        return (

            <div className="header">

                <div className="header--text">

                    <CustomLink to="/home">Home</CustomLink>
                    <CustomLink to="/obiective">Obiective turistice</CustomLink>
                    <CustomLink to="/tipes">Tipuri de obiective turistice</CustomLink>
                    <CustomLink to="/test">Test</CustomLink>

                </div>
                <div className="search-wrapper">

                    <div className="search">
                        <input type="text" className="search__input" placeholder="Cauta locatia" value={searchValue} onChange={handleSearch} />
                        <button className="search__button" onClick={handeSearchButton}>
                            <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
                                <g>
                                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                                </g>
                            </svg>
                        </button>
                    </div>

                    <div className="search-dropdown">
                        {searchData && searchData.filter(item => {
                            const searchTerm = searchValue.toLowerCase();
                            const name = item.nume.toLowerCase();

                            return searchTerm && name.startsWith(searchTerm) && name !== searchTerm;
                        })
                            .map((item) => (
                                <div className="dropdown-item" key={item.id} onClick={() => onSearch(item.nume)}>
                                    {item.nume}
                                </div>
                            ))}
                    </div>
                </div>

                <div className="login_register">

                    <CustomLink className="login" to="/login">Login</CustomLink>
                    <CustomLink className="register" to="/register" onClick={useHandleRegisterClick}>Register</CustomLink>



                </div>

            </div>
        )
    }

    function CustomLink({ to, children, ...props }) {

        const resolvePatch = useResolvedPath(to)
        const isActive = useMatch({ path: resolvePatch.pathname, end: true })
        return (
            <Link className={isActive ? "active" : ""} to={to} {...props}>
                {children}
            </Link>
        )

    }