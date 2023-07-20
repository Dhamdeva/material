import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import * as Yup from 'yup'
import { FormikHelpers, useFormik } from 'formik'
import FormHelperText from '@mui/material/FormHelperText'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { constants } from '../../config/constants'
import { Alert } from '@mui/material'
import { Navbar } from '../homepage/Navbar'
interface SignUpFormValues {
  firstName: string
  lastName: string
  emailId: string
  password: string
  confirmpassword: string
  phoneNo: string
  allowExtraEmails: boolean
  name: string
}

const defaultTheme = createTheme()

export default function SignUp() {
  const history = useNavigate()

  const initialValues: SignUpFormValues = {
    firstName: '',
    lastName: '',
    emailId: '',
    confirmpassword: '',
    phoneNo: '',
    password: '',
    allowExtraEmails: false,
    name: '',
  }
  const [showMessage, setShowMessage] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [showErrorMessage, setShowErrorMessage] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false)
  const [showPasswords, setShowPasswords] = React.useState(false)
  

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickShowPasswords = () => setShowPasswords((show) => !show)

  

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
  }
  

  const postUser = async () => {}

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    emailId: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phoneNo: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(16, 'Password must be at most 16 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      ),
    confirmpassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  })

  const handleSubmit = async (
    values: SignUpFormValues,
    formikHelpers: FormikHelpers<SignUpFormValues>,
  ) => {
    try {
      values.name = values.firstName + ' ' + values.lastName
      const res: any = await axios({
        url: constants.apiBaseUrl + 'user',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        data: values,
      })
      if (res.status) {
        formikHelpers.resetForm()
        setTimeout(function () {
          history('/')
        }, 3000)
        setShowMessage(true)
        setMessage('Added Successfully')
        setShowErrorMessage(false);
      } else {
        setShowMessage(false)
        setShowErrorMessage(true);
        setErrorMessage(res.message)
      }
    } catch (e: any) {
      setShowMessage(false);
      setShowErrorMessage(true);
      setErrorMessage(e.message);
      console.error(e)
    }
    // formikHelpers.resetForm();
    // setTimeout(function(){
    //   history("/")
    // }, 3000);
  }

  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit: handleSubmit,
  })

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        
        {showMessage && (
          <Alert
            severity="success"
            sx={{  width: '100%' }}
            color="success"
          >
           {message}
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
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={formik.handleSubmit} noValidate method="post">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
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
                  required
                  fullWidth
                  id="phoneNo"
                  label="Phone Number"
                  name="phoneNo"
                  autoComplete="phoneNo"
                  value={formik.values.phoneNo}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.phoneNo && Boolean(formik.errors.phoneNo)
                  }
                  helperText={formik.touched.phoneNo && formik.errors.phoneNo}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Password"
                  name="password"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
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
                          {showPassword ? <VisibilityOff /> : <Visibility />}
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
                <TextField
                  fullWidth
                  required
                  label="Confirm Password"
                  name="confirmpassword"
                  id="confirmpassword"
                  type={showPasswords ? 'text' : 'password'}
                  value={formik.values.confirmpassword}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.confirmpassword &&
                    Boolean(formik.errors.confirmpassword)
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswords}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPasswords ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormHelperText>
                  {formik.touched.confirmpassword &&
                    formik.errors.confirmpassword}
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
