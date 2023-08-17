import React, {useState, useEffect} from 'react';

const LoadingDots = () => {
    const [dots, setDots] = useState(1);
    const [colorIndex, setColorIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((dots + 1) % 3);
        }, 500); // Change dots every 500ms

        return () => clearInterval(interval);
    }, [dots]);

    useEffect(() => {
        const colors = ['red', 'green', 'blue'];
        const interval = setInterval(() => {
            setColorIndex((colorIndex + 1) % colors.length);
        }, 1000); // Change color every 1000ms

        return () => clearInterval(interval);
    }, [colorIndex]);

    const getColor = () => {
        const colors = ['red', 'green', 'blue'];
        return colors[colorIndex];
    };

    const getDots = () => {
        switch (dots) {
            case 0:
                return '.';
            case 1:
                return '..';
            case 2:
                return '...';
            default:
                return '';
        }
    };

    return (
        <div style={{
            color: getColor(),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
        }}>
            <p style={{
                minWidth: '73.86px'
            }}>
                Loading{getDots()}
            </p>
        </div>
    );
};

export default LoadingDots;
