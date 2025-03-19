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
// import { useTheme } from "@mui/material";
import { Drawer, Divider, List, ListItemButton } from "@mui/material";
import { UserMobileMenuItems } from "./AppBarUserUI";
import { useRouter, usePathname } from "next/navigation";
import NextLink from "next/link";
import Image from "next/image";
import LoginIcon from "@mui/icons-material/Login";

interface AppBarProps {
  variant?: string;
}

// Define a proper interface for the NavLink props
interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children?: React.ReactNode;
}

export const Bar: React.FC<AppBarProps> = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // Add this for SSR/CSR consistency
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDrawerToggle = (): void => {
    setMobileOpen((prevState) => !prevState);
  };

  // const theme = useTheme();

  // Custom Link component that combines MUI Link with Next.js Link with proper typing
  const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
    ({ href, ...props }, ref) => {
      return <Link component={NextLink} href={href} ref={ref} {...props} />;
    }
  );

  // Add display name to fix ESLint warning
  NavLink.displayName = "NavLink";

  // Custom Button with Next.js navigation
  const NavButton: React.FC<{
    href: string;
    children: React.ReactNode;
    active?: boolean;
  }> = ({ href, active, ...props }) => {
    const isActive = active !== undefined ? active : pathname === href;
    return (
      <Button
        component={NavLink}
        href={href}
        sx={{
          borderRadius: "50px",
          px: 3,
          py: 1,
          mx: 1,
          fontWeight: 500,
          backgroundColor: isActive ? "#d3f9bb" : "transparent",
          color: "#333",
          "&:hover": {
            backgroundColor: isActive ? "#c1f5a2" : "rgba(0, 0, 0, 0.04)",
          },
        }}
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

  // To avoid hydration mismatch, only render the full content after client-side mount
  if (!isMounted) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          my: 3,
          height: "64px", // Placeholder height to prevent layout shift
        }}
      />
    );
  }

  return (
    <>
      <MuiAppBar
        elevation={0}
        position="static"
        sx={{
          width: { xs: "95%", md: "90%" },
          maxWidth: "1400px",
          borderRadius: "50px",
          display: "flex",
          mt: { xs: 2, md: 3 },
          mb: 3,
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
          py: 0.5,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <NavLink href="/">
            <Image
              height={45}
              width={150}
              src="/img/LogoDark.png"
              alt="UnifyGiving Logo"
            />
          </NavLink>

          {/* Navigation Links - Desktop */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <NavButton href="/" active={pathname === "/"}>
              Home
            </NavButton>
            <NavButton href="/charities" active={pathname === "/charities"}>
              Charities
            </NavButton>
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            sx={{
              display: {
                xs: "flex",
                md: "none",
              },
              ml: "auto",
              mr: 1,
            }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon style={{ fontSize: "32px" }} />
          </IconButton>

          {/* Login Button */}
          <Button
            component={NavLink}
            href="/login"
            variant="contained"
            color="primary"
            startIcon={<LoginIcon />}
            sx={{
              borderRadius: "50px",
              px: 3,
              py: 1,
              backgroundColor: "#6C5CE7",
              color: "white",
              "&:hover": {
                backgroundColor: "#5849c2",
              },
              boxShadow: "0px 4px 10px rgba(108, 92, 231, 0.3)",
            }}
          >
            Login
          </Button>
        </Toolbar>
      </MuiAppBar>

      {/* Mobile Menu Drawer */}
      <Drawer
        container={typeof window !== "undefined" ? document.body : undefined}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "70%" },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Bar;
