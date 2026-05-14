import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './css/GitHubActivity.css';

/* ── Config: swap in your username ── */
const GITHUB_USERNAME = 'MeGH2711'; // ← change this

/* ── Variants (matching TechStack) ── */
const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 75, damping: 18 } },
};
const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } },
};

/* ── Stat Card ── */
const StatCard = ({ label, value, icon, color, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });
    const [displayed, setDisplayed] = useState(0);

    useEffect(() => {
        if (!inView || typeof value !== 'number') return;
        let start = 0;
        const end = value;
        const duration = 1200;
        const step = Math.ceil(end / (duration / 16));
        const timer = setInterval(() => {
            start += step;
            if (start >= end) { setDisplayed(end); clearInterval(timer); }
            else setDisplayed(start);
        }, 16);
        return () => clearInterval(timer);
    }, [inView, value]);

    return (
        <motion.div
            ref={ref}
            className="gh-stat-card"
            style={{ '--stat-color': color }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 70 }}
            whileHover={{ y: -4 }}
        >
            <div className="gh-stat-icon">{icon}</div>
            <div className="gh-stat-body">
                <span className="gh-stat-value">
                    {typeof value === 'number' ? displayed.toLocaleString() : value}
                </span>
                <span className="gh-stat-label">{label}</span>
            </div>
            <div className="gh-stat-glow" />
        </motion.div>
    );
};

/* ── Contribution Heatmap ── */
const DAYS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

const ContribHeatmap = ({ weeks, color }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const [tooltip, setTooltip] = useState(null);

    const levels = ['#1a1a2e', '#0d2240', '#1a4470', '#1f6fb5', color];

    /* ── derive month labels ── */
    const monthLabels = [];
    weeks.forEach((week, wi) => {
        const firstDay = week[0];
        if (!firstDay) return;
        const month = new Date(firstDay.date).toLocaleString('default', { month: 'short' });
        if (wi === 0 || month !== monthLabels[monthLabels.length - 1]?.label) {
            monthLabels.push({ label: month, col: wi });
        }
    });

    return (
        <div ref={ref} className="gh-heatmap-outer">
            {/* Day labels column */}
            <div className="gh-heatmap-day-labels">
                {DAYS.map((d, i) => (
                    <span key={i} className="gh-heatmap-day-label">{d}</span>
                ))}
            </div>

            {/* Grid + month labels */}
            <div className="gh-heatmap-right">
                {/* Month row */}
                <div className="gh-heatmap-months" style={{ '--week-count': weeks.length }}>
                    {monthLabels.map((m, i) => (
                        <span
                            key={i}
                            className="gh-heatmap-month-label"
                            style={{ '--col-start': m.col }}
                        >
                            {m.label}
                        </span>
                    ))}
                </div>

                {/* Cells grid */}
                <div className="gh-heatmap-grid" style={{ '--week-count': weeks.length }}>
                    {weeks.map((week, wi) => (
                        <div key={wi} className="gh-heatmap-col">
                            {week.map((day, di) => (
                                <motion.div
                                    key={di}
                                    className="gh-heatmap-cell"
                                    style={{ '--fill': levels[day.level] }}
                                    initial={{ opacity: 0, scale: 0.4 }}
                                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: wi * 0.006 + di * 0.002, duration: 0.22 }}
                                    // FIX: Use onMouseMove for dynamic tracking
                                    onMouseMove={(e) => {
                                        setTooltip({
                                            day,
                                            x: e.clientX,
                                            y: e.clientY
                                        });
                                    }}
                                    onMouseLeave={() => setTooltip(null)}
                                />
                            ))}
                        </div>
                    ))}
                </div>

                {/* Tooltip */}
                {tooltip && (
                    <div
                        className="gh-heatmap-tooltip"
                        style={{
                            left: `${tooltip.x}px`,
                            top: `${tooltip.y}px`
                        }}
                    >
                        <strong>{tooltip.day.count} contribution{tooltip.day.count !== 1 ? 's' : ''}</strong>
                        <span>{new Date(tooltip.day.date).toLocaleDateString('default', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

/* ── Recent Repo Card ── */
const RepoCard = ({ repo, index }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });

    const langColors = {
        JavaScript: '#f7df1e',
        TypeScript: '#3178c6',
        Python: '#3572A5',
        HTML: '#e34c26',
        CSS: '#563d7c',
        Jupyter: '#DA5B0B',
        default: '#61DAFB',
    };
    const langColor = langColors[repo.language] || langColors.default;

    return (
        <motion.a
            ref={ref}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="gh-repo-card"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.09, type: 'spring', stiffness: 75 }}
            whileHover={{ x: 5 }}
        >
            <div className="gh-repo-top">
                <svg className="gh-repo-icon" viewBox="0 0 16 16" fill="currentColor" aria-label='Github Repo Icon'>
                    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z" />
                </svg>
                <span className="gh-repo-name">{repo.name}</span>
                {repo.isPrivate && <span className="gh-repo-badge">Private</span>}
            </div>
            {repo.description && (
                <p className="gh-repo-desc">{repo.description}</p>
            )}
            <div className="gh-repo-meta">
                {repo.language && (
                    <span className="gh-repo-lang">
                        <span className="gh-repo-lang-dot" style={{ background: langColor }} />
                        {repo.language}
                    </span>
                )}
                <span className="gh-repo-stat">
                    <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12" aria-label='Github Repo Stat Icon'>
                        <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                    </svg>
                    {repo.stars}
                </span>
                <span className="gh-repo-stat">
                    <svg viewBox="0 0 16 16" fill="currentColor" width="12" height="12" aria-label='Github Repo Stat Icon'>
                        <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
                    </svg>
                    {repo.forks}
                </span>
                <span className="gh-repo-updated">{repo.updatedAt}</span>
            </div>
        </motion.a>
    );
};

/* ── Language Bar ── */
const LangBar = ({ langs }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <div ref={ref} className="gh-lang-section">
            <div className="gh-lang-cards">
                {langs.map((l, i) => (
                    <motion.div
                        key={l.name}
                        className="gh-lang-card"
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: i * 0.08, duration: 0.45, type: 'spring', stiffness: 75 }}
                        whileHover={{ y: -3 }}
                        style={{ '--lc': l.color }}
                    >
                        <div className="gh-lang-card-top">
                            <span className="gh-lang-dot" style={{ background: l.color }} />
                            <span className="gh-lang-name">{l.name}</span>
                            <span className="gh-lang-pct">{l.pct}%</span>
                        </div>
                        <div className="gh-lang-track">
                            <motion.div
                                className="gh-lang-fill"
                                style={{ background: l.color }}
                                initial={{ width: 0 }}
                                animate={inView ? { width: `${l.pct}%` } : {}}
                                transition={{ delay: i * 0.08 + 0.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const fetchGitHubData = async (username) => {
    const TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
    const ENDPOINT = 'https://api.github.com/graphql';

    // Get the user's join year first to know how many years to query
    const joinYearRes = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Authorization: `bearer ${TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: `{ user(login: "${username}") { createdAt } }`
        }),
    });
    const joinYearData = await joinYearRes.json();
    const joinYear = new Date(joinYearData.data.user.createdAt).getFullYear();
    const currentYear = new Date().getFullYear();

    // Build per-year contribution aliases
    const yearAliases = [];
    for (let y = joinYear; y <= currentYear; y++) {
        yearAliases.push(`
        contrib${y}: contributionsCollection(from: "${y}-01-01T00:00:00Z", to: "${Math.min(y, currentYear) === currentYear ? new Date().toISOString() : y + '-12-31T23:59:59Z'}") {
            totalCommitContributions
            totalPullRequestContributions
            contributionCalendar { totalContributions }
        }
    `);
    }

    const query = `
    {
      user(login: "${username}") {
        name
        followers { totalCount }
        following { totalCount }
        repositories(first: 50, orderBy: {field: PUSHED_AT, direction: DESC}, privacy: PUBLIC) {
          totalCount
          nodes {
            name description url isPrivate stargazerCount forkCount
            primaryLanguage { name color }
            pushedAt
            languages(first: 10) {
              edges {
                size
                node { name color }
              }
            }
          }
        }
        contributionsCollection {
          totalCommitContributions
          totalPullRequestContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays { date contributionCount contributionLevel }
            }
          }
        }
        ${yearAliases.join('\n')}
      }
    }`;

    const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `bearer ${TOKEN}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query }),
    });

    const { data } = await res.json();
    const user = data.user;

    // --- 1. Calculate Language Distribution ---
    const langMap = {};
    let totalBytes = 0;

    user.repositories.nodes.forEach(repo => {
        repo.languages.edges.forEach(edge => {
            const { name, color } = edge.node;
            const size = edge.size;
            totalBytes += size;
            if (langMap[name]) {
                langMap[name].size += size;
            } else {
                langMap[name] = { name, color, size };
            }
        });
    });

    // Convert to array, sort by size, and calculate percentage
    const languages = Object.values(langMap)
        .sort((a, b) => b.size - a.size)
        .slice(0, 6) // Top 6 languages
        .map(l => ({
            name: l.name,
            color: l.color,
            pct: ((l.size / totalBytes) * 100).toFixed(1)
        }));

    // --- 2. Sum contributions across all years ---
    let allTimeContribs = 0;
    let allTimeCommits = 0;
    let allTimePRs = 0;
    for (let y = joinYear; y <= currentYear; y++) {
        const yData = user[`contrib${y}`];
        if (yData) {
            allTimeContribs += yData.contributionCalendar.totalContributions;
            allTimeCommits  += yData.totalCommitContributions;
            allTimePRs      += yData.totalPullRequestContributions;
        }
    }

    // --- 3. Return Unified Data ---
    return {
        name: user.name,
        followers: user.followers.totalCount,
        following: user.following.totalCount,
        totalRepos: user.repositories.totalCount,
        totalCommits: allTimeCommits,
        totalPRs: allTimePRs,
        totalStars: user.repositories.nodes.reduce((acc, repo) => acc + repo.stargazerCount, 0),
        totalContribs: allTimeContribs,
        thisYearContribs: user.contributionsCollection.contributionCalendar.totalContributions,
        langs: languages, // This now populates your LangBar
        weeks: user.contributionsCollection.contributionCalendar.weeks.map(w =>
            w.contributionDays.map(d => ({
                date: d.date,
                count: d.contributionCount,
                level: d.contributionLevel === 'NONE' ? 0 :
                    d.contributionLevel === 'FIRST_QUARTILE' ? 1 :
                        d.contributionLevel === 'SECOND_QUARTILE' ? 2 :
                            d.contributionLevel === 'THIRD_QUARTILE' ? 3 : 4
            }))
        ),
        repos: user.repositories.nodes.slice(0, 6).map(repo => ({
            name: repo.name,
            description: repo.description,
            url: repo.url,
            stars: repo.stargazerCount,
            forks: repo.forkCount,
            language: repo.primaryLanguage?.name || 'Plain Text',
            updatedAt: new Date(repo.pushedAt).toLocaleDateString()
        }))
    };
};

/* ── Main Component ── */
const GitHubActivity = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const headingRef = useRef(null);
    const headingInView = useInView(headingRef, { once: true, margin: '-80px' });

    useEffect(() => {
        fetchGitHubData(GITHUB_USERNAME)
            .then(d => { setData(d); setLoading(false); })
            .catch(() => { setError('Failed to load GitHub data.'); setLoading(false); });
    }, []);

    const ACCENT = '#61DAFB';

    const stats = data ? [
        { label: 'Total Commits', value: data.totalCommits, icon: '⬡', color: '#61DAFB' },
        { label: 'Repositories', value: data.totalRepos, icon: '◫', color: '#a78bfa' },
        { label: 'Pull Requests', value: data.totalPRs, icon: '⌥', color: '#34d399' },
        { label: 'Stars Earned', value: data.totalStars, icon: '✦', color: '#fbbf24' },
        { label: 'Followers', value: data.followers, icon: '◈', color: '#f472b6' },
        { label: 'Total Contributions', value: data.totalContribs, icon: '◉', color: '#fb923c' },
    ] : [];

    return (
        <section className="gh-section">

            {/* ── Header ── */}
            <motion.div
                ref={headingRef}
                className="ts-header"
                initial="hidden"
                animate={headingInView ? 'show' : 'hidden'}
                variants={stagger}
            >
                <motion.span className="section-label" variants={fadeUp}>
                    <span className="label-line" />
                    GitHub Activity
                    <span className="label-line" />
                </motion.span>

                <motion.h2 className="ts-heading" variants={fadeUp}>
                    Code in the{' '}
                    <span className="heading-accent">wild.</span>
                </motion.h2>

                <motion.p className="ts-subheading" variants={fadeUp}>
                    A live snapshot of my open-source presence — commits, repos, and the languages I
                    ship in every day.
                </motion.p>
            </motion.div>

            {loading && (
                <div className="gh-loading">
                    <div className="gh-loading-dots">
                        <span /><span /><span />
                    </div>
                    <p>Fetching GitHub data…</p>
                </div>
            )}

            {error && <p className="gh-error">{error}</p>}

            {data && !loading && (
                <>
                    {/* ── GitHub Profile Strip ── */}
                    <motion.a
                        href={`https://github.com/${GITHUB_USERNAME}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gh-profile-strip"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        whileHover={{ y: -3 }}
                    >
                        <div className="gh-profile-avatar">
                            <img
                                src={`https://avatars.githubusercontent.com/${GITHUB_USERNAME}`}
                                alt={data.name}
                                onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${data.name}&background=61DAFB&color=000`; }}
                            />
                        </div>
                        <div className="gh-profile-info">
                            <span className="gh-profile-name">{data.name}</span>
                            <span className="gh-profile-handle">@{GITHUB_USERNAME}</span>
                        </div>
                        <div className="gh-profile-cta">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-label='Github Icon'>
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                            </svg>
                            View Profile
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" aria-label='Github Arrow Icon'>
                                <path d="M7 17L17 7M7 7h10v10" />
                            </svg>
                        </div>
                    </motion.a>

                    {/* ── Stats Grid ── */}
                    <div className="gh-stats-grid">
                        {stats.map((s, i) => (
                            <StatCard key={s.label} {...s} index={i} />
                        ))}
                    </div>

                    {/* ── Contribution Heatmap ── */}
                    <motion.div
                        className="gh-heatmap-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5, type: 'spring', stiffness: 70 }}
                    >
                        <div className="gh-card-header">
                            <span className="gh-card-title">Contribution Activity</span>
                            <span className="gh-card-pill">{data.thisYearContribs} contributions this year</span>
                        </div>
                        <ContribHeatmap weeks={data.weeks} color={ACCENT} />
                        <div className="gh-heatmap-footer">
                            <span className="gh-heatmap-less">Less</span>
                            {[0, 1, 2, 3, 4].map(l => (
                                <div
                                    key={l}
                                    className="gh-heatmap-cell gh-legend-cell"
                                    style={{ '--fill': ['#1a1a2e', '#0d2240', '#1a4470', '#1f6fb5', ACCENT][l] }}
                                />
                            ))}
                            <span className="gh-heatmap-more">More</span>
                        </div>
                    </motion.div>

                    {/* ── Language Distribution ── */}
                    <motion.div
                        className="gh-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.5, type: 'spring', stiffness: 70 }}
                    >
                        <div className="gh-card-header">
                            <span className="gh-card-title">Language Distribution</span>
                            <span className="gh-card-pill">Across all repos</span>
                        </div>
                        <LangBar langs={data.langs} />
                    </motion.div>

                    {/* ── Repos ── */}
                    <div className="gh-repos-section">
                        <div className="gh-card-header gh-repos-header">
                            <span className="gh-card-title">Recent Repositories</span>
                            <a href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="gh-see-all">
                                See all
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13" aria-label='See All Arrow'>
                                    <path d="M7 17L17 7M7 7h10v10" />
                                </svg>
                            </a>
                        </div>
                        <div className="gh-repos-grid">
                            {data.repos.map((repo, i) => (
                                <RepoCard key={repo.name} repo={repo} index={i} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};

export default GitHubActivity;
