// src/app/login/page.jsx
"use client";

import * as React from "react";
import {
  Paper,
  Box,
  Grid,
  TextField,
  Stack,
  Alert,
  Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "@/lib/queries/auth-queries";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/lib/apollo-client";
import AppBar from "@/components/AppBar";

const schema = yup
  .object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

interface LoginFormData {
  email: string;
  password: string;
}

function LoginContent() {
  const router = useRouter();
  const setCredentials = useAuthStore((state) => state.setCredentials);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [login, { error: loginError, loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data.login) {
        setCredentials({
          user: data.login.user,
          token: data.login.token,
        });
        router.push("/");
      }
    },
  });

  const onSubmit = async (data: LoginFormData): Promise<void> => {
    try {
      await login({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <AppBar />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          padding: 2,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
        }}
      >
        <Typography variant="h1" sx={{ mb: 4 }}>
          Login
        </Typography>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <img
              src="/img/monitoring.svg"
              alt="Login"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3}>
                  <TextField
                    label="Email"
                    disabled={loading}
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Password"
                    disabled={loading}
                    {...register("password")}
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    required
                    fullWidth
                  />
                  {loginError && (
                    <Alert severity="error">
                      {loginError.message || "Login failed. Please try again."}
                    </Alert>
                  )}
                  <LoadingButton
                    type="submit"
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    endIcon={<LoginIcon />}
                    fullWidth
                    size="large"
                  >
                    Login
                  </LoadingButton>
                </Stack>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default function LoginPage() {
  return (
    <ApolloProvider client={apolloClient}>
      <LoginContent />
    </ApolloProvider>
  );
}
