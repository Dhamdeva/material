import styled from "@emotion/styled";
import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import React from "react";
import {   useDispatch, useSelector } from 'react-redux';
import { addCart } from "../redux/cartSlice";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const  Name = styled(Typography)`
    margin:0 20px 10px 0;

`
const SmallText =styled(Typography)`
    font-size:14px;
    margin-top:10px
`;
const StyleBadge = styled(LocalOfferIcon)`
    margin-right:10px;
    font-size:15px;
    color:#00CC00;
`

export const ProductDetails = () =>{
    
    const dispatch = useDispatch();    
    const selectProduct =useSelector((state:any)=>state.productData.selectProduct);
    const [product, setProduct]:any = React.useState([]);
    
    React.useEffect(() =>{
        if(selectProduct && Object.keys(selectProduct).length > 1){
            setProduct(selectProduct);
        }
      },[selectProduct]);

    const addToCart = (product:any) =>{
        dispatch(addCart(product));
    }

    return(
        <div className="container-fluid" style={{marginTop:'100px'}} >
            { product.name ?
     
            <Stack  direction='row' spacing={2}>
                <Grid  xs={6}>
                    <img
                    src="https://i.dummyjson.com/data/products/1/thumbnail.jpg"
                    srcSet="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286&dpr=2 2x"
                    loading="lazy"
                    alt=""
                    />
                    <Box sx={{display:'flex',marginTop:'50px'}}>
                        <Button variant="contained" style={{marginRight:'20px',width:200,padding:'20px'}} onClick={()=> addToCart(product)}><ShoppingCartIcon />  Add To Cart</Button>
                        <Button variant="contained" style={{width:200}}><FlashOnIcon /> Buy Now</Button>
                    </Box>
                </Grid>
                <Grid xs={6}>
                    <Name variant="h4">{product.name}.</Name>
                    <Name >{product.description}.</Name>
                    <Name >Code: {product.code}.</Name>
                    <Name >Price: ${product.price}.</Name>
                    <Name >Stock: {product.stock}.</Name>
                    <SmallText><StyleBadge /> Bank OfferFlat ₹1,250 Off on HDFC Bank Credit Card EMI Trxns on orders priced between ₹15,000 to ₹39,999T&C</SmallText>
                    <SmallText><StyleBadge /> Bank OfferFlat ₹3,000 Off on HDFC Bank Credit Card EMI Trxns on orders priced between ₹40,000 to ₹49,999T&C</SmallText>
                    <SmallText><StyleBadge /> Bank OfferFlat ₹4,000 Off on HDFC Bank Credit Card EMI Trxns on orders of ₹50,000 and aboveT&C</SmallText>
                    <SmallText><StyleBadge /> Flat ₹50 on Smartwatches for sports & fitness buyersT&C</SmallText>
                </Grid>
            </Stack>
            : '' }
           
        </div>
    )
}