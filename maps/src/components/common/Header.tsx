import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Container, Button, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface HeaderProps {
  showProfileMenu: boolean;
  setShowProfileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  isDashboard?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  showProfileMenu, 
  setShowProfileMenu, 
  title = "",
  isDashboard = false 
}) => {
  const router = useRouter();
  const currentPath = router.pathname;
  
  return (
    <AppBar position="static" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              color: '#9333ea', 
              fontWeight: 'bold',
              fontFamily: 'var(--font-geist-sans)' // Adding Geist font
            }}
          >
            {title}
          </Typography>
          
          {!isDashboard && (
            <Box sx={{ 
              display: { xs: 'none', md: 'flex' }, 
              gap: 4,
              fontFamily: 'var(--font-geist-sans)' // Adding Geist font
            }}>
              <Link href="/dashboard" passHref legacyBehavior>
                <Button sx={{ 
                  color: currentPath === '/dashboard' ? '#9333ea' : 'text.secondary',
                  borderBottom: currentPath === '/dashboard' ? '2px solid' : 'none',
                  borderColor: '#9333ea', 
                  borderRadius: 0,
                  fontFamily: 'var(--font-geist-sans)' // Adding Geist font
                }}>
                  Dashboard
                </Button>
              </Link>
              <Link href="/charities" passHref legacyBehavior>
                <Button sx={{ 
                  color: currentPath === '/charities' ? '#9333ea' : 'text.secondary',
                  borderBottom: currentPath === '/charities' ? '2px solid' : 'none',
                  borderColor: '#9333ea', 
                  borderRadius: 0,
                  fontFamily: 'var(--font-geist-sans)' // Adding Geist font
                }}>
                  Charities
                </Button>
              </Link>
              <Link href="/about" passHref legacyBehavior>
                <Button sx={{ 
                  color: currentPath === '/about' ? '#9333ea' : 'text.secondary',
                  borderBottom: currentPath === '/about' ? '2px solid' : 'none',
                  borderColor: '#9333ea', 
                  borderRadius: 0,
                  fontFamily: 'var(--font-geist-sans)' // Adding Geist font
                }}>
                  About
                </Button>
              </Link>
              <Link href="/contact" passHref legacyBehavior>
                <Button sx={{ 
                  color: currentPath === '/contact' ? '#9333ea' : 'text.secondary',
                  borderBottom: currentPath === '/contact' ? '2px solid' : 'none',
                  borderColor: '#9333ea', 
                  borderRadius: 0,
                  fontFamily: 'var(--font-geist-sans)' // Adding Geist font
                }}>
                  Contact
                </Button>
              </Link>
              <Link href="/donate" passHref legacyBehavior>
                <Button sx={{ 
                  color: currentPath === '/donate' ? '#9333ea' : 'text.secondary',
                  display: 'flex', 
                  alignItems: 'center',
                  borderBottom: currentPath === '/donate' ? '2px solid' : 'none',
                  borderColor: '#9333ea', 
                  borderRadius: 0,
                  fontFamily: 'var(--font-geist-sans)' // Adding Geist font
                }}>
                  <i className="fas fa-heart" style={{ marginRight: '4px' }}></i>
                  Donate
                </Button>
              </Link>
            </Box>
          )}
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="default">
              <NotificationsIcon />
            </IconButton>
            
            <Box sx={{ position: 'relative' }}>
              <Box
                id="profileIcon"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                sx={{
                  height: 32,
                  width: 32,
                  borderRadius: '50%',
                  bgcolor: '#9333ea',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <PersonIcon fontSize="small" />
              </Box>
              
              {showProfileMenu && (
                <Box
                  id="profileDropdown"
                  sx={{
                    position: 'absolute',
                    right: 0,
                    mt: 1,
                    width: 200,
                    bgcolor: 'white',
                    borderRadius: 1,
                    boxShadow: 3,
                    py: 1,
                    zIndex: 50
                  }}
                >
                  <Link href="/profile" passHref legacyBehavior>
                    <MenuItem sx={{ px: 2, py: 1 }}>
                      <i className="fas fa-user-circle" style={{ marginRight: '8px' }}></i>
                      My Profile
                    </MenuItem>
                  </Link>
                  <Link href="/donations/history" passHref legacyBehavior>
                    <MenuItem sx={{ px: 2, py: 1 }}>
                      <i className="fas fa-history" style={{ marginRight: '8px' }}></i>
                      Donation History
                    </MenuItem>
                  </Link>
                  <Link href="/charities/saved" passHref legacyBehavior>
                    <MenuItem sx={{ px: 2, py: 1 }}>
                      <i className="fas fa-heart" style={{ marginRight: '8px' }}></i>
                      Saved Charities
                    </MenuItem>
                  </Link>
                  <Link href="/settings" passHref legacyBehavior>
                    <MenuItem sx={{ px: 2, py: 1 }}>
                      <i className="fas fa-cog" style={{ marginRight: '8px' }}></i>
                      Account Settings
                    </MenuItem>
                  </Link>
                  <Box sx={{ borderTop: '1px solid #f3f4f6', my: 0.5 }}></Box>
                  <Link href="/logout" passHref legacyBehavior>
                    <MenuItem sx={{ px: 2, py: 1 }}>
                      <i className="fas fa-sign-out-alt" style={{ marginRight: '8px' }}></i>
                      Logout
                    </MenuItem>
                  </Link>
                </Box>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;