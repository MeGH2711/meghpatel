import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSpotify } from 'react-icons/fa';

const SpotifyBadge = () => {
    const [track, setTrack] = useState(null);

    const getNowPlaying = async () => {
        // In a real app, move these to environment variables or a backend proxy
        const client_id = 'cfb9ba08719d4721886fb844425af7a2';
        const client_secret = 'fb1c3aefe8c24f3bb24bd8ef6055671b';
        const refresh_token = 'AQD7FpY8SUvFK_Sska14ohazpDAS6nAbkzJNRg_9_Q3L6GZU4ojKZ2JuxWc74C0bwEn5u0WQqhOmOx4a7Kp2qCt5qn3JNnofVRJgH1wkU6III_UtyRMrlPyVI9Tb1AXOlOuo9WCogF5yMteLfl2KVuqxhkabLvGnJTDRXa7FCRPw1VvjPAERiIAK3Cs-HplbLRwds38oKZ3DwT8aDE8';

        // 1. Get Access Token
        const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${btoa(`${client_id}:${client_secret}`)}`,
            },
            body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token }),
        });
        const { access_token } = await tokenRes.json();

        // 2. Fetch Current Track
        const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        if (res.status === 200) {
            const data = await res.json();
            setTrack({
                name: data.item.name,
                artist: data.item.artists[0].name,
                isPlaying: data.is_playing,
                link: data.item.external_urls.spotify
            });
        } else {
            setTrack(null);
        }
    };

    useEffect(() => {
        getNowPlaying();
        const interval = setInterval(getNowPlaying, 30000); // Update every 30s
        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {track && track.isPlaying && (
                <motion.a
                    href={track.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spotify-pill"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                >
                    <FaSpotify color="#1DB954" className="spotify-icon" />
                    <div className="track-info">
                        <span className="track-name">{track.name}</span>
                        <span className="track-artist">{track.artist}</span>
                    </div>
                    <div className="bars">
                        <span className="bar" />
                        <span className="bar" />
                        <span className="bar" />
                    </div>
                </motion.a>
            )}
        </AnimatePresence>
    );
};

export default SpotifyBadge;