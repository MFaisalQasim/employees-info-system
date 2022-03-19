import './Attendance.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


function Attendance() {

    const [attendace, setAttendance] = useState([]);
    useEffect(() => {
        loadAttendance();
    }, []);


    const loadAttendance = async () => {
        const response = await axios.get('http://localhost:9002/user/attedance')
        console.log(response);
        console.log(typeof (response.data));
        setAttendance(response.data);
    }


    return (
        <>
            <div className="area"></div>
            <nav className="main-menu">
                <ul>
                    <li>
                        <a href="/">
                            <i className="fa fa-home fa-2x"></i>
                            <span className="nav-text">
                                Dashboard
                            </span>
                        </a>

                    </li>
                    <li className="has-subnav">
                        <a href="/">
                            <i className="fa fa-laptop fa-2x"></i>
                            <span className="nav-text">
                                Stars Components
                            </span>
                        </a>

                    </li>
                    <li className="has-subnav">
                        <a href="/">
                            <i className="fa fa-list fa-2x"></i>
                            <span className="nav-text">
                                Forms
                            </span>
                        </a>

                    </li>
                    <li className="has-subnav">
                        <a href="/">
                            <i className="fa fa-folder-open fa-2x"></i>
                            <span className="nav-text">
                                Pages
                            </span>
                        </a>

                    </li>
                    <li>
                        <a href="/">
                            <i className="fa fa-bar-chart-o fa-2x"></i>
                            <span className="nav-text">
                                Graphs and Statistics
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            <i className="fa fa-font fa-2x"></i>
                            <span className="nav-text">
                                Quotes
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            <i className="fa fa-table fa-2x"></i>
                            <span className="nav-text">
                                Tables
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            <i className="fa fa-map-marker fa-2x"></i>
                            <span className="nav-text">
                                Maps
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="/">
                            <i className="fa fa-info fa-2x"></i>
                            <span className="nav-text">
                                Documentation
                            </span>
                        </a>
                    </li>
                </ul>

                <ul className="logout">
                    <li>
                        <a href="/">
                            <i className="fa fa-power-off fa-2x"></i>
                            <span className="nav-text">
                                Logout
                            </span>
                        </a>
                    </li>
                </ul>
            </nav>
            <table  class="table table-dark">
            <thead>
               <tr>
                   <th>eid</th>
                   <th>Status</th>
                   <th>Date</th>
               </tr>
            </thead>
            <tbody>
                {attendace.map((res,index)=>{
                    return <tr key={index}>
                        <td>{res.eid}</td>
                        <td>{res.status}</td>

                        <td>{res.date}</td>


                    </tr>
                })}
            </tbody>
            </table>




        </>

    );
}

export default Attendance;
