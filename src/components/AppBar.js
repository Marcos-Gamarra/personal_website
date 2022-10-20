import * as React from 'react';
import * as mui from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from './Drawer';

const AppBarDesktop = ({ homeRef, aboutRef, contactRef, projectsRef }) => {
    const scrollToRef = (ref) => {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
    return (
        <>
            <mui.AppBar position="sticky" sx={{ alignItems: 'center' }}>
                <mui.Toolbar>
                    <mui.Typography variant="h6" color="inherit">

                        <mui.Button color="inherit" onClick={() => scrollToRef(homeRef)}>
                            Home
                        </mui.Button>

                        <mui.Button color="inherit" onClick={() => scrollToRef(aboutRef)}>
                            About
                        </mui.Button>

                        <mui.Button color="inherit" onClick={() => scrollToRef(projectsRef)}>
                            Projects
                        </mui.Button>

                        <mui.Button color="inherit" onClick={() => scrollToRef(contactRef)}>
                            Contact
                        </mui.Button>

                    </mui.Typography>
                </mui.Toolbar>
            </mui.AppBar>
        </>
    )
}

const AppBarMobile = ({ homeRef, aboutRef, contactRef, projectsRef }) => {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
    return (
        <>
            <Drawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(!isDrawerOpen)}
                homeRef={homeRef}
                aboutRef={aboutRef}
                contactRef={contactRef}
                projectsRef={projectsRef}
            />
            <mui.AppBar position="sticky">
                <mui.Toolbar>
                    <mui.IconButton onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                        <MenuIcon />
                    </mui.IconButton>
                </mui.Toolbar>
            </mui.AppBar>
        </>
    )
}

export default function AppBar({ homeRef, contactRef, aboutRef, projectsRef }) {
    const isMobile = useMediaQuery('(max-width:600px)');
    if (isMobile) {
        return <AppBarMobile
            homeRef={homeRef}
            aboutRef={aboutRef}
            projectsRef={projectsRef}
            contactRef={contactRef}
        />
    }
    return <AppBarDesktop
        homeRef={homeRef}
        contactRef={contactRef}
        aboutRef={aboutRef}
        projectsRef={projectsRef}
    />
}
