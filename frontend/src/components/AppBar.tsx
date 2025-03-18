// src/components/AppBar.jsx
"use client";

import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import { ListItemText } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material";
import { Drawer, Divider, List, ListItemButton } from "@mui/material";
import { UserAppBarIcon, UserMobileMenuItems } from "./AppBarUserUI";
import { useRouter, usePathname } from "next/navigation";
import NextLink from "next/link";

export const Bar = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const theme = useTheme();

  // Custom Link component that combines MUI Link with Next.js Link
  const NavLink = React.forwardRef(({ href, ...props }, ref) => {
    return (
      <NextLink href={href} passHref legacyBehavior>
        <Link {...props} ref={ref} />
      </NextLink>
    );
  });

  // Custom Button with Next.js navigation
  const NavButton = ({ href, ...props }) => {
    const isActive = pathname === href;
    return (
      <Button
        component={NavLink}
        href={href}
        variant="navbar"
        className={isActive ? "active" : ""}
        {...props}
      />
    );
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        UnifyGiving
      </Typography>
      <Divider />
      <List>
        <ListItemButton
          sx={{ textAlign: "center" }}
          onClick={() => router.push("/")}
        >
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton
          sx={{ textAlign: "center" }}
          onClick={() => router.push("/charities")}
        >
          <ListItemText primary="Charities" />
        </ListItemButton>
        <Divider />
        <UserMobileMenuItems />
      </List>
    </Box>
  );

  return (
    <>
      <MuiAppBar
        variant={props.variant}
        elevation={0}
        position="static"
        sx={{
          width: 0.9,
          borderRadius: theme.shape.borderRadius,
          display: "flex",
          flexGrow: 0,
          mt: { xs: 5, md: 3 },
          mb: 5,
          borderColor: "#D5CDE0",
          borderWidth: "1px",
          borderStyle: "solid",
          py: 1.5,
        }}
      >
        <Toolbar>
          <NavLink
            href="/"
            sx={{
              display: "flex",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            <img
              height="57"
              src={
                props.variant == "home" ? "/img/Logo.png" : "/img/LogoDark.png"
              }
              alt="UnifyGiving Logo"
            />
          </NavLink>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavButton href="/">Home</NavButton>
            <NavButton href="/charities">Charities</NavButton>
          </Box>
          <IconButton
            sx={{
              display: {
                sm: "flex",
                md: "none",
              },
            }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon style={{ fontSize: "48px" }} />
          </IconButton>
          <UserAppBarIcon />
        </Toolbar>
      </MuiAppBar>
      <nav>
        <Drawer
          container={typeof window !== "undefined" ? document.body : undefined}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { sm: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 0.5 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

export default Bar;
