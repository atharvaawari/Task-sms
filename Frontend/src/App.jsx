import './App.css'
import Sidebar from './components/Sidebar';
import CurdTable from './components/CurdTable';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        {/* AppBar */}
        {/* <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleSidebarToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">React Sidebar App</Typography>
          </Toolbar>
        </AppBar> */}

        {/* Sidebar */}
        <Sidebar open={sidebarOpen} onClose={handleSidebarToggle} />
        <CurdTable style={{ marginTop:'3rem' }}/>
      </div>
    </>
  )
}

export default App
