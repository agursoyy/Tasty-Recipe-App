import React from 'react';
import '../styles/loading.css';
export default class Loading extends React.Component {
    render() {
        return (
            <div className="loading-container">
                <div className="spinner">
                    <div className="double-bounce1"></div>
                    <div className="double-bounce2"></div>
                </div>
            </div>
        )
    }
}