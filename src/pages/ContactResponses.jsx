import React, { useState } from "react";
import {
    collection,
    getDocs,
    orderBy,
    query,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import {
    Container,
    Table,
    Spinner,
    Alert,
    Modal,
    Button,
    Form,
} from "react-bootstrap";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import "./css/ContactResponses.css";

const ContactResponses = () => {
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(true);
    const [adminKey, setAdminKey] = useState("");
    const [authorized, setAuthorized] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedResponse, setSelectedResponse] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const fetchResponses = async () => {
        try {
            const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setResponses(data);
        } catch (err) {
            console.error("Error fetching responses:", err);
            setError("Failed to fetch contact responses.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyKey = () => {
        setVerifying(true);
        setTimeout(() => {
            if (adminKey === "portfolio@Megh2711") {
                setAuthorized(true);
                setShowModal(false);
                fetchResponses();
            } else {
                alert("Incorrect admin key!");
            }
            setVerifying(false);
        }, 800);
    };

    const handleReviewChange = async (id, currentValue) => {
        try {
            const ref = doc(db, "contacts", id);
            await updateDoc(ref, { reviewed: !currentValue });
            setResponses((prev) =>
                prev.map((res) =>
                    res.id === id ? { ...res, reviewed: !currentValue } : res
                )
            );
        } catch (err) {
            console.error("Error updating review status:", err);
            alert("Failed to update review status.");
        }
    };

    const handleDeleteClick = (response) => {
        setSelectedResponse(response);
        setDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!selectedResponse) return;
        setDeleting(true);
        try {
            await deleteDoc(doc(db, "contacts", selectedResponse.id));
            setResponses((prev) =>
                prev.filter((res) => res.id !== selectedResponse.id)
            );
            setDeleteModal(false);
            setSelectedResponse(null);
        } catch (err) {
            console.error("Error deleting response:", err);
            alert("Failed to delete response.");
        } finally {
            setDeleting(false);
        }
    };

    const cancelDelete = () => {
        setDeleteModal(false);
        setSelectedResponse(null);
    };

    const formatDate = (dateObj) =>
        dateObj.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });

    const formatTime = (dateObj) =>
        dateObj.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });

    if (!authorized) {
        return (
            <Modal show={showModal} backdrop="static" centered>
                <Modal.Header>
                    <Modal.Title>Admin Access Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-muted mb-3">
                        Please enter the admin key to access contact form responses.
                    </p>
                    <Form.Control
                        type="password"
                        placeholder="Enter admin key"
                        value={adminKey}
                        onChange={(e) => setAdminKey(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleVerifyKey()}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleVerifyKey}
                        disabled={verifying || !adminKey}
                    >
                        {verifying ? "Verifying..." : "Submit"}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    return (
        <div className="contact-responses-page min-vh-100 d-flex flex-column justify-content-between">
            <Container className="py-5 flex-grow-1">
                <motion.h2
                    className="hero-heading mb-4 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Contact Form Responses
                </motion.h2>

                {loading ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" variant="primary" />
                        <p className="mt-3">Loading responses...</p>
                    </div>
                ) : error ? (
                    <Alert variant="danger" className="text-center">
                        {error}
                    </Alert>
                ) : responses.length === 0 ? (
                    <Alert variant="info" className="text-center">
                        No messages received yet.
                    </Alert>
                ) : (
                    <div className="table-responsive shadow-sm">
                        <Table bordered hover responsive className="align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th className="text-center">Reviewed</th>
                                    <th className="text-center">Sr. No.</th>
                                    <th className="text-center">Date</th>
                                    <th className="text-center">Time</th>
                                    <th className="text-center">Name</th>
                                    <th className="text-center">Email</th>
                                    <th className="text-center">Message</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {responses.map((res, index) => {
                                    const dateObj = res.createdAt?.toDate
                                        ? res.createdAt.toDate()
                                        : null;
                                    const reviewed = res.reviewed || false;
                                    return (
                                        <tr
                                            key={res.id}
                                            className={reviewed ? "table-primary" : ""}
                                        >
                                            <td className="text-center">
                                                <Form.Check
                                                    type="checkbox"
                                                    checked={reviewed}
                                                    onChange={() =>
                                                        handleReviewChange(res.id, reviewed)
                                                    }
                                                />
                                            </td>
                                            <td className="text-center">{index + 1}</td>
                                            <td className="text-center">
                                                {dateObj
                                                    ? formatDate(dateObj)
                                                    : res.clientTime
                                                        ? formatDate(new Date(res.clientTime))
                                                        : "N/A"}
                                            </td>
                                            <td className="text-center">
                                                {dateObj
                                                    ? formatTime(dateObj)
                                                    : res.clientTime
                                                        ? formatTime(new Date(res.clientTime))
                                                        : "N/A"}
                                            </td>
                                            <td className="text-center">{res.name}</td>
                                            <td className="text-center">
                                                <a
                                                    href={`mailto:${res.email}`}
                                                    className="text-decoration-none"
                                                >
                                                    {res.email}
                                                </a>
                                            </td>
                                            <td
                                                className="text-center"
                                                style={{ whiteSpace: "pre-wrap" }}
                                            >
                                                {res.message}
                                            </td>
                                            <td className="text-center">
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteClick(res)}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                )}
            </Container>

            {/* Delete Confirmation Modal */}
            <Modal show={deleteModal} onHide={cancelDelete} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedResponse && (
                        <>
                            <p>
                                Are you sure you want to delete this response from{" "}
                                <strong>{selectedResponse.name}</strong>?
                            </p>
                            <p className="text-muted small">
                                <strong>Email:</strong> {selectedResponse.email}
                                <br />
                                <strong>Message:</strong> {selectedResponse.message}
                            </p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDelete} disabled={deleting}>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        onClick={confirmDelete}
                        disabled={deleting}
                    >
                        {deleting ? "Deleting..." : "Delete"}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Footer />
        </div>
    );
};

export default ContactResponses;