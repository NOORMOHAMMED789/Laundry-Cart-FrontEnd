import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className='side-bar'>
            <div className='icon-block'>
                <div id='home' className='option' />
            </div>
            <div className='icon-block' >
                <div id='more' className='option'/>
            </div>
            <div className='icon-block'>
                <div id='list' className='option'/>
            </div>
        </div>
    );
};

export default Sidebar;