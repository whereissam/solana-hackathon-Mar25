// src/components/AppBarUserUI.tsx
'use client';

import * as React from "react";
import {
    Tooltip, IconButton, Menu, MenuItem, ListItemIcon, Button, Box,
    ListItemButton, ListItemText, Avatar, Typography
} from "@mui/material";
import DonationIcon from "@/components/icons/DonationIcon";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from "next/navigation";
import Link from "next/link";
import UserIcon from "@/components/icons/UserIcon";
import { useAuthStore } from "@/store/authStore";

export const UserAppBarIcon: React.FC = () => {
    const { user, isAuthenticated, clearCredentials } = useAuthStore();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const router = useRouter();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        clearCredentials();
        handleCloseUserMenu();
        router.push("/");
    };

    const handleSettings = () => {
        handleCloseUserMenu();
        router.push("/settings");
    };

    const handleDonations = () => {
        router.push("/receipts");
    };

    return (
        <>
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
                {isAuthenticated && user ? (
                    <>
                        <Button
                            onClick={handleDonations}
                            sx={{ mr: 2 }}
                            endIcon={<DonationIcon />}
                        >
                            My Donations
                        </Button>
                        <Box 
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                cursor: 'pointer' 
                            }}
                            onClick={handleOpenUserMenu}
                        >
                            <Tooltip title="Open user menu">
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    {user.avatarUrl ? (
                                        <Avatar 
                                            src={user.avatarUrl} 
                                            alt={user.name}
                                            sx={{ width: 40, height: 40, mr: 1 }}
                                        />
                                    ) : (
                                        <IconButton sx={{ p: 0, mr: 1 }} size="large">
                                            <UserIcon />
                                        </IconButton>
                                    )}
                                    <Typography sx={{ ml: 1 }}>
                                        {user.name}
                                    </Typography>
                                </Box>
                            </Tooltip>
                        </Box>
                    </>
                ) : (
                    <Link href="/login" passHref legacyBehavior>
                        <Button component="a" endIcon={<LoginIcon />}>Login</Button>
                    </Link>
                )}
            </Box>
            <Menu
                sx={{ mt: '45px' }}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorEl)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleSettings}>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
};

export const UserMobileMenuItems: React.FC = () => {
    const { user, isAuthenticated, clearCredentials } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        clearCredentials();
        router.push("/");
    };

    if (isAuthenticated && user) {
        return (
            <>
                <ListItemButton
                    sx={{ textAlign: "center" }}
                    onClick={() => router.push("/profile")}
                >
                    <ListItemText 
                        primary={
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <PersonIcon sx={{ mr: 1 }} />
                                {user.name}
                            </Box>
                        }
                    />
                </ListItemButton>
                <ListItemButton
                    sx={{ textAlign: "center" }}
                    onClick={() => router.push("/receipts")}
                >
                    <ListItemText primary="My Donations"/>
                </ListItemButton>
                <ListItemButton
                    sx={{ textAlign: "center" }}
                    onClick={() => router.push("/settings")}
                >
                    <ListItemText primary="Settings" />
                </ListItemButton>
                <ListItemButton
                    sx={{ textAlign: "center" }}
                    onClick={handleLogout}
                >
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </>
        );
    }
    
    return (
        <ListItemButton
            sx={{ textAlign: "center" }}
            onClick={() => router.push("/login")}
        >
            <ListItemText primary="Login" />
        </ListItemButton>
    );
};