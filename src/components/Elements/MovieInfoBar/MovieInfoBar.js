import React from 'react';
import { calcTime, convertMoney } from '../../../helpers';
import './MovieInfoBar.css';

const MovieInfoBar = ({ time, budget, revenue }) => {
    return (
        <div className="rmdb-movieinfobar">
            <div className="rmdb-movieinfobar-content">
                <div className="rmdb-movieinfobar-content-col col-sm">
                    <i className="far fa-clock fa-2x"></i>
                    <span className="rmdb-movieinfobar-info">Running time: {calcTime(time)}</span>
                </div>
                <div className="rmdb-movieinfobar-content-col col-sm">
                    <i className="far fa-money-bill-alt fa-2x"></i>
                    <span className="rmdb-movieinfobar-info">Budget: {convertMoney(budget)}</span>
                </div>
                <div className="rmdb-movieinfobar-content-col col-sm">
                    <i className="fas fa-ticket-alt fa-2x"></i>
                    <span className="rmdb-movieinfobar-info">Revenue: {convertMoney(revenue)}</span>
                </div>
            </div>
        </div>

    )
}

export default MovieInfoBar;