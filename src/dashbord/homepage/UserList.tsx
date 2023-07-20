import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { constants } from '../../config/constants';
import { Navbar } from './Navbar';
import { DrawerComponent } from './DrawerComponent';
import { TablePagination, Typography } from '@mui/material';

interface User {
  name: string;
  emailId: string;
  phoneNo: number;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: '1px solid  black',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: '1px solid  black',
  },
}));
const ContentTableCell = styled(TableCell)(({ theme }) => ({
  border: '1px solid black',
  textAlign: 'left',
}));

function createData(name: string, emailId: string, phoneNo: number): User {
  return { name, emailId, phoneNo };
}

export function UserList() {
  const [userList, setUserList] = useState<User[]>([]);
  const [userListCount, setUserListCount] = useState(0);
  const [userListController, setUserListController] = useState({
    page: 0,
    rowsPerPage: 10,
  });

  useEffect(() => { 
    axios
      .get(
        constants.apiBaseUrl+ `user/?page=${userListController.page+1}&limit=${userListController.rowsPerPage}`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('authtoken'),
          },
        }
      )
      .then((res) => {
        setUserList(res.data.data);
        setUserListCount(res.data.pagination.totalRecords);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userListController]);

  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setUserListController({
      ...userListController,
      page: newPage,
    });
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserListController({
      ...userListController,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <div style={{ width: '220px' }}>
          <DrawerComponent />
        </div>
        <div style={{ flex: 1, margin: '40px' }}>
          <Typography variant="h4" align="center">
            Register User List
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Email Id</StyledTableCell>
                  <StyledTableCell align="left">Phone Number</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList.map((user) => (
                  <StyledTableRow key={user.name}>
                    <ContentTableCell component="th" scope="row">
                      {user.name}
                    </ContentTableCell>
                    <ContentTableCell align="left">{user.emailId}</ContentTableCell>
                    <ContentTableCell align="left">{user.phoneNo}</ContentTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              onPageChange={handlePageChange}
              page={userListController.page}
              count={userListCount}
              rowsPerPage={userListController.rowsPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
