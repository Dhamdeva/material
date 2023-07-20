import {
  Alert,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { Navbar } from './Navbar'
import { DrawerComponent } from './DrawerComponent'
import * as Yup from 'yup'
import { FormikHelpers, useFormik } from 'formik'
import axios from 'axios'
import { constants } from '../../config/constants'
import { useNavigate } from 'react-router-dom'

interface ProductForms {
  name: string
  code: string
  stock: number
  price: number
  description:string
}

export default function Product() {
  const history=useNavigate();
  const [showMessage,setShowMessage]=useState(false);
  const [message,setMessage]=useState('');
  const [showErrorMessage,setShowErrorMessage]=useState(false)
  const [errorMessage,setErrorMessage]=useState('')

  const initialValues: ProductForms = {
    name: '',
    code:'',
    stock:0,
    price:0,
    description:''
  }
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    code: Yup.string()
      .required('Code  is required'),
    stock: Yup.number()
      .required('Stock is required'),
    price: Yup.number()
      .required('Price is required')
  })
  const handleSubmit = async (
    values: ProductForms,
    formikHelpers: FormikHelpers<ProductForms>,
  ) => {
    try {
      const res: any = await axios({
        url: constants.apiBaseUrl + 'product',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: 'Bearer ' + localStorage.getItem('authtoken'),
        },
        data: values,
      })
      if (res.status) {
        formikHelpers.resetForm()
        setTimeout(function () {
          
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
      setErrorMessage('Data alredy Exist');
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
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <div style={{ width: '220px' }}>
          <DrawerComponent />
        </div>
        <div style={{ flex: 1 ,margin:'40px'}}>
        <Typography align="center" variant="h4">
            Product Details
          </Typography>
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
          <form onSubmit={formik.handleSubmit} noValidate method='post'>
          <Grid xs={12} sx={{ marginTop: '30px' }}>
            <Typography>Product Name</Typography>
            <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  autoFocus
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.name && Boolean(formik.errors.name)
                  }
                  helperText={
                    formik.touched.name && formik.errors.name
                  }
                />
          </Grid>
          <Grid xs={12} sx={{ marginTop: '30px' }}>
            <Typography>Product Code</Typography>
            <TextField
                  autoComplete="given-name"
                  name="code"
                  required
                  fullWidth
                  id="code"
                  autoFocus
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.code && Boolean(formik.errors.code)
                  }
                  helperText={
                    formik.touched.code && formik.errors.code
                  }
                />
          </Grid>
          <Grid xs={12} sx={{ marginTop: '30px' }}>
            <Typography>Product Price</Typography>
            <TextField
                  autoComplete="given-name"
                  name="price"
                  required
                  fullWidth
                  id="price"
                  autoFocus
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.price && Boolean(formik.errors.price)
                  }
                  helperText={
                    formik.touched.price && formik.errors.price
                  }
                />
          </Grid>
          <Grid xs={12} sx={{ marginTop: '30px' }}>
            <Typography>Product Stock</Typography>
            <TextField
                  autoComplete="given-name"
                  name="stock"
                  required
                  fullWidth
                  id="stock"
                  autoFocus
                  value={formik.values.stock}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.stock && Boolean(formik.errors.stock)
                  }
                  helperText={
                    formik.touched.stock && formik.errors.stock
                  }
                />
          </Grid>
          <Grid xs={12} sx={{ marginTop: '30px' }}>
            <Typography>Product Description</Typography>
            <TextField
              multiline
              fullWidth
              id="description"
              name="description"
              autoComplete="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </Grid>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Product Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
