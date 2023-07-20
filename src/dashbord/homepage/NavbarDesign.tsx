

import { Typography, Box, styled } from '@mui/material'; 

import { navData } from '../../config/Data';

const Component = styled(Box)`
    display: flex;
    justifyContent: space-between;
    margin: 55px 130px 0 130px;
`

const Container = styled(Box)`
    padding:12px 18px;
    text-align: center
`

const Text = styled(Typography)`
    font-size: 14px;
    font-weight: 600;
    font-family: inherit;
`;

const NavbarDesign = () => {
    return (
        <Component>
            {
                navData.map((temp:any) => (
                    <Container>
                        <img src={temp.url} style={{  width: 64 }} />
                        <Text>{temp.text}</Text>
                    </Container>
                ))
            }
        </Component>
    )
}

export default NavbarDesign;