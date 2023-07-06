import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import {constants} from '../../config/constants';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  emailId: string,
  phoneNo: number,
  
) {
  return { name,emailId,phoneNo };
}



export function UserList() {
    
    const [userList,setUserList]=React.useState([]);

    React.useEffect(() =>{
        axios.get(constants.apiBaseUrl + "user", {
            headers: {
                Authorization: "Bearer "+localStorage.getItem('authtoken'),
            },
            })
            .then(res => {
            setUserList(res.data.data);
            })
            .catch(error => {
            console.error(error);
            });
    },[])

      
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Email Id</StyledTableCell>
            <StyledTableCell align="right">Phone Number</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((user:any) => (
            <StyledTableRow key={user}>
              <StyledTableCell component="th" scope="row">
                {user.name}
              </StyledTableCell>
              <StyledTableCell align="right">{user.emailId}</StyledTableCell>
              <StyledTableCell align="right">{user.phoneNo}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}