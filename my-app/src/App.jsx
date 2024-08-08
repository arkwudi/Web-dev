import React from 'react';
import './main.css';
import InnerContainer from './components/InnerContainer';

function App() {
    return (
        <div className="app">
            <div className="sidebar">
                侧边栏
            </div>
            <div className="main-content">
                <div className="top-bar">
                    上边栏
                </div>
                <div className="content">
                    <div >
                        <h2 className='todo'>To do</h2>
                        <InnerContainer/></div>
                        
                    <div>
                        <h2 className='doing'>Doing </h2>
                        <InnerContainer/></div>

                    <div>
                    <h2 className='done'>Done </h2>
                        <InnerContainer/></div>
                </div>
            </div>
        </div>
    );
}

export default App;