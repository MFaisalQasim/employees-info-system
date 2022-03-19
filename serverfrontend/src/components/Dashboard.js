import './Dashboard.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


function Dashboard() {
    const [data, setData] = useState([]);
    useEffect(() => {
        loadData();
    }, []);


    const loadData = async () => {
        const response = await axios.get('http://localhost:9002/user/dashboard')
        console.log(response);
        console.log(typeof (response.data));
        console.log(typeof (data));
        setData(response.data);
    }



    return (
        <>
            <header id="header">
                <Link to='/attendance'> Attendance Page </Link>

            </header>
            <nav className="main-menu">
        <ul>
            <li>
                <a href="http://justinfarrow.com">
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
    <main id="site-main">
        <div className="container">
         

          
        
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                        <th>EmployeeID</th>
                        <th>clientName</th>
                        <th>ProjectName</th>
                        <th>StartDate</th>
                        <th>EndDate</th>
                        <th>Mark Complete</th>
                        <th>Change Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map( (res,index)=>{
                            return <tr key={index}>
                                <td>
                                    {res.eid}
                                </td>
                                <td>
                                    {res.clientname}
                                </td>
                                <td>
                                    {res.projectname}
                                </td>
                                <td>
                                    {res.projecttype}
                                </td>
                                <td>
                                    {res.startdate}
                                </td>
                                <td>
                                    {res.enddate}
                                </td>
                                <td>
                                    {res.status}
                                </td>

                            </tr>
                        })}
                        {/* <%if (users.length> 0) { %>
                            <% for(var i=0; i < users.length; i++) { %>
                                <tr>
                                    <td>
                                        <a href="/attendance/<%= users[i].eid %>">
                                            <%= users[i].eid %>
                                        </a>
                                    </td>
                                    <td>
                                        <%= users[i].name %>
                                    </td>
                                    <td>
                                        <%= users[i].email %>
                                    </td>
                                    <td>
                                        <%= users[i].gender %>
                                    </td>
                                    <td>
                                        <%= users[i].status %>
                                    </td>
                                    <td>
                                        <a href="/update-user/<%= users[i].eid%>" className="btn border-shadow update">
                                            <span className="text-gradient"><i className="fas fa-pencil-alt fa-xs"></i></span>
                                        </a>
                                        <a href="/api/delete/<%= users[i].eid%>" className="btn border-shadow delete"
                                            data-id=<%=users[i]._id%>
                                            <span className="text-gradient"><i className="fas fa-times fa-xs"></i></span>
                                        </a>

                                    </td>
                                    <td><button className="border-shadow"><a
                                                href="/assign-project/<%= users[i].eid %>">Assign</a></button></td>
                                    <td>
                                        <button className="border-shadow"><a
                                                href="/project-progress/<%= users[i].eid %>">Progress</a></button>
                                    </td>

                                </tr>
                                <% } %>
                             <% } %>  */}
                    </tbody>
                </table>
          
        </div>
    </main>


        </>
    );
}

export default Dashboard;
// {data.map((res, index) => {
//     return <div key={index} >{res.clientname}</div>
// })}