// src/components/AppBarUserUI.jsx
'use client';

import * as React from "react";
import {
    Tooltip, IconButton, Menu, MenuItem, ListItemIcon, Button, Box,
    ListItemButton, ListItemText
} from "@mui/material";
import DonationIcon from "@/components/icons/DonationIcon";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter } from "next/navigation";
import Link from "next/link";
import UserIcon from "@/components/icons/UserIcon";

export const UserAppBarIcon = (props) => {
    // Temporary state for development
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [anchorLogout, setAnchorLogout] = React.useState(null);
    const router = useRouter();

    const handleLogoutMenu = (event) => {
        setAnchorLogout(event.currentTarget);
    }

    const handleCloseLogoutMenu = () => {
        setAnchorLogout(null);
    }

    const handleLogout = (event) => {
        setIsLoggedIn(false);
        setAnchorLogout(null);
    }

    return (
        <>
            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
                {isLoggedIn ?
                    <>
                        <Button
                            onClick={() => router.push("/receipts")}
                            sx={{ mr: 2 }}
                            endIcon={<DonationIcon />}
                        >My Donation</Button>
                        <Tooltip title="User">
                            <IconButton sx={{ p: 0 }}
                                size="48px"
                                onClick={handleLogoutMenu}>
                                <UserIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                    :
                    <Link href="/login" passHref legacyBehavior>
                        <Button component="a">Login<LoginIcon /></Button>
                    </Link>
                }
            </Box>
            <Menu anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                anchorEl={anchorLogout}
                open={Boolean(anchorLogout)}
                onClose={handleCloseLogoutMenu}
            >
                <MenuItem onClick={null}>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    Settings</MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    Logout</MenuItem>
            </Menu>
        </>
    )
}

export const UserMobileMenuItems = (props) => {
    // Temporary state for development
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const router = useRouter();

    const handleLogout = (event) => {
        setIsLoggedIn(false);
    }

    if (isLoggedIn) return (
        <>
            <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={() => router.push("/receipts")}
            >
                <ListItemText primary="My Donations"/>
            </ListItemButton>
            <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={handleLogout}
            >
                <ListItemText primary="Logout" />
            </ListItemButton>
        </>
    )
    else return (
        <ListItemButton
            sx={{ textAlign: "center" }}
            onClick={() => router.push("/login")}
        >
            <ListItemText primary="Login" />
        </ListItemButton>
    )
}