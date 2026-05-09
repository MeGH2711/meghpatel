import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './css/Contact.css';

/* ── Social links — swap hrefs as needed ── */
const socials = [
    {
        label: 'GitHub',
        href: 'https://github.com/megh2711',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-label='Github Icon'>
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/meghpatel2711',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-label='LinkedIn Icon'>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: 'Twitter / X',
        href: 'https://twitter.com/meghthebaadal',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-label='Twitter Icon'>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        label: 'Email',
        href: 'mailto:patelmeghmahesh2701@gmail.com',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-label='Email Icon'>
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
        ),
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 75, damping: 18 } },
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

/* ── Field component ── */
const Field = ({ label, id, type = 'text', value, onChange, required, placeholder }) => {
    const [focused, setFocused] = useState(false);
    const filled = value.length > 0;

    return (
        <div className={`cf-field ${focused ? 'is-focused' : ''} ${filled ? 'is-filled' : ''}`}>
            <label className="cf-label" htmlFor={id}>{label}</label>
            {type === 'textarea' ? (
                <textarea
                    id={id}
                    name={id}
                    className="cf-input cf-textarea"
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    required={required}
                    placeholder={focused ? placeholder : ''}
                    rows={5}
                />
            ) : (
                <input
                    id={id}
                    name={id}
                    type={type}
                    className="cf-input"
                    value={value}
                    onChange={onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    required={required}
                    placeholder={focused ? placeholder : ''}
                />
            )}
            <span className="cf-field-bar" />
        </div>
    );
};

const EMAILJS_SERVICE_ID  = 'service_klvdjkg';
const EMAILJS_TEMPLATE_ID = 'template_mamjo5u';
const EMAILJS_PUBLIC_KEY  = 'z6BgnG6_GIWXqMgvj';

const Contact = () => {
    const formRef     = useRef(null);
    const headingRef  = useRef(null);
    const headingInView = useInView(headingRef, { once: true, margin: '-80px' });

    const [form, setForm]       = useState({ from_name: '', reply_to: '', subject: '', message: '' });
    const [status, setStatus]   = useState('idle'); // idle | sending | success | error
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMsg('');

        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            );
            setStatus('success');
            setForm({ from_name: '', reply_to: '', subject: '', message: '' });
        } catch (err) {
            setStatus('error');
            setErrorMsg(err?.text || 'Something went wrong. Please try again.');
        }
    };

    return (
        <section className="contact-section" id="contact">

            {/* ── Header ── */}
            <motion.div
                ref={headingRef}
                className="contact-header"
                initial="hidden"
                animate={headingInView ? 'show' : 'hidden'}
                variants={stagger}
            >
                <motion.span className="section-label" variants={fadeUp}>
                    <span className="label-line" />
                    Contact
                    <span className="label-line" />
                </motion.span>

                <motion.h2 className="contact-heading" variants={fadeUp}>
                    Let's start a{' '}
                    <span className="heading-accent">conversation</span> .
                </motion.h2>

                <motion.p className="contact-subheading" variants={fadeUp}>
                    Got a project in mind, a role to fill, or just want to say hey?<br />
                    My inbox is always open, I'll get back within 24 hours.
                </motion.p>
            </motion.div>

            {/* ── Main Grid ── */}
            <div className="contact-grid">

                {/* ── Left — Socials + info cards ── */}
                <motion.div
                    className="contact-left"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ type: 'spring', stiffness: 70, damping: 18 }}
                >
                    {/* Availability badge */}
                    <div className="avail-badge">
                        <span className="avail-pulse" />
                        <span>Available for new projects</span>
                    </div>

                    <p className="contact-left-copy">
                        I'm currently open to freelance engagements, full-time roles, and
                        interesting collaborations at the intersection of AI and great UX.
                    </p>

                    {/* Info rows */}
                    <div className="contact-info-list">
                        {[
                            {
                                icon: (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-label='Email Icon'>
                                        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                ),
                                label: 'Email',
                                val: 'patelmeghmahesh2701@gmail.com',
                                href: 'mailto:patelmeghmahesh2701@gmail.com',
                            },
                            {
                                icon: (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-label='Location Icon'>
                                        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" />
                                    </svg>
                                ),
                                label: 'Based in',
                                val: 'Ahmedabad, India 🇮🇳',
                                href: null,
                            },
                            {
                                icon: (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-label='Clock Icon'>
                                        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
                                    </svg>
                                ),
                                label: 'Response time',
                                val: 'Within 24 hours',
                                href: null,
                            },
                        ].map(({ icon, label, val, href }) => (
                            <div className="contact-info-row" key={label}>
                                <span className="info-icon">{icon}</span>
                                <div>
                                    <span className="info-label">{label}</span>
                                    {href
                                        ? <a className="info-val info-link" href={href}>{val}</a>
                                        : <span className="info-val">{val}</span>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="contact-divider" />

                    {/* Social row */}
                    <div className="contact-socials">
                        <span className="socials-eyebrow">Find me on</span>
                        <div className="socials-row">
                            {socials.map(({ label, href, icon }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-chip"
                                    aria-label={label}
                                    whileHover={{ y: -3 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    {icon}
                                    <span>{label}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ── Right — Form card ── */}
                <motion.div
                    className="contact-form-card"
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ type: 'spring', stiffness: 70, damping: 18, delay: 0.1 }}
                >
                    <div className="form-card-tag">
                        <span className="bio-dot" />
                        <span>Send a message</span>
                    </div>

                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                className="form-success"
                                initial={{ opacity: 0, scale: 0.94 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ type: 'spring', stiffness: 80 }}
                            >
                                <div className="success-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="32" height="32" aria-label='Success Icon'>
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="m9 12 2 2 4-4" />
                                    </svg>
                                </div>
                                <h3 className="success-title">Message sent!</h3>
                                <p className="success-body">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                                <button className="cf-btn-reset" onClick={() => setStatus('idle')}>Send another</button>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                ref={formRef}
                                className="cf-form"
                                onSubmit={handleSubmit}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div className="cf-row">
                                    <Field
                                        label="Your name"
                                        id="from_name"
                                        value={form.from_name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Megh Patel"
                                    />
                                    <Field
                                        label="Email address"
                                        id="reply_to"
                                        type="email"
                                        value={form.reply_to}
                                        onChange={handleChange}
                                        required
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <Field
                                    label="Subject"
                                    id="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="What's this about?"
                                />

                                <Field
                                    label="Message"
                                    id="message"
                                    type="textarea"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Tell me about your project or idea..."
                                />

                                {status === 'error' && (
                                    <motion.p
                                        className="cf-error"
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        ⚠ {errorMsg}
                                    </motion.p>
                                )}

                                <motion.button
                                    type="submit"
                                    className={`cf-submit ${status === 'sending' ? 'is-sending' : ''}`}
                                    disabled={status === 'sending'}
                                    whileHover={status !== 'sending' ? { y: -2 } : {}}
                                    whileTap={status !== 'sending' ? { scale: 0.98 } : {}}
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <span className="cf-spinner" />
                                            Sending…
                                        </>
                                    ) : (
                                        <>
                                            Send message
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-label='Send Message Arrow'>
                                                <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </>
                                    )}
                                </motion.button>

                                {/* <p className="cf-note">No spam, ever. Your info stays between us.</p> */}
                            </motion.form>
                        )}
                    </AnimatePresence>

                    <div className="form-card-glow" />
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
