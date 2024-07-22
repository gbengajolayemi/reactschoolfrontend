import React from "react";
import "./Styles/Headerstyle.css"; // Make sure the path is correct based on your project structure
import { Link } from "react-router-dom";


const Header = () => {
    return (
        <div className="container">
            <div className="logo-title-container">
                <div className="Logo-box">
                    <img src="https://uploads.vw-mms.de/system/production/images/vwn/030/145/images/7a0d84d3b718c9a621100e43e581278433114c82/DB2019AL01950_web_1600.jpg?1649155356" 
                    alt="logo" />
                </div>
                <div className="title-box">
                    <Link to="/home" className="title-name"> ACADEMY</Link>

                </div>
            </div>
            <div className="middle-box">
            <Link to="/allstudents" className="m1">All Students</Link>
            <Link to="/ss1studentsresult" className="m2">SS1 RESULT UPLOAD</Link>
            <Link to="/ss2studentsresult" className="m2">SS2 RESULT UPLOAD</Link>
            <Link to="/ss3studentsresult" className="m2">SS3 RESULT UPLOAD</Link>



            </div>
            
        </div>
    );
};

export default Header;
