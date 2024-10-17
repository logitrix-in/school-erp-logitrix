const IncidentHeaderBanner = ({ text, style }) => {
    return (
        <svg width="300" height="40" viewBox="0 0 300 40" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '32px', ...style }}>
            <path d="M0 0H280L300 20L280 40H0V0Z" fill="#DAF3FE" />
            <foreignObject width="280" height="40" x="10" y="10">
                <div xmlns="http://www.w3.org/1999/xhtml" className="w-full h-full flex items-center justify-center">
                    <span className="font-semibold text-black">{text}</span>
                </div>
            </foreignObject>
        </svg>
    );
};

export default IncidentHeaderBanner;