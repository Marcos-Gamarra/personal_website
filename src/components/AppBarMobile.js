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
