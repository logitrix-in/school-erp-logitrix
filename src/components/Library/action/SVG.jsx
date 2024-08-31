import React from 'react';
import './SVG.css';

export default function IncidentLabel({ incidentNumber = "112334", date = "10 Jan 2024" }) {
    return (
        <div className="incident-label">
            <svg width="250" height="40" viewBox="0 0 300 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H300V40H0V0Z M300 0L280 20L300 40V0Z" fill="#2F7DA1" />
                <path d="M0 4H298L280 20L298 36H0" stroke="white" strokeWidth="1" fill="none" />
            </svg>
            <div className="label-content">
                <span >Incident #:</span>
                <span className="label-title">{incidentNumber}</span>
                <span className="label-date">{date}</span>
            </div>
        </div>
    )
}