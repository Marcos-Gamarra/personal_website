import * as React from 'react';
import * as mui from '@mui/material';

const Home = React.forwardRef((_, ref) => {
  return (
    <mui.Grid item xs={12} ref={ref}>
      <mui.Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: {
            //appbar height in mobile is 56px
            //appbar height in desktop is 64px
            xs: window.innerHeight - 56,
            sm: window.innerHeight - 64,
          },
          bgcolor: 'background.default',
        }}
      >
        <mui.Typography variant="h1" component="div" gutterBottom>
          Home
        </mui.Typography>
      </mui.Box>
    </mui.Grid>
  );
});

export default Home;
