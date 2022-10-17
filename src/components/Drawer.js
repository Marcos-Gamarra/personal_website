import * as React from 'react';
import * as mui from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactPageIcon from '@mui/icons-material/ContactPage';

const ListItem = ({ icon, primary, onClose, ref, block = 'start' }) => {

  const onClick = () => {
    ref.current.scrollIntoView({ block: block });
    onClose();
  }

  return (
    <mui.ListItem button onClick={onClick}>
      <mui.ListItemIcon>
        {icon}
      </mui.ListItemIcon>
      <mui.ListItemText primary={primary} />
    </mui.ListItem>
  );
}

const Drawer = ({ open, onClose, homeRef, aboutRef, contactRef, projectsRef }) => {
  return (
    <mui.Drawer open={open} onClose={onClose}>
      <mui.List sx={{ width: 200 }}>
        {ListItem({ onClose, primary: 'Home', icon: <HomeIcon />, ref: homeRef, block: 'end' })}
        {ListItem({ onClose, primary: 'About', icon: <InfoIcon />, ref: aboutRef })}
        {ListItem({ onClose, primary: 'Projects', icon: <ContactPageIcon />, ref: projectsRef })}
        {ListItem({ onClose, primary: 'Contact', icon: <ContactPageIcon />, ref: contactRef })}
      </mui.List>
    </mui.Drawer >
  );
}

export default Drawer;
