import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as Yup from "yup";
import { FormikHelpers, useFormik } from "formik";
import FormHelperText from "@mui/material/FormHelperText";
import { useNavigate } from "react-router-dom";
import { constants } from "../../config/constants";
import axios from "axios";
import { Alert } from "@mui/material";

interface LogInFormValues {
  emailId: string;
  password: string;
  allowExtraEmails: boolean;
}

const defaultTheme = createTheme();

export default function Login() {
  console.log("Login");

  const initialValues: LogInFormValues = {
    emailId: "",
    password: "",
    allowExtraEmails: false,
  };
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const navigates = useNavigate();

  const handleClickShowPassword = () =>
    setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (
    values: LogInFormValues,
    formikHelpers: FormikHelpers<LogInFormValues>
  ) => {
    try {
      const res: any = await axios({
        url: constants.apiBaseUrl + "login",
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        data: values,
      });

      if (res.status === 200) {
        formikHelpers.resetForm();
        localStorage.setItem('authtoken', res.data.data.token);
        setTimeout(function () {
          navigate("/homepage");
        }, 1000);
        setShowSuccessMessage(true);
        setSuccessMessage('Login Sucessfully')
        setShowErrorMessage(false);
      } else {
        setShowSuccessMessage(false);
        setShowErrorMessage(true);
        setErrorMessage("Email or Password Incorrect");
      }
    } catch (e: any) {
      setShowSuccessMessage(false);
      setShowErrorMessage(true);
      setErrorMessage("Email or Password Incorrect");
      console.error(e);
    }
  };

  const validationSchema = Yup.object({
    emailId: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Invalid email address"
      ),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: handleSubmit,
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        {showSuccessMessage && (
          <Alert severity="success" sx={{ width: "100%" }}>
            {successMessage}
          </Alert>
        )}
        {showErrorMessage && (
          <Alert severity="error" sx={{ width: "100%" }}>
            {errorMessage}
          </Alert>
        )}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={formik.handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="emailId"
                  label="Email Address"
                  name="emailId"
                  autoComplete="emailId"
                  value={formik.values.emailId}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.emailId && Boolean(formik.errors.emailId)
                  }
                  helperText={formik.touched.emailId && formik.errors.emailId}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Password"
                  name="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormHelperText>
                  {formik.touched.password && formik.errors.password}
                </FormHelperText>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="allowExtraEmails"
                      color="primary"
                      checked={formik.values.allowExtraEmails}
                      onChange={formik.handleChange}
                    />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
