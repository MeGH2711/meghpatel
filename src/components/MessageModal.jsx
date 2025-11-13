// src/components/MessageModal.jsx
import React from "react";
import { Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";

const MessageModal = ({ show, onHide, variant, message }) => {
    const isSuccess = variant === "success";

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            backdrop="static"
            keyboard={false}
            className="message-modal"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
            >
                <Modal.Body className="text-center p-4">
                    <div
                        className={`icon-wrapper mx-auto mb-3 ${isSuccess ? "bg-success-subtle" : "bg-danger-subtle"
                            }`}
                        style={{
                            width: "70px",
                            height: "70px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {isSuccess ? (
                            <FiCheckCircle size={36} className="text-success" />
                        ) : (
                            <FiXCircle size={36} className="text-danger" />
                        )}
                    </div>

                    <h5 className="mb-2 fw-semibold">
                        {isSuccess ? "Message Sent!" : "Something Went Wrong"}
                    </h5>
                    <p className="text-muted mb-4" style={{ fontSize: "0.95rem" }}>
                        {message}
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        className={`btn ${isSuccess ? "btn-success" : "btn-danger"} px-4`}
                        onClick={onHide}
                    >
                        OK
                    </motion.button>
                </Modal.Body>
            </motion.div>
        </Modal>
    );
};

export default MessageModal;