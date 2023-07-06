import { Box, Checkbox, FormLabel, Grid, TextField, Typography } from "@mui/material";
import React from "react";

export default function Product(){
  return(
    <div className="container-fluid" style={{width:'600px',color:'#14397d'}}>
        <Typography align='center' variant='h4'>Product Details</Typography>
          <Grid xs={12} sx={{marginTop:'30px'}}>
          <Typography>Product Name</Typography>
            <TextField fullWidth  id='name'  name='name' autoComplete='name' />
          </Grid>
          <Grid xs={12} sx={{marginTop:'30px'}}>
          <Typography>Product Code</Typography>
            <TextField fullWidth  id='code'  name='code' autoComplete='code' />
          </Grid>
          <Grid xs={12} sx={{marginTop:'30px'}}>
          <Typography>Product Price</Typography>
            <TextField fullWidth  id='price'  name='price' autoComplete='price' />
          </Grid>
          <Grid xs={12} sx={{marginTop:'30px'}}>
          <Typography>Product Stock</Typography>
            <TextField fullWidth  id='stock'  name='stock' autoComplete='stock' />
          </Grid>
          <Grid xs={12} sx={{marginTop:'30px'}}>
          <Typography>Product Description</Typography>
            <TextField multiline fullWidth  id='description'  name='description' autoComplete='description' />
          </Grid>
        
    </div>
  )
}