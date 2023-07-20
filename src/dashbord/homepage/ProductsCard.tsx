import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { removeToCart } from '../redux/cartSlice'



const BottomWrapper = styled(Box)`
  padding: 16px 22px;
  background: #fff;
  box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
  border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
  display: flex;
  margin-left: auto;
  background: #fb641b;
  color: #fff;
  border-radius: 2px;
  width: 250px;
  height: 51px;
`;


const Component = styled(ButtonGroup)`
  margin-top: 30px;
`

const StyledInButton = styled(Button)`
  border-radius: 50%;
`

const Header = styled(Box)`
  padding: 15px 24px;
  background: #fff;
  borderbottom: 1px solid #f0f0f0;
`

const Heading = styled(Typography)`
  color: #878787;
`

const Container = styled(Box)`
  padding: 15px 24px;
  background: #fff;
  & > p {
    margin-bottom: 20px;
    font-size: 14px;
  }
`

const Price = styled(Typography)`
  float: right;
`

const TotalAmount = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
  border-top: 1px dashed #e0e0e0;
  padding: 20px 0;
  border-bottom: 1px dashed #e0e0e0;
`

const Discount = styled(Typography)`
  font-size: 16px;
  color: green;
`

export const ProductsCard = () => {
  const selector = useSelector((state: any) => state.cartData.cart);
  const dispatch = useDispatch();

  const [counter, setCounter] = useState(1)

  const handleIncrement = () => {
    setCounter((counter) => counter + 1)
  }

  const handleDecrement = () => {
    setCounter((counter) => counter - 1)
  }

  const removeCart = (id:any) =>{
      dispatch(removeToCart(id));
  }

  return (
    <div className="container" style={{ display: 'flex',flexDirection:'column' }}>
      {selector.map((cart: any) => (
        <Stack direction="row" spacing={2} sx={{ marginTop: '100px' }}>
          <Grid xs={8}>
            <Header>
              <Typography>My cart {selector.length}</Typography>
            </Header>
            <Divider />
            <Box   sx={{display:'flex'}}>
              <Box>
                <img
                  src="https://i.dummyjson.com/data/products/1/thumbnail.jpg"
                  alt=".."
                  style={{ width: '30%', margin: '20px' }}
                />
              </Box>
              <Box sx={{ margin: '20px' }}>
                <Typography variant="h6">{cart.name}</Typography>
                <Typography>Price: ${cart.price}</Typography>
                <Typography>Code: {cart.code}</Typography>
                <Component>
                  <StyledInButton
                    onClick={() => handleDecrement()}
                    disabled={counter === 0}
                  >
                    -
                  </StyledInButton>
                  <Button disabled>{counter}</Button>
                  <StyledInButton
                    onClick={() => handleIncrement()}
                    disabled={counter === cart.stock}
                  >
                    +
                  </StyledInButton>
                </Component>
                <StyledInButton style={{margin:'20px'}} onClick={() => removeCart(cart._id)}><RemoveIcon />Remove</StyledInButton>
              </Box>
            </Box>
            <BottomWrapper>
                <StyledButton  variant="contained">Place Order</StyledButton>
              </BottomWrapper>
          </Grid>

          <Grid xs={4}>
            <Box>
              <Header>
                <Heading>PRICE DETAILS</Heading>
              </Header>
              <Container>
                <Typography>
                  Price ({selector.length} item)
                  <Price>₹{cart.price}</Price>
                </Typography>
                <Typography>
                  Discount
                  <Price>-₹10</Price>
                </Typography>
                <Typography>
                  Delivery Charges
                  <Price>₹40</Price>
                </Typography>
                <TotalAmount>
                  Total Amount
                  <Price>₹{cart.price}- 10 +40</Price>
                </TotalAmount>
                <Discount>You will save ₹{-40} on this order</Discount>
              </Container>
            </Box>
          </Grid>
        </Stack>
      ))}
    </div>
  )
}
