// src/app/login/page.jsx
"use client";

import * as React from "react";
import { Paper, Box, TextField, Stack, Alert, Typography } from "@mui/material";
import Image from "next/image";
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
      {/* Wrapper with background like on homepage */}
      <Box
        component="section"
        sx={{
          background: "linear-gradient(180deg, #2B1C5D 0%, #1A103C 100%)",
          width: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        {/* AppBar centered like on homepage */}
        <Box
          sx={{
            width: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <AppBar />
        </Box>

        {/* Login Content Container */}
        <Box
          sx={{
            maxWidth: "1000px",
            width: "100%",
            padding: { xs: 2, sm: 4 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              mb: 4,
              color: "white",
            }}
          >
            Login
          </Typography>

          {/* Main content with image and form */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            {/* Image column with circle background like in screenshot */}
            <Box
              sx={{
                flex: "0 0 auto",
                position: "relative",
                height: "300px",
                width: "300px",
                display: { xs: "none", md: "block" },
                borderRadius: "50%",
                overflow: "hidden",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(5px)",
              }}
            >
              <Image
                src="/img/monitoring.svg"
                alt="Login"
                fill
                priority
                style={{ objectFit: "contain", padding: "40px" }}
              />
            </Box>

            {/* Form column with updated styling to match screenshot */}
            <Box
              sx={{
                flex: "0 0 auto",
                width: { xs: "100%", md: "400px" },
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(5px)",
                  borderRadius: "16px",
                }}
              >
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
                      variant="outlined"
                      InputProps={{
                        sx: {
                          borderRadius: "8px",
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                        },
                      }}
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
                      variant="outlined"
                      InputProps={{
                        sx: {
                          borderRadius: "8px",
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                        },
                      }}
                    />
                    {loginError && (
                      <Alert severity="error">
                        {loginError.message ||
                          "Login failed. Please try again."}
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
                      sx={{
                        borderRadius: "20px",
                        padding: "12px",
                      }}
                    >
                      Login
                    </LoadingButton>
                  </Stack>
                </form>
              </Paper>
            </Box>
          </Box>
        </Box>
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
