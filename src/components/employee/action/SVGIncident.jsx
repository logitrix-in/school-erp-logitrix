import React from 'react';
import './SVG.css';

export default function IncidentLabel({ incidentNumber = "112334" }) {
    return (
        <div className="incident-label">
            <svg width="230" height="50" viewBox="0 0 230 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H230V50H0V0Z M230 0L210 25L230 50V0Z" fill="#2F7DA1" />
                <path d="M0 4H228L210 25L228 46H0" stroke="white" strokeWidth="1" fill="none" />
            </svg>
            <div className="label-content" style={{ fontSize: '14px' }}>
                <span>Incident #:</span>
                <span className="label-title">{incidentNumber}</span>
            </div>
        </div>
    )
}