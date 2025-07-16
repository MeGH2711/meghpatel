// components/MessageModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const MessageModal = ({ show, onHide, message, variant }) => {
    const isSuccess = variant === 'success';

    return (
        <Modal show={show} onHide={onHide} centered backdrop="static">
            <Modal.Body className="text-center">
                <div className="mb-3">
                    {isSuccess ? (
                        <FaCheckCircle size={60} color="green" />
                    ) : (
                        <FaTimesCircle size={60} color="red" />
                    )}
                </div>
                <h5>{message}</h5>
                <Button variant={isSuccess ? "success" : "danger"} className="mt-3" onClick={onHide}>
                    Dismiss
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default MessageModal;