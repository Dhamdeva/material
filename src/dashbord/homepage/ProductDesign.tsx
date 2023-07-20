import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { Box } from '@mui/material';
import { Card } from '@mui/joy';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import {  getProduct, getProductFromServer } from '../redux/productSlice';


const CardContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
`;

const CardStyle = styled(Card)`
  width: 200px;
  margin: 20px;
`;

export default function ProductDesign() {
  const dispatch = useDispatch();

  React.useEffect(()=>{
    dispatch(getProductFromServer())
  },[dispatch]);
  
  
  const useProduct =useSelector((state:any) => state.productData.useProduct)
  
  
  const selectedProduct = (product:any) =>{
    dispatch(getProduct(product))
  };
  
  if (!useProduct) {
    
    return <div>Loading...</div>;
  }

  
  return (
    <div>
      <CardContainer>
        {useProduct.map((product:any) => (
          <Link to={`/productDetails/${product._id}`}  style={{textDecoration:'none'}}>
          <CardStyle key={product}  onClick={() =>selectedProduct(product)}>
            <CardOverflow>
              <AspectRatio sx={{ minWidth: 100 }}>
                <img
                  src="https://i.dummyjson.com/data/products/1/thumbnail.jpg"
                  srcSet="https://images.unsplash.com/photo-1593121925328-369cc8459c08?auto=format&fit=crop&w=286&dpr=2 2x"
                  loading="lazy"
                  alt=""
                />
              </AspectRatio>
            </CardOverflow>
            <CardContent>
              <Typography level="body3">{product.code}</Typography>
              <Typography  endDecorator={<ArrowOutwardIcon />}>
                {product.name}
              </Typography>

              <Typography
                fontSize="xl"
                fontWeight="xl"
                sx={{ mt: 1 }}
                endDecorator={
                  <Chip component="span" size="sm" variant="soft" color="success">
                    Lowest price
                  </Chip>
                }
              >
                {product.price}
              </Typography>
              <Typography level="body2">
                (Only <b>{product.stock}</b> left in stock!)
              </Typography>
            </CardContent>
            <CardOverflow>
              {/* <Button
                variant="solid"
                color="danger"
                size="md"
                onClick={() =>addToCart(product._id)}
              >
                Add to cart
              </Button> */}
            </CardOverflow>
          </CardStyle>
        </Link>
        ))}
      </CardContainer>
    </div>
  );
}
