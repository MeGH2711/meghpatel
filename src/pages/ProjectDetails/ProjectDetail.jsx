import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { projectsData } from './data/projectsData';
import ProjectStatsBar from './components/ProjectStatsBar';
import ProjectSidebar from './components/ProjectSidebar';
import ProjectVision from './components/ProjectVision';
import ProjectProgression from './components/ProjectProgression';
import ProjectPipeline from './components/ProjectPipeline';
import ProjectArchGrid from './components/ProjectArchGrid';
import ProjectFeatures from './components/ProjectFeatures';
import ProjectChallenges from './components/ProjectChallenges';
import ThemeToggle from '../../components/ThemeToggle';
import './css/ProjectDetail.css';

const ProjectDetail = ({ slug: propSlug }) => {
    const params = useParams();
    const navigate = useNavigate();
    const slug = propSlug || params.slug;
    const project = projectsData[slug];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!project) {
        return (
            <section className="pd-page">
                <div className="pd-top-bar">
                    <button className="pd-back-button" onClick={() => navigate('/')}>
                        <FaArrowLeft />
                        <span>Back to Home</span>
                    </button>
                    <ThemeToggle />
                </div>
                <div className="pd-content-card" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                    <h2 className="pd-proj-title" style={{ marginBottom: '1rem' }}>
                        Project Not Found
                    </h2>
                    <p style={{ color: 'var(--text-mid, #94a3b8)', marginBottom: '1.5rem' }}>
                        The project details page you are looking for does not exist or has been moved.
                    </p>
                    <button className="pd-back-button" onClick={() => navigate('/')} style={{ margin: '0 auto' }}>
                        Return to Homepage
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className={`pd-page ${project.theme || ''}`}>
            {/* Top Bar: Back Button + Theme Switch */}
            <div className="pd-top-bar">
                <button className="pd-back-button" onClick={() => navigate('/')}>
                    <FaArrowLeft />
                    <span>Back to Home</span>
                </button>
                <ThemeToggle />
            </div>

            {/* Top Stats Bar */}
            <ProjectStatsBar
                title={project.title}
                titleSub={project.titleSub}
                subtitle={project.subtitle}
                badges={project.badges}
                metrics={project.metrics}
            />

            {/* Main Body Layout */}
            <div className="pd-body-layout">
                {/* Sidebar */}
                <ProjectSidebar
                    thumb={project.thumb}
                    type={project.type}
                    status={project.status}
                    statusVariant={project.statusVariant}
                    year={project.year}
                    demo={project.demo}
                    github={project.github}
                    tech={project.tech}
                    modelConfig={project.modelConfig}
                    contributors={project.contributors}
                />

                {/* Main Content Sections */}
                <div className="pd-main-content">
                    {/* Vision & Purpose */}
                    <ProjectVision vision={project.vision} />

                    {/* Optional Progression Bar (e.g. Bird Species, Road Marking) */}
                    {project.progression && <ProjectProgression progression={project.progression} />}

                    {/* Optional Architecture Pipeline & Results (e.g. HIE) */}
                    {project.pipeline && <ProjectPipeline pipeline={project.pipeline} />}

                    {/* Optional Ensemble Architecture Grid (e.g. Road Marking) */}
                    {project.archGrid && <ProjectArchGrid archGrid={project.archGrid} />}

                    {/* Key Features */}
                    <ProjectFeatures features={project.features} />

                    {/* Challenges & Learnings */}
                    <ProjectChallenges challenges={project.challenges} />
                </div>
            </div>
        </section>
    );
};

export default ProjectDetail;
