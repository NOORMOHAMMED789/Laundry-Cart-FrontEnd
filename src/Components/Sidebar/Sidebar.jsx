import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const navigate = useNavigate();
    return (
        <div className='side-bar'>
            <div className='icon-block' >
                <div id='home' className='option' onClick={() => navigate("/")}/>
            </div>
            <div className='icon-block' onClick={() => navigate("/catelog")}>
                <div id='more' className='option'/>
            </div>
            <div className='icon-block' onClick={() => navigate("/home")}>
                <div id='list' className='option'/>
            </div>
        </div>
    );
};

export default Sidebar;