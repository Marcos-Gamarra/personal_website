import * as React from 'react';
import Home from './Home.js';
import About from './About.js';
import Contact from './Contact.js';
import Projects from './Projects.js';
import AppBar from '../components/AppBar.js';

export default function Root() {
    const homeRef = React.useRef(null);
    const aboutRef = React.useRef(null);
    const contactRef = React.useRef(null);
    const projectsRef = React.useRef(null);
    return (
        <>
            <AppBar
                homeRef={homeRef}
                aboutRef={aboutRef}
                contactRef={contactRef}
                projectsRef={projectsRef}
            />
            <Home ref={homeRef} />
            <About ref={aboutRef} />
            <Projects ref={projectsRef} />
            <Contact ref={contactRef} />
        </>
    );
}

