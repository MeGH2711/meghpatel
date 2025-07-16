import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import emailjs from '@emailjs/browser';
import Loader from '../components/Loader';
import MessageModal from '../components/MessageModal';
import Footer from '../components/Footer'
import './css/Contact.css';

const socialLinks = [
    { icon: FaGithub, link: 'https://www.github.com/MeGH2711', label: 'GitHub' },
    { icon: FaLinkedin, link: 'https://www.linkedin.com/in/meghpatel2711', label: 'LinkedIn' },
    { icon: FaInstagram, link: 'https://www.instagram.com/megh_vekaria', label: 'Instagram' },
    { icon: FaYoutube, link: 'https://www.youtube.com/@meghthebaadal', label: 'YouTube' },
    { icon: FaXTwitter, link: 'https://www.x.com/meghthebaadal', label: 'X (formerly Twitter)' },
    { icon: FaEnvelope, link: 'mailto:patelmeghmahesh2701@gmail.com', label: 'Email' }
];

const Contact = () => {

    const form = useRef();

    const [loading, setLoading] = React.useState(false);

    const [toast, setToast] = React.useState({ show: false, message: '', variant: 'success' });

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);

        const now = new Date().toLocaleString();
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'time';
        hiddenInput.value = now;
        form.current.appendChild(hiddenInput);

        emailjs.sendForm(
            'service_b8udbmk',
            'template_7fdwuwm',
            form.current,
            'BGFVdNjL1KcWa2STN'
        )
            .then(() => {
                setToast({ show: true, message: 'Message sent successfully!', variant: 'success' });
                form.current.reset();
                setLoading(false);
            })
            .catch(() => {
                setToast({ show: true, message: 'Failed to send message. Please try again.', variant: 'danger' });
                setLoading(false);
            });
    };

    return (
        <div className="contact-page container py-5">
            <div className="row">
                {/* Left - Social Icons */}
                <motion.div
                    className="col-md-5 mb-5 mb-md-0"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title mb-4">Let's Connect</h2>
                    <p className="mb-4 socialMediaSubtext">You can find me on the platforms below — feel free to reach out!</p>
                    <div className="d-flex flex-column gap-3">
                        {socialLinks.map(({ icon: Icon, link, label }, index) => (
                            <motion.a
                                key={index}
                                href={link}
                                target="_blank"
                                rel="noreferrer"
                                className="social-link d-flex align-items-center gap-3"
                            >
                                <Icon size={24} />
                                <span>{label}</span>
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Right - Contact Form */}
                <motion.div
                    className="col-md-7"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title mb-4">Send a Message</h2>
                    <form className="contact-form" ref={form} onSubmit={sendEmail}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="user_name"
                                className="form-control"
                                id="name"
                                placeholder="Your name"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="user_email"
                                className="form-control"
                                id="email"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="message">Message</label>
                            <textarea
                                name="message"
                                className="form-control"
                                id="message"
                                rows="5"
                                placeholder="Let's talk!"
                                required
                            ></textarea>
                        </div>

                        <motion.button
                            type="submit"
                            className="btn btn-dark submitBtn mt-2"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Send Message
                        </motion.button>
                    </form>
                </motion.div>
                {loading && <Loader />}
                <MessageModal
                    show={toast.show}
                    onHide={() => setToast({ ...toast, show: false })}
                    variant={toast.variant}
                    message={toast.message}
                />
            </div>
            <Footer />
        </div>
    );
};

export default Contact;