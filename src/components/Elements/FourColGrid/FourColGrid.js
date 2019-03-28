import React from 'react';
import PropTypes from 'prop-types';
import './FourColGrid.css';

const FourColGrid = ({ children, header, loader }) => {

    const renderElements = () => {
        const gridElements = children.map((element, i) => {
            return (
                <div key={i} className="rmdb-grid-element">
                    {element}
                </div>
            )
        })
        return gridElements;
    };

    return (
        <div className="rmdb-grid">
            {header && !loader ? <h1>{header}</h1> : null}
            <div className="rmdb-grid-content">
                {renderElements()}
            </div>
        </div>
    )
}

FourColGrid.propTypes = {
    header: PropTypes.string,
    loader: PropTypes.bool
}

export default FourColGrid;