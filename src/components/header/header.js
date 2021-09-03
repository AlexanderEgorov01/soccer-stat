import React from 'react';

import "./header.css"
import {Link} from "react-router-dom"

const Header = () => {
    return (
        <div className="navbar-light bg-light">
            <nav className="container d-flex flex-row">
                <Link to="/" className="ml-2">
                    <img
                        src={process.env.PUBLIC_URL + '/favicon.ico'}
                        alt="error icon"
                        className="header-icon"/>
                </Link>
                <Link to="/" className="navbar-brand ml-2 mr-2">
                    SoccerStat
                </Link>
                <Link to="/competitions/" className="header-tabs ml-2 mr-1">
                    Competitions
                </Link>
                <Link to="/teams/" className="header-tabs ml-1 mr-2">
                    Teams
                </Link>
            </nav>
        </div>

    );
};

export default Header;