import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const BottomNavigation = ({ left, leftRoute, right, rightRoute }) => {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mt-4">
                {left && (
                    <motion.div
                        whileHover={{ x: -5 }}
                        style={{ cursor: 'pointer', fontWeight: '500' }}
                        className="navigationLeftArrow"
                        onClick={() => navigate(leftRoute)}
                    >
                        {left} ←
                    </motion.div>
                )}

                {right && (
                    <motion.div
                        whileHover={{ x: 5 }}
                        style={{ cursor: 'pointer', fontWeight: '500' }}
                        className="navigationRightArrow"
                        onClick={() => navigate(rightRoute)}
                    >
                        → {right}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default BottomNavigation;