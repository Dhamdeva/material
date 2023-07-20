import styled from "@emotion/styled"
import { AppBar, Box, Button, InputBase, Toolbar, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from "react";
import { Link } from "react-router-dom";


const StyledHeader =styled(AppBar)`
    background:@2874f0;
    height:55px;
    `;

const Component=styled(Box)`
    margin-left:12%;`
;

const SearchContainer = styled(Box)`
    background:#fff;
    width:38%;
    display:flex;
    border-radius:2px;
    margin-left:12px;
`
const InputSearchBase = styled(InputBase)`
    padding-left: 20px;
    width:100%;
`
const SearchIconWrapper = styled(Box)`
    color:blue;
    padding:5px;
    `;

const Wrapper =styled(Box)`
    display:flex;
    margin:20px;
`
const Container = styled(Box)`
    display:flex;
    margin:5px 20px  10px
`;

const  CustomButtonWrapper = styled(Box)`
    margin:0 5% 0 auto;
`
const LoginButton = styled(Button)`
color:#2874f0;
    background:#ffffff;
    text-transform:none;
    padding:5px  40px;
    border-radius:2px;
    box-shadow:none;
    font-weight:600;
    height:32px;
`

export const  Header = () =>{
    const logoUrl='https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png';

    const [open,setOpen] = useState(false);
    
    const openDialog = () =>{
        setOpen(true);
    }

    return(
        <StyledHeader>
            <Toolbar   style={{minHeight:55}}>
                <Component>
                    <img src={logoUrl} alt="logo"  style={{width:75}} />
                </Component>
                <SearchContainer>
                    <InputSearchBase 
                    placeholder="Search for Product and Brand" 
                    />
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                </SearchContainer>
                <CustomButtonWrapper>
                    <Wrapper>
                        <LoginButton variant="contained"  onClick={() => openDialog()}>Login</LoginButton>
                        <Typography style={{margin:4,width:135}}>Become a seller</Typography>
                        <Typography style={{margin:4}}>More</Typography>
                        <Container>
                            <Link to={'/productscard'} style={{textDecoration:'none',color:'white',display:'flex'}}>
                            <ShoppingCartIcon />
                            <Typography>Cart</Typography>
                            </Link>
                        </Container>
                    </Wrapper>
                </CustomButtonWrapper>
            </Toolbar>
        </StyledHeader>
    )
}