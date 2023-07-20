import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import axios from 'axios'
import { constants } from '../../config/constants'
import { Navbar } from './Navbar'
import { DrawerComponent } from './DrawerComponent'
import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, Popper, TablePagination, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/joy/Button'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: '1px solid  black',
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: '1px solid  black',
  },
}))
const ContentTableCell = styled(TableCell)(({ theme }) => ({
  border: '1px solid black',
  textAlign: 'left',
}))
interface User {
  id: any
  name: string
  code: string
  price: number
  stock: number
  description: string
}
export function ProductList() {
  const [productList, setProductList] = useState<User[]>([])
  const [productListCount, setProductListCount] = useState(0)
  const [productListController, setProductListController] = useState({
    page: 0,
    rowsPerPage: 10,
  })
  const [showDeletePopup, setShowDeletePopup] = useState(false)
  const [deleteItemId, setDeleteItemId] = useState('')

  useEffect(() => {
    axios
      .get(
        constants.apiBaseUrl +
          `product/?page=${productListController.page + 1}&limit=${
            productListController.rowsPerPage
          }`,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('authtoken'),
          },
        },
      )
      .then((res) => {
        setProductList(res.data.data)
        setProductListCount(res.data.pagination.totalRecords)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [productListController])

  const handlePageChange = (event: any, newPage: any) => {
    setProductListController({
      ...productListController,
      page: newPage,
    })
  }

  const handleRowsPerPageChange = (event: any) => {
    setProductListController({
      ...productListController,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    })
  }

  const handleEdit = (id: any) => {
    // setShowDeletePopup(true)
    // setDeleteItemId(id)
  }

  const handleDeleteConfirmation = (id: any) => {
    setShowDeletePopup(true)
    setDeleteItemId(id)
  }
  const deleteProduct = (id: any) => {
    axios
      .delete(constants.apiBaseUrl+`/product/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('authtoken'),
        },
      },)
      .then((res) => {
        ProductList();
      })
      .catch((error) => {
        console.error(error)
      })
  }
  const confirmDelete = () => {
    deleteProduct(deleteItemId)
    setShowDeletePopup(false)
  }

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <div style={{ width: '220px' }}>
          <DrawerComponent />
        </div>
        <div style={{ flex: 1, margin: '40px' }}>
          <Typography variant="h4" align="center">
            Product List
          </Typography>
          {showDeletePopup && (
            <Dialog open={showDeletePopup} sx={{textAlign:'center',display:'flex',justifyContent:'center',alignItems:'center'}}>
              <DialogContent>
                <DialogContentText>Are you sure you want to delete this item?</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={confirmDelete} sx={{marginRight:'30px'}}>Confirm</Button>
                <Button onClick={() => setShowDeletePopup(false)}>Cancel</Button>
              </DialogActions>
              
            </Dialog>
          )}

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Code</StyledTableCell>
                  <StyledTableCell align="left">Price</StyledTableCell>
                  <StyledTableCell align="left">Stock</StyledTableCell>
                  <StyledTableCell align="left">Description</StyledTableCell>
                  <StyledTableCell align="left">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productList.map((product: any) => (
                  <StyledTableRow key={product._id}>
                    <ContentTableCell component="th" scope="row">
                      {product.name}
                    </ContentTableCell>
                    <ContentTableCell align="left">
                      {product.code}
                    </ContentTableCell>
                    <ContentTableCell align="left">
                      {product.price}
                    </ContentTableCell>
                    <ContentTableCell align="left">
                      {product.stock}
                    </ContentTableCell>
                    <ContentTableCell align="left">
                      {product.description}
                    </ContentTableCell>
                    <ContentTableCell align="left">
                      
                       <EditIcon
                        onClick={() => handleEdit(product._id)}
                        sx={{ marginRight: '20px' }}
                      />
                      <DeleteIcon
                        onClick={() => handleDeleteConfirmation(product._id)}
                      />
                    </ContentTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              onPageChange={handlePageChange}
              page={productListController.page}
              count={productListCount}
              rowsPerPage={productListController.rowsPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </TableContainer>
        </div>
      </div>
    </div>
  )
}
